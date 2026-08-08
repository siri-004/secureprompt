const ResultCard = ({ result }) => {
  if (!result) return null;

  const risk = result.risk || result.risk_level || "UNKNOWN";

  const entities =
    result.entities ||
    result.detected_entities ||
    result.detections ||
    [];

  const redacted =
    result.redacted_prompt ||
    result.redacted_text ||
    result.redacted ||
    "";

  const safe =
    result.safe_prompt ||
    result.safe_rewrite ||
    result.rewritten_prompt ||
    "";

  const getRiskClass = () => {
    const value = risk.toString().toLowerCase();

    if (value === "high") return "risk-high";
    if (value === "medium") return "risk-medium";

    return "risk-low";
  };

  return (
    <section className="results-section">

      {/* Risk */}
      <div className="risk-card">
        <div>
          <p className="result-label">SECURITY ANALYSIS</p>
          <h2>Risk Assessment</h2>
        </div>

        <div className={`risk-badge ${getRiskClass()}`}>
          {risk}
        </div>
      </div>

      {/* Detected entities */}
      <div className="result-card">
        <div className="card-header">
          <div>
            <p className="result-label">DETECTION</p>
            <h3>Sensitive Information Found</h3>
          </div>

          <span className="count-badge">
            {entities.length}
          </span>
        </div>

        {entities.length === 0 ? (
          <div className="safe-message">
            ✓ No sensitive information detected.
          </div>
        ) : (
          <div className="entity-list">
            {entities.map((entity, index) => {
              const type =
                typeof entity === "string"
                  ? entity
                  : entity.type ||
                    entity.entity_type ||
                    "Sensitive Data";

              const text =
                typeof entity === "string"
                  ? ""
                  : entity.text || entity.value || "";

              return (
                <div className="entity" key={index}>
                  <span className="entity-icon">⚠</span>

                  <div>
                    <strong>{type}</strong>

                    {text && (
                      <p>
                        Detected value:{" "}
                        <span>{text}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Redacted */}
      {redacted && (
        <div className="result-card">
          <div className="card-header">
            <div>
              <p className="result-label">SANITIZED OUTPUT</p>
              <h3>Redacted Prompt</h3>
            </div>

            <span className="safe-tag">PROTECTED</span>
          </div>

          <div className="output-box">
            {redacted}
          </div>
        </div>
      )}

      {/* Safe rewrite */}
      {safe && (
        <div className="result-card safe-card">
          <div className="card-header">
            <div>
              <p className="result-label">AI-SAFE VERSION</p>
              <h3>Safe Prompt</h3>
            </div>

            <span className="safe-tag">✓ SAFE</span>
          </div>

          <div className="output-box">
            {safe}
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultCard;