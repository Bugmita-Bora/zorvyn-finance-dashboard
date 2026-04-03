import { createContext, useContext, useState, useMemo } from "react";
import { transactions as initialTransactions } from "../data/transactions";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("viewer");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [darkMode, setDarkMode] = useState(false);

  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalBalance = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => filterType === "all" || t.type === filterType)
      .filter((t) => filterCategory === "all" || t.category === filterCategory)
      .filter((t) =>
        t.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) =>
        sortOrder === "newest"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date),
      );
  }, [transactions, filterType, filterCategory, searchQuery, sortOrder]);
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: transactions.length + 1,
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        filteredTransactions,
        role,
        setRole,
        filterType,
        setFilterType,
        filterCategory,
        setFilterCategory,
        searchQuery,
        setSearchQuery,
        sortOrder,
        setSortOrder,
        totalIncome,
        totalExpenses,
        totalBalance,
        addTransaction,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  return useContext(AppContext);
};

export { AppProvider, useApp };
