import os


class Settings:
    server_host = os.getenv("SERVER_HOST", "0.0.0.0")
    server_port = os.getenv("SERVER_PORT", 8443)

settings = Settings()