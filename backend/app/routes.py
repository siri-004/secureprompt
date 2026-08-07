#api endpoints
from fastapi import APIRouter

from app.models import (
    PromptRequest,
    PromptResponse,
    Entity
)

from app.detector import detect_sensitive_data
from app.redactor import redact_prompt
from app.rewriter import rewrite_prompt

router = APIRouter()


@router.post("/scan", response_model=PromptResponse)
def scan_prompt(request: PromptRequest):

    entities = detect_sensitive_data(request.prompt)

    redacted = redact_prompt(request.prompt, entities)

    safe_prompt = rewrite_prompt(redacted)

    risk = "LOW"

    if len(entities) > 0:
        risk = "HIGH"

    entity_objects = [
        Entity(
            type=e["type"],
            text=e["text"]
        )
        for e in entities
    ]

    return PromptResponse(
        risk=risk,
        entities=entity_objects,
        redacted=redacted,
        safe_prompt=safe_prompt
    )