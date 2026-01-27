from fastapi import APIRouter, Depends, HTTPException

from app.schemas.compare import ComparisonRequest, ComparisonResponse
from app.functions.openrouter import gen_clusters
from app.db import get_db 
from sqlalchemy.ext.asyncio import AsyncSession
from app.functions.repo import get_comparison_clusters
import asyncio



from app.schemas.results import ResultsRequest

router = APIRouter()



@router.get("/{public_id}", response_model=ComparisonResponse)
async def get_results(
    public_id: str,
    db: AsyncSession = Depends(get_db),
) -> ComparisonResponse:
    try:
        prompt, clusters = await get_comparison_clusters(db, public_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Comparison not found")

    return ComparisonResponse(clusters=clusters, public_id=public_id, input_question=prompt)