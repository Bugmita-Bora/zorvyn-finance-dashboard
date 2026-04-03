import { useApp } from "../../context/AppContext";
import { useMemo } from "react";
import { TrendingUp, TrendingDown, AlertCircle, Award } from "lucide-react";

const Insights = () => {
  const { transactions } = useApp();

  const insights = useMemo(() => {
    // 1. Highest spending category
    const categoryTotals = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + t.amount;
      });

    const highestCategory = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1],
    )[0];

    // 2. Monthly comparison
    const monthlyTotals = {};
    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = { income: 0, expense: 0 };
      }
      if (t.type === "income") {
        monthlyTotals[month].income += t.amount;
      } else {
        monthlyTotals[month].expense += t.amount;
      }
    });

    const months = Object.entries(monthlyTotals);
    const lastMonth = months[months.length - 1];
    const prevMonth = months[months.length - 2];

    const expenseDiff =
      lastMonth && prevMonth ? lastMonth[1].expense - prevMonth[1].expense : 0;

    // 3. Savings rate
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const savingsRate =
      totalIncome > 0
        ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
        : 0;

    return { highestCategory, expenseDiff, lastMonth, prevMonth, savingsRate };
  }, [transactions]);

  return (
    <div className="insights-page">
      <h2 className="insights-title">Insights</h2>

      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-icon red">
            <TrendingDown size={22} />
          </div>
          <div className="insight-content">
            <p className="insight-label">Highest Spending Category</p>
            <h3 className="insight-value">{insights.highestCategory?.[0]}</h3>
            <p className="insight-sub">
              ₹{insights.highestCategory?.[1].toLocaleString()} total spent
            </p>
          </div>
        </div>

        <div className="insight-card">
          <div
            className={`insight-icon ${insights.expenseDiff > 0 ? "red" : "green"}`}
          >
            {insights.expenseDiff > 0 ? (
              <TrendingUp size={22} />
            ) : (
              <TrendingDown size={22} />
            )}
          </div>
          <div className="insight-content">
            <p className="insight-label">Monthly Expense Comparison</p>
            <h3 className="insight-value">
              {insights.expenseDiff > 0 ? "+" : ""}₹
              {Math.abs(insights.expenseDiff).toLocaleString()}
            </h3>
            <p className="insight-sub">
              {insights.expenseDiff > 0 ? "More" : "Less"} than previous month
            </p>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon purple">
            <Award size={22} />
          </div>
          <div className="insight-content">
            <p className="insight-label">Savings Rate</p>
            <h3 className="insight-value">{insights.savingsRate}%</h3>
            <p className="insight-sub">Of total income saved</p>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon blue">
            <AlertCircle size={22} />
          </div>
          <div className="insight-content">
            <p className="insight-label">Observation</p>
            <h3 className="insight-value">
              {insights.savingsRate > 30
                ? "Great Saver! 🎉"
                : insights.savingsRate > 10
                  ? "Doing OK 👍"
                  : "Overspending ⚠️"}
            </h3>
            <p className="insight-sub">
              {insights.savingsRate > 30
                ? "You are saving more than 30% of income"
                : insights.savingsRate > 10
                  ? "Try to save a bit more each month"
                  : "Your expenses are very high vs income"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
