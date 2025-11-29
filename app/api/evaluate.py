from fastapi import APIRouter, UploadFile, status, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter(prefix="")

@router.post("/evaluate")
async def evaluate(file: UploadFile) -> JSONResponse:
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Файл должен быть в формате csv!"
        )

    #логика возврата метрик
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content= {"metrics": None}
    )