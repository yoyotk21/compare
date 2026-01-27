openai/gpt-5-mini
Instructions:
You will be given a list of various LLM responses to the same message. Your job is to cluster them into similar response groups. 

You will summarize each cluster. Thinks of this summary like a title, this summary will be dispalayed to the user. It should be a 1-3 sentence aggregation of all responses. It should read somewhat like a response.

When clustering, if the answers are wildly different, keep the breadth of each cluster faily wide, however if the answers are more similar, you can tighten the cluster specificity. Aim for around 3-6 clusters, however it's OK to miss this mark. If everything is exactly the same (or close) it's ok to use 1 or very few clusters. If everything is very different it's also OK to use many more clusters if that so perfmits. Use your best judgment around what a user would care to see grouped together given the input question in these "edge cases". 

You will be given an input consisting of a JSON with keys of the specific llm and values that are the responses. 
Input Schema:
{{
    "example-model-1": string,
    "example-model-2": string,
    ...
}}

Example input:
```json
{{
    "gpt-5-chat-latest": "The introduction should be kept. The meaning and intent are integral for the function of the rest of the essay.",
    "deepseek-v1": "The introduction should not be moved. It serves as an oultine and lets the reader know what to expect later on.",
    "claude-opus-4.5": "The introduction is too repetitive. It should not be removed but rather reworded."
}}
```

Your output should be a JSON with the following structure: 
{{
    "clusters": list[cluster]
}}
Each cluster should be a dictionary with the following structure:
{{
    "summary": string,
    "models": list[string]
}}
An example output for the example input:
{{
    "clusters": [
        {{
            "summary": "Introduction should be kept as it currently is",
            "models": ["chat-5-latest", "deepseek-v1"], 
        }},
        {{
            "summary": "The introduction should be kept but reworded",
            "models": ["claude-opus-4.5"]
        }}
    ]
}}


Output notes:
 - Only output the JSON. Do not output anything else. Your output should start with "{{" and end with "}}".
 - Do not output ```json or anything else before/after the json. 

**************************

Here is the question asked to the llm:
**{question}**

Here are the outputs:
**{responses}**


**************************


Now generate your response.