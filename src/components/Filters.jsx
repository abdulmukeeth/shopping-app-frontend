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
    <div className="p-3 border">
      <h5>Filters</h5>

      <h6>Category</h6>
      {["Men Clothing", "Women Clothing", "Kids", "Accessories", "Footwear"].map((cat) => (
        <div key={cat}>
          <input
            type="checkbox"
            checked={filters.category.includes(cat)}
            onChange={() => handleCategory(cat)}
          />{" "}
          {cat}
        </div>
      ))}

      <h6 className="mt-3">Rating: {filters.rating}+</h6>
      <input
        type="range"
        min="0"
        max="5"
        value={filters.rating}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            rating: Number(e.target.value),
          }))
        }
      />

      <h6 className="mt-3">Sort By Price</h6>
      <div>
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

      <button
        className="btn btn-sm btn-outline-danger mt-3"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}
