from pydantic import BaseModel 

class ResultsRequest(BaseModel):
    public_id: str 