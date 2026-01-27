import httpx 
import json
import os

from app.schemas.llm_response import LLMResponse
from app.schemas.cluster import Cluster
from app.functions.prompt import extract_prompt
from app.core.config import get_settings
import asyncio

async def request(model_name: str, messages: list[dict[str, str]], **kwargs) -> str:
    """Wrapper of OpenRouter chat request. Just returns the response string for now."""

    payload = {
        "model": model_name,
        "messages": messages,
        **kwargs
    }

    settings = get_settings()
    # print("PAYLOAD:", json.dumps(payload))    

    timeout = httpx.Timeout(connect=10.0, read=120.0, write=10.0, pool=10.0)
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {settings.openrouter_api_key}",
            },
            json=payload
        )
    # print("JSON:", response.json())
    print("Recieved response from", model_name)
    if "choices" not in response.json():
        print("ERROR in Reponse:")
        print(response.json())
    return response.json()["choices"][0]["message"]["content"]

async def run_prompt(prompt_name: str, prompt_args, **kwargs):
    formatted_prompt = extract_prompt(prompt_name, **prompt_args)
    model_name = formatted_prompt.split("\n")[0]
    messages = [{
        "role": "system",
        "content": formatted_prompt
    }]
    return await request(model_name, messages, **kwargs)

async def summarize(response: str):
    settings = get_settings()
    return await run_prompt("summarize", {
        "response": response,
    }, temperature=0, max_tokens=1024)

async def request_and_summarize(
        model_name: str,
        messages: dict[str, str],
        **kwargs
) -> LLMResponse:
    response = await request(model_name, messages, **kwargs)
    summary = await summarize(response)
    return LLMResponse(
        identifier=model_name,
        response_summary=summary,
        response_text=response
    )


async def cluster_outputs(input_question: str, outputs: list[LLMResponse]) -> list[Cluster]:
    input = {output.identifier: output.response_text for output in outputs}
    llm_response_ref = {output.identifier: output for output in outputs}
    response = await run_prompt(
        "cluster",
        {
            "question": input_question,
            "responses": input
        },
        temperature=0.0
    )
    response_json = json.loads(response)
    clusters = []
    for cluster in response_json["clusters"]:
        clusters.append(Cluster(
            summary=cluster["summary"],
            responses=[llm_response_ref[identifier] for identifier in cluster["models"]]
        ))
    return clusters

async def gen_clusters(input_question: str) -> list[Cluster]:
    settings = get_settings()
    messages = [
        {
            "role": "system",
            "content": "Answer the user's question to the best of your ability."
        },
        {
            "role": "user",
            "content": input_question
        }
    ]
    llm_output_requests = [request_and_summarize(model_name, messages, temperature=0, max_tokens=1024) for model_name in settings.models]
    llm_outputs = await asyncio.gather(*llm_output_requests)
    clusters = await cluster_outputs(input_question, llm_outputs)
    return clusters

# testing code
async def main():
    models = ["openai/gpt-5.2", "openai/gpt-5.1"]
    async def poem_request(model_name):
        response = await request_and_summarize(
            model_name="openai/gpt-5.2",
            messages = [{
                "role": "system",
                "content": "Write me a poem about mad cow disease"
            }]
        )
        return response
    
    requests = [poem_request(model) for model in models]
    outputs = await asyncio.gather(*requests)
    clusters = await cluster_outputs("Write me a poem about mad cow disease", outputs)
    print("CLUSTERS\n", clusters)


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
