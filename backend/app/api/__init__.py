from fastapi import APIRouter

from app.api.endpoints import comparison, results 

router = APIRouter()
router.include_router(comparison.router, prefix="/compare", tags=["Comparison"])
router.include_router(results.router, prefix="/results", tags=["Results"])

__all__ = ["router"]
