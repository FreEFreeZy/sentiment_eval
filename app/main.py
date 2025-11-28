from fastapi import FastAPI
from app.api.v1.routing import sentiment_router, util_router

app = FastAPI(
    version="0.1.0",
    title="Sentiment",
    description="Service for evaluating emotion from text"
)

app.include_router(sentiment_router.router)
app.include_router(util_router.router)

if __name__ == "__main__":
    import uvicorn
    from app.core.local.settings import settings
    uvicorn.run(
        "main:app",
        host=settings.server_host,
        port=settings.server_port,
        reload=True,
        ssl_keyfile="../ssl/localhost-key.pem",
        ssl_certfile="../ssl/localhost.pem"
    )

