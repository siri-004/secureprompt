#Regex detection
def detect_sensitive_data(prompt: str):
    """
    Dummy detector for MVP.
    Later replace with Regex + Presidio + spaCy.
    """

    entities = []

    sensitive_keywords = {
        "Rahul Sharma": "PERSON",
        "Project Falcon": "PROJECT",
        "OpenAI": "ORGANIZATION",
        "1234567890": "PHONE",
        "987654321": "ACCOUNT_NUMBER"
    }

    for text, entity_type in sensitive_keywords.items():
        if text in prompt:
            entities.append({
                "type": entity_type,
                "text": text
            })

    return entities