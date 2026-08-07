#Replace sensitive text
def redact_prompt(prompt: str, entities):
    """
    Replace detected sensitive text with placeholders.
    """

    redacted = prompt

    for entity in entities:
        placeholder = f"[{entity['type']}]"
        redacted = redacted.replace(entity["text"], placeholder)

    return redacted