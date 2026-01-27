from fastapi import APIRouter, Depends

from app.schemas.compare import ComparisonRequest, ComparisonResponse
from app.functions.openrouter import cluster_outputs, request_and_summarize
from app.core.config import get_settings
import asyncio

router = APIRouter()



@router.post("/", response_model=ComparisonResponse)
async def compare_items(
    payload: ComparisonRequest,
) -> ComparisonResponse:
    settings = get_settings()
    messages = [{
        "role": "system",
        "content": payload.text
    }]
    llm_output_requests = [request_and_summarize(model_name, messages, temperature=0, max_tokens=1024) for model_name in settings.models]
    llm_outputs = await asyncio.gather(*llm_output_requests)
    clusters = await cluster_outputs(payload.text, llm_outputs)
    return ComparisonResponse(clusters=clusters)