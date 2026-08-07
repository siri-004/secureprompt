#Regex detection
import re

# -------------------------------
# Regex Patterns
# -------------------------------

PATTERNS = {
    "EMAIL": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b",

    "PHONE": r"\b(?:\+91[-\s]?)?[6-9]\d{9}\b",

    "AADHAAR": r"\b\d{4}\s?\d{4}\s?\d{4}\b",

    "PAN": r"\b[A-Z]{5}[0-9]{4}[A-Z]\b",

    "IFSC": r"\b[A-Z]{4}0[A-Z0-9]{6}\b",

    "ACCOUNT_NUMBER": r"\b\d{9,18}\b",

    "CREDIT_CARD": r"\b(?:\d{4}[- ]?){3}\d{4}\b",

    "IP_ADDRESS": r"\b(?:\d{1,3}\.){3}\d{1,3}\b",

    "API_KEY": r"\bsk-[A-Za-z0-9]{20,}\b",

    "PASSWORD": r"(?i)(password|passwd|pwd)\s*[:=]\s*\S+"
}


def detect_sensitive_data(prompt: str):

    entities = []

    for entity_type, pattern in PATTERNS.items():

        matches = re.finditer(pattern, prompt)

        for match in matches:

            entities.append({
                "type": entity_type,
                "text": match.group(),
                "start": match.start(),
                "end": match.end()
            })

    return entities