import { useApp } from "../../context/AppContext";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const SummaryCards = () => {
  const { totalIncome, totalExpenses, totalBalance } = useApp();

  const cards = [
    {
      title: "Total Balance",
      amount: totalBalance,
      icon: <Wallet size={24} />,
      color: "card-balance",
    },
    {
      title: "Total Income",
      amount: totalIncome,
      icon: <TrendingUp size={24} />,
      color: "card-income",
    },
    {
      title: "Total Expenses",
      amount: totalExpenses,
      icon: <TrendingDown size={24} />,
      color: "card-expense",
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div key={card.title} className={`summary-card ${card.color}`}>
          <div className="card-icon">{card.icon}</div>
          <div className="card-info">
            <p className="card-title">{card.title}</p>
            <h2 className="card-amount">₹{card.amount.toLocaleString()}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
