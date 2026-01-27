from pydantic import BaseModel, Field
from typing import List

from app.schemas.cluster import Cluster

class ComparisonRequest(BaseModel):
    """Input payload for the comparison endpoint."""

    text: str = Field(..., description="The prompt which runs over many models")


class ComparisonResponse(BaseModel):
    """Resulting clusters of responses"""
    
    clusters: List[Cluster]
    public_id: str
    
