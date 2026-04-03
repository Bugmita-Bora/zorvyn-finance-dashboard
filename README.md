# Finance Grow - Finance Dashboard UI

A clean and interactive finance dashboard built with React and CSS.

## Live Demo

https://zorvyn-finance-dashboard-red.vercel.app

## Repository

https://github.com/Bugmita-Bora/zorvyn-finance-dashboard

---

## Setup Instructions

1. Clone the repository:
   git clone https://github.com/YOUR_USERNAME/zorvyn-finance-dashboard.git

2. Navigate to the project:
   cd zorvyn-finance-dashboard

3. Install dependencies:
   npm install

4. Start the development server:
   npm run dev

5. Open your browser at:
   http://localhost:5173

---

## Project Overview

FinanceIQ is a frontend finance dashboard that allows users to track and understand their financial activity. It is built entirely on the frontend with mock data and no backend dependency.

---

## Features

### Dashboard

- Summary cards showing Total Balance, Total Income and Total Expenses
- Balance Trend line chart showing monthly income, expenses and balance
- Spending Breakdown pie chart showing expenses by category

### Transactions

- Full transaction history grouped by month (GPay style)
- Search transactions by description
- Filter by type (income/expense) and category
- Sort by newest or oldest first
- Export transactions to CSV file
- Add new transactions (Admin only)

### Insights

- Highest spending category
- Monthly expense comparison
- Savings rate calculation
- Smart observation based on spending behavior

### Role Based UI (RBAC)

- Viewer role — can only view data
- Admin role — can add new transactions
- Switch roles using the dropdown in the navbar

### Other Features

- Dark mode toggle
- Fully responsive design
- Mobile bottom navigation
- Empty state handling

---

## Tech Stack

- React 18
- Vite
- CSS (component based separate files)
- Recharts (for charts)
- Lucide React (for icons)
- React Context API + useMemo (state management)

---

## State Management Approach

Used React Context API with useMemo for performance optimization. All global state like transactions, role, filters and computed values like totalIncome, totalExpenses and totalBalance are managed in a single AppContext. useMemo ensures computed values only recalculate when their dependencies change, avoiding unnecessary re-renders.

---

## Project Structure

```
src/
├── components/
│ ├── layout/
│ │ ├── Navbar.jsx
│ │ └── Sidebar.jsx
│ ├── dashboard/
│ │ ├── SummaryCards.jsx
│ │ ├── BalanceChart.jsx
│ │ └── SpendingChart.jsx
│ ├── transactions/
│ │ ├── Transactions.jsx
│ │ ├── FilterBar.jsx
│ │ └── AddTransactionModal.jsx
│ └── insights/
│ └── Insights.jsx
├── context/
│ └── AppContext.jsx
├── data/
│ └── transactions.js
├── styles/
│ ├── main.css
│ ├── navbar.css
│ ├── sidebar.css
│ ├── dashboard.css
│ ├── transactions.css
│ ├── insights.css
│ ├── responsive.css
│ └── darkmode.css
├── App.jsx
├── main.jsx
└── index.css

```

## Assumptions Made

- Mock data is used instead of a real API
- Role switching is simulated on the frontend for demonstration
- Data does not persist on page refresh (no localStorage used)
