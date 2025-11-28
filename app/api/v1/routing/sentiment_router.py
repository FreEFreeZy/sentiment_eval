from app.dto.entities import TextRequest, SentimentResponse
from fastapi import APIRouter

router = APIRouter(prefix="/eval_sentiment")

@router.post("/")
def eval_sentiment(request: TextRequest) -> SentimentResponse:
    pass