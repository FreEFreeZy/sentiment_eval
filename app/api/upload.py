from io import StringIO

import pandas
from fastapi import APIRouter, HTTPException, status, Body, Header
from fastapi.responses import JSONResponse
from ..core.local.memory import memory
import io

router = APIRouter(prefix="")

@router.post("/upload")
async def upload(file_content: str = Body(..., media_type="text/csv"),
                 x_filename: str = Header(None)
                 ) -> JSONResponse:
    if not x_filename.endswith(".csv"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Файл должен быть в формате csv!"
        )

    csv_io = io.StringIO(file_content[1:])
    memory.df = pandas.read_csv(csv_io)
    print(memory.df)
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Файл успешно загружен"}
    )