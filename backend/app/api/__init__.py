from fastapi import APIRouter

from app.api.endpoints import comparison

router = APIRouter()
router.include_router(comparison.router, prefix="/compare", tags=["Comparison"])

__all__ = ["router"]
