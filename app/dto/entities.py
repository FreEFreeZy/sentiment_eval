from pydantic import BaseModel

class TextRequest(BaseModel):
    comments: str

class Evaluation(BaseModel):
    sentiment: str
    confidence: float

class SentimentResponse(BaseModel):
    response: list[Evaluation]


class HealthResponse(BaseModel):
    health: bool