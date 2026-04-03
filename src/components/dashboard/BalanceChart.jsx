import { useApp } from "../../context/AppContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceChart = () => {
  const { transactions } = useApp();

  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });

    if (!acc[month]) {
      acc[month] = { month, income: 0, expenses: 0 };
    }

    if (t.type === "income") {
      acc[month].income += t.amount;
    } else {
      acc[month].expenses += t.amount;
    }

    return acc;
  }, {});

  const chartData = Object.values(monthlyData).map((d) => ({
    month: d.month,
    balance: d.income - d.expenses,
    income: d.income,
    expenses: d.expenses,
  }));

  return (
    <div className="chart-card">
      <h3 className="chart-title">Balance Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#16a34a"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#dc2626"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
