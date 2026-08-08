const PromptInput = ({
  prompt,
  setPrompt,
  onScan,
  loading,
}) => {
  return (
    <section className="input-section">
      <div className="section-heading">
        <div>
          <h2>Scan Your Prompt</h2>
          <p>
            Detect sensitive information before sending data to an AI model.
          </p>
        </div>

        <span className="secure-badge">🔒 Privacy First</span>
      </div>

      <textarea
        className="prompt-input"
        placeholder="Paste your prompt here...

Example:
Send the customer details to john@gmail.com.
His phone number is 9876543210."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="input-footer">
        <span>{prompt.length} characters</span>

        <button
          className="scan-button"
          onClick={onScan}
          disabled={loading || !prompt.trim()}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Scanning...
            </>
          ) : (
            <>🔍 Scan Prompt</>
          )}
        </button>
      </div>
    </section>
  );
};

export default PromptInput;