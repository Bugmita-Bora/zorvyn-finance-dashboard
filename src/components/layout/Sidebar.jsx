import { LayoutDashboard, ArrowLeftRight, Lightbulb } from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: <ArrowLeftRight size={20} />,
    },
    { id: "insights", label: "Insights", icon: <Lightbulb size={20} /> },
  ];

  return (
    <aside className="sidebar">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`sidebar-item ${activePage === item.id ? "active" : ""}`}
          onClick={() => setActivePage(item.id)}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
