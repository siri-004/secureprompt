#Request/Response models
from pydantic import BaseModel
from typing import List


class PromptRequest(BaseModel):
    prompt: str


class Entity(BaseModel):
    type: str
    text: str
    start: int
    end: int


class PromptResponse(BaseModel):
    risk: str
    entities: List[Entity]
    redacted: str
    safe_prompt: str