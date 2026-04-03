import { useApp } from "../../context/AppContext";
import { categories } from "../../data/transactions";
import { Search } from "lucide-react";

const FilterBar = () => {
  const {
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
  } = useApp();

  return (
    <div className="filter-bar">
      <div className="search-box">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};

export default FilterBar;
