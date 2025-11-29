from fastapi import FastAPI
from app.api import routers

app = FastAPI(
    version="0.1.0",
    title="Sentiment",
    description="Service for evaluating emotion from text"
)

for router in routers:
    app.include_router(router)

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
