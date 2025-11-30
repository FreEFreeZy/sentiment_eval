import pandas
from fastapi import APIRouter, HTTPException, status, Body, Header
from fastapi.responses import StreamingResponse
from ..core.local.memory import memory
from ..core.local.model import model
from io import StringIO

router = APIRouter(prefix="")

@router.post("/upload")
async def upload(file_content: str = Body(..., media_type="text/csv"),
                 x_filename: str = Header(None)) -> StreamingResponse:
    if not x_filename.endswith(".csv"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Файл должен быть в формате csv!"
        )

    memory.df = pandas.read_csv(StringIO(file_content[1:]), sep=',')
    print(memory.df)
    print(memory.df.shape)
    memory.result = model.predict(memory.df)
    if memory.result is None:
        raise
    buffer = StringIO()
    memory.result.to_csv(buffer, index=False)
    return StreamingResponse(
        iter(buffer.getvalue()),
        media_type="text_csv",
        headers={"Content-Disposition":  f"attachment; filename=results.csv"}
    )