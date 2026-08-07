#Replace sensitive text
def redact_prompt(prompt: str, entities):

    # Replace from back to front
    # so indexes don't shift

    entities = sorted(
        entities,
        key=lambda x: x["start"],
        reverse=True
    )

    redacted = prompt

    for entity in entities:

        placeholder = f"[{entity['type']}]"

        redacted = (
            redacted[:entity["start"]]
            + placeholder
            + redacted[entity["end"]:]
        )

    return redacted