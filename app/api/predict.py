from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from ..core.local.memory import memory

router = APIRouter(prefix="")

@router.post("/predict")
async def predict() -> JSONResponse:
    if memory.df is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Сначала загрузите файл"
        )
    #await здесь будет предикт в модели
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"comment": "Модель сделала предсказание!"}
    )