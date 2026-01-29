from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
)
from sqlalchemy.orm import DeclarativeBase

from app.core.config import get_settings  # or wherever your Settings lives


class Base(DeclarativeBase):
    pass


def make_engine():
    settings = get_settings()
    return create_async_engine(
        settings.local_database_url,
        echo=False,
        future=True,
        pool_pre_ping=True,
    )


engine = make_engine()

SessionLocal = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
    class_=AsyncSession,
)


async def get_db() -> AsyncSession:
    async with SessionLocal() as session:
        yield session
