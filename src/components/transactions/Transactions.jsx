import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import FilterBar from "./FilterBar";
import AddTransactionModal from "./AddTransactionModal";
import { Plus } from "lucide-react";

const Transactions = () => {
  const { filteredTransactions, role } = useApp();
  const [showModal, setShowModal] = useState(false);

  const exportCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];
    const rows = filteredTransactions.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const groupedTransactions = useMemo(() => {
    const groups = {};
    filteredTransactions.forEach((t) => {
      const date = new Date(t.date);
      const monthYear = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      if (!groups[monthYear]) {
        groups[monthYear] = {
          monthYear,
          transactions: [],
          income: 0,
          expense: 0,
        };
      }

      groups[monthYear].transactions.push(t);
      if (t.type === "income") {
        groups[monthYear].income += t.amount;
      } else {
        groups[monthYear].expense += t.amount;
      }
    });

    return Object.values(groups);
  }, [filteredTransactions]);

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <h2>Transactions History</h2>
        <div className="header-actions">
          <button className="btn-export" onClick={exportCSV}>
            Export CSV
          </button>
          {role === "admin" && (
            <button className="btn-add" onClick={() => setShowModal(true)}>
              <Plus size={16} />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <FilterBar />

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <p>No transactions found!</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {groupedTransactions.map((group) => (
                <React.Fragment key={group.monthYear}>
                  <tr className="month-separator">
                    <td colSpan="3">
                      <span className="month-title">{group.monthYear}</span>
                    </td>
                    <td>
                      <div className="month-stats">
                        <span className="income-text">
                          +₹{group.income.toLocaleString()}
                        </span>
                        <span className="stats-divider">|</span>
                        <span className="expense-text">
                          -₹{group.expense.toLocaleString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {group.transactions.map((t) => (
                    <tr key={t.id}>
                      <td>
                        {new Date(t.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="font-medium">{t.description}</td>
                      <td>
                        <span className="category-badge">{t.category}</span>
                      </td>
                      <td
                        className={`amount ${t.type === "income" ? "income-text" : "expense-text"}`}
                      >
                        {t.type === "income" ? "+" : "-"}₹
                        {t.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Transactions;
