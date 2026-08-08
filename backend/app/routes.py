from fastapi import APIRouter

from app.models import (
    PromptRequest,
    PromptResponse,
    Entity
)

from app.detector import detect_sensitive_data
from app.redactor import redact_prompt
from app.rewriter import rewrite_prompt


router = APIRouter(
    prefix="/api",
    tags=["SecurePrompt"]
)


@router.post("/scan", response_model=PromptResponse)
def scan_prompt(request: PromptRequest):

    # 1. Detect sensitive information
    entities = detect_sensitive_data(request.prompt)

    # 2. Redact sensitive information
    redacted = redact_prompt(
        request.prompt,
        entities
    )

    # 3. Generate safe prompt
    safe_prompt = rewrite_prompt(redacted)

    # 4. Calculate risk
    count = len(entities)

    if count == 0:
        risk = "LOW"
    elif count <= 2:
        risk = "MEDIUM"
    else:
        risk = "HIGH"

    # 5. Convert dictionaries into Pydantic objects
    entity_objects = [
        Entity(
            type=e["type"],
            text=e["text"],
            start=e["start"],
            end=e["end"]
        )
        for e in entities
    ]

    # 6. Return response
    return PromptResponse(
        risk=risk,
        entities=entity_objects,
        redacted=redacted,
        safe_prompt=safe_prompt
    )