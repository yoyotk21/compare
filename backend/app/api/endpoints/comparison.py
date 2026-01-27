from fastapi import APIRouter, Depends

from app.schemas.compare import ComparisonRequest, ComparisonResponse
from app.functions.openrouter import gen_clusters
from app.db import get_db 
from sqlalchemy.ext.asyncio import AsyncSession
from app.functions.repo import persist_comparison
import asyncio

router = APIRouter()



@router.post("/", response_model=ComparisonResponse)
async def compare_items(
    payload: ComparisonRequest,
    db: AsyncSession = Depends(get_db)
) -> ComparisonResponse:
    clusters = await gen_clusters(payload.text)
    public_id = persist_comparison(db, payload.text, clusters)
    return ComparisonResponse(clusters=clusters, public_id=public_id)