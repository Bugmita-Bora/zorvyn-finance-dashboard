import "./styles/main.css";
import { useState } from "react";
import { useApp } from "./context/AppContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import SummaryCards from "./components/dashboard/SummaryCards";
import BalanceChart from "./components/dashboard/BalanceChart";
import SpendingChart from "./components/dashboard/SpendingChart";
import Transactions from "./components/transactions/Transactions";
import Insights from "./components/insights/Insights";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const { darkMode } = useApp();

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <div className="main-container">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="page-content">
          {activePage === "dashboard" && (
            <>
              <SummaryCards />
              <div className="charts-container">
                <BalanceChart />
                <SpendingChart />
              </div>
            </>
          )}
          {activePage === "transactions" && <Transactions />}
          {activePage === "insights" && <Insights />}
        </div>
      </div>
    </div>
  );
}

export default App;
