from pydantic import BaseModel

class LLMResponse(BaseModel):
    identifier: str
    response_summary: str
    response_text: str