import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Moon,
  Sun,
} from "lucide-react";

const Navbar = ({ activePage, setActivePage }) => {
  const { role, setRole, darkMode, setDarkMode } = useApp();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Finance Grow</h1>
        </div>
        <div className="navbar-right">
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="navbar-role">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-nav">
        <div
          className={`mobile-nav-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>
        <div
          className={`mobile-nav-item ${activePage === "transactions" ? "active" : ""}`}
          onClick={() => setActivePage("transactions")}
        >
          <ArrowLeftRight size={20} />
          <span>Transactions</span>
        </div>
        <div
          className={`mobile-nav-item ${activePage === "insights" ? "active" : ""}`}
          onClick={() => setActivePage("insights")}
        >
          <Lightbulb size={20} />
          <span>Insights</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
