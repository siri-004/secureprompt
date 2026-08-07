#fast api entry point
from fastapi import FastAPI

from app.routes import router

app = FastAPI(
    title="SecurePrompt API",
    description="Privacy-first Prompt Security API",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "🚀 SecurePrompt Backend Running"
    }