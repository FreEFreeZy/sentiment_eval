from fastapi import APIRouter, status, HTTPException
from fastapi.responses import StreamingResponse
from ..core.local.memory import memory
from io import StringIO

router = APIRouter(prefix="")

@router.post("/download_results")
async def download() -> StreamingResponse:
    if memory.result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Нет результатов для скачивания!"
        )
    buffer = StringIO()
    memory.result.to_csv(buffer, index=False)
    return StreamingResponse(
        iter(buffer.getvalue()),
        media_type="text_csv",
        headers={"Content-Disposition":  f"attachment; filename=results.csv"}
    )