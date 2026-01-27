
from fastapi import FastAPI

from app.api import router as api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Compare API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    """Simple liveness endpoint."""
    return {"status": "ok"}


app.include_router(api_router, prefix="/api")
