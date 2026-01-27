from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.cluster import Cluster as ClusterSchema
from app.schemas.llm_response import LLMResponse as LLMResponseSchema

# Adjust these imports to match your actual ORM model locations/names
from app.models import Comparison, Cluster as ClusterORM, Response as ResponseORM

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from typing import List 




async def persist_comparison(
    db: AsyncSession,
    input_question: str,
    clusters: list[ClusterSchema],
) -> str:
    """
    Persist a comparison + its clusters + model responses.

    Returns:
      comparison.public_id (shareable id)
    """
    try:
        comparison = Comparison(original_prompt=input_question)
        db.add(comparison)
        await db.flush()  # get comparison.id/public_id

        for idx, cluster in enumerate(clusters, start=1):
            cluster_row = ClusterORM(
                comparison_id=comparison.id,
                cluster_index=idx,
                summary=cluster.summary,
                title=getattr(cluster, "title", None),
            )
            db.add(cluster_row)
            await db.flush()  # get cluster_row.id

            for r in cluster.responses:
                db.add(
                    ResponseORM(
                        cluster_id=cluster_row.id,
                        model_identifier=r.identifier,        # or r.model_identifier
                        response_text=r.response_text,
                        response_summary=getattr(r, "response_summary", None),
                    )
                )

        await db.commit()
        return comparison.public_id

    except Exception:
        await db.rollback()
        raise



async def get_comparison(db: AsyncSession, public_id: str) -> Comparison | None:
    """
    Fetch a comparison by shareable public_id, including clusters + responses.

    Returns the ORM Comparison (or None if not found).
    """
    stmt = (
        select(Comparison)
        .where(Comparison.public_id == public_id)
        .options(
            selectinload(Comparison.clusters).selectinload(ClusterORM.responses)
        )
    )
    result = await db.execute(stmt)
    comparison = result.scalars().first()
    return comparison


async def get_comparison_clusters(
    db: AsyncSession,
    public_id: str,
):
    """
    Query the DB for a comparison by public_id and return list[ClusterSchema].

    Raises:
      ValueError if not found (swap for HTTPException in your route if you prefer).
    """
    stmt = (
        select(Comparison)
        .where(Comparison.public_id == public_id)
        .options(selectinload(Comparison.clusters).selectinload(ClusterORM.responses))
    )
    res = await db.execute(stmt)
    comparison = res.scalars().first()

    if comparison is None:
        raise ValueError(f"Comparison not found for public_id={public_id}")

    return comparison.original_prompt, orm_comparison_to_clusters(comparison)


def orm_comparison_to_clusters(comparison: Comparison) -> List[ClusterSchema]:
    """
    Convert an ORM Comparison (with clusters + responses loaded) into a list[ClusterSchema]
    suitable for returning in ComparisonResponse.

    Assumes you've queried with eager loading, e.g.:
      selectinload(Comparison.clusters).selectinload(ClusterORM.responses)
    """
    clusters_out: List[ClusterSchema] = []

    # Ensure stable ordering. If you already set relationship(order_by=...), this is redundant but safe.
    orm_clusters: list[ClusterORM] = sorted(
        list(getattr(comparison, "clusters", []) or []),
        key=lambda c: getattr(c, "cluster_index", 0) or 0,
    )

    for c in orm_clusters:
        orm_responses: list[ResponseORM] = list(getattr(c, "responses", []) or [])

        responses_out = [
            LLMResponseSchema(
                identifier=r.model_identifier,
                response_summary=r.response_summary or "",
                response_text=r.response_text,
            )
            for r in orm_responses
        ]

        clusters_out.append(
            ClusterSchema(
                summary=c.summary,
                responses=responses_out,
            )
        )

    return clusters_out