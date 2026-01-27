from pydantic import BaseModel
from typing import List 

from app.schemas.llm_response import LLMResponse

class Cluster(BaseModel):
    summary: str
    responses: List[LLMResponse]