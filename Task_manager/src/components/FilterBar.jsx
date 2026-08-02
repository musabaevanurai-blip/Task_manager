const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function FilterBar({
  filter,
  onFilterChange,
  sortOrder,
  onSortOrderChange,
  activeCount,
  completedCount,
  onClearCompleted,
}) {
  return (
    <footer className="filter-bar">
      <span>{activeCount} items left</span>

      <div className="filter-bar__filters">
        {FILTERS.map((item) => (
          <button
            className={filter === item.value ? "active" : ""}
            key={item.value}
            onClick={() => onFilterChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="filter-bar__right">
        <select
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value)}
        >
          <option value="newest">New first</option>
          <option value="oldest">Old first</option>
        </select>

        <button
          disabled={completedCount === 0}
          onClick={onClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </footer>
  );
}