from __future__ import annotations
from datetime import datetime, timezone
import uuid

from sqlalchemy import (
    String, Text, Integer, DateTime, ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base  # your DeclarativeBase

def now_utc():
    return datetime.now(timezone.utc)

def new_public_id() -> str:
    return str(uuid.uuid4())  # later you can switch to ULID if you want

class Comparison(Base):
    __tablename__ = "comparisons"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    public_id: Mapped[str] = mapped_column(String(36), unique=True, index=True, default=new_public_id)

    original_prompt: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, nullable=False)

    clusters: Mapped[list["Cluster"]] = relationship(
        back_populates="comparison",
        cascade="all, delete-orphan",
        order_by="Cluster.cluster_index",
    )

class Cluster(Base):
    __tablename__ = "clusters"
    __table_args__ = (
        UniqueConstraint("comparison_id", "cluster_index", name="uq_cluster_order_per_comparison"),
        Index("ix_clusters_comparison_id", "comparison_id"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    comparison_id: Mapped[int] = mapped_column(ForeignKey("comparisons.id", ondelete="CASCADE"), nullable=False)

    cluster_index: Mapped[int] = mapped_column(Integer, nullable=False)  # 1..N
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    title: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, nullable=False)

    comparison: Mapped["Comparison"] = relationship(back_populates="clusters")
    responses: Mapped[list["Response"]] = relationship(
        back_populates="cluster",
        cascade="all, delete-orphan",
    )

class Response(Base):
    __tablename__ = "responses"
    __table_args__ = (
        UniqueConstraint("cluster_id", "model_identifier", name="uq_model_per_cluster"),
        Index("ix_responses_cluster_id", "cluster_id"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    cluster_id: Mapped[int] = mapped_column(ForeignKey("clusters.id", ondelete="CASCADE"), nullable=False)

    model_identifier: Mapped[str] = mapped_column(String(128), nullable=False)
    response_text: Mapped[str] = mapped_column(Text, nullable=False)
    response_summary: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, nullable=False)

    cluster: Mapped["Cluster"] = relationship(back_populates="responses")
