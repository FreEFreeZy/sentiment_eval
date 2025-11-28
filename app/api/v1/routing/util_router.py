from app.dto.entities import HealthResponse
from fastapi import APIRouter

router = APIRouter(prefix="")

@router.get("/health")
def health() -> HealthResponse:
    return HealthResponse(health=True)