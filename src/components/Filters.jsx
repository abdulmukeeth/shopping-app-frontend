import { useFilter } from "../context/FilterContext";

export default function Filters() {
  const { filters, setFilters, clearFilters } = useFilter();

  const handleCategory = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  };

  return (
    <div className="p-3 border mb-4">
      <h5 className="mb-3">Filters</h5>

      {/* CATEGORY */}
      <div className="mb-4">
        <h6 className="mb-2">Category</h6>
        {["Men Clothing", "Women Clothing", "Kids", "Accessories", "Footwear"].map((cat) => (
          <div key={cat} className="mb-1">
            <input
              type="checkbox"
              checked={filters.category.includes(cat)}
              onChange={() => handleCategory(cat)}
            />{" "}
            {cat}
          </div>
        ))}
      </div>

      {/* RATING */}
      <div className="mb-4">
        <h6 className="mb-2">Rating: {filters.rating}+</h6>
        <input
          type="range"
          min="0"
          max="5"
          value={filters.rating}
          className="form-range"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              rating: Number(e.target.value),
            }))
          }
        />
      </div>

      {/* SORT */}
      <div className="mb-4">
        <h6 className="mb-2">Sort By Price</h6>

        <div className="mb-1">
          <input
            type="radio"
            name="sort"
            checked={filters.sortBy === "LOW_TO_HIGH"}
            onChange={() =>
              setFilters((prev) => ({ ...prev, sortBy: "LOW_TO_HIGH" }))
            }
          />{" "}
          Low to High
        </div>

        <div>
          <input
            type="radio"
            name="sort"
            checked={filters.sortBy === "HIGH_TO_LOW"}
            onChange={() =>
              setFilters((prev) => ({ ...prev, sortBy: "HIGH_TO_LOW" }))
            }
          />{" "}
          High to Low
        </div>
      </div>

      <button
        className="btn btn-sm btn-outline-danger w-100"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}