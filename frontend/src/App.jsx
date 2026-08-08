import { useState } from "react";
import Navbar from "./components/Navbar";
import PromptInput from "./components/PromptInput";
import ResultCard from "./components/ResultCard";
import { scanPrompt } from "./services/api";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await scanPrompt(prompt);

      console.log("Backend response:", data);

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to SecurePrompt backend. Make sure the FastAPI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <main className="main-container">

        {/* Hero */}
        <section className="hero">
          <div className="hero-badge">
            🛡️ ENTERPRISE AI SECURITY
          </div>

          <h1>
            Protect sensitive data
            <br />
            <span>before it reaches AI.</span>
          </h1>

          <p>
            SecurePrompt detects sensitive information in your prompts,
            redacts it, and prepares a safer version for AI systems.
          </p>
        </section>

        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onScan={handleScan}
          loading={loading}
        />

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <ResultCard result={result} />

      </main>

      <footer>
        SecurePrompt • Privacy-first AI security
      </footer>
    </div>
  );
}

export default App;