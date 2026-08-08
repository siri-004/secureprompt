const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="logo">🛡️</div>

        <div>
          <h1>SecurePrompt</h1>
          <p>AI Prompt Security</p>
        </div>
      </div>

      <div className="status">
        <span className="status-dot"></span>
        Protection Active
      </div>
    </nav>
  );
};

export default Navbar;