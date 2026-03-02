// Applies search, category, rating and sorting
export function applyFilters(products, filters, searchText) {
  let data = [...products];

  if (searchText) {
    data = data.filter((p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (filters.category.length) {
    data = data.filter((p) => filters.category.includes(p.category));
  }

  if (filters.rating) {
    data = data.filter((p) => p.rating >= filters.rating);
  }

  if (filters.sortBy === "LOW_TO_HIGH") {
    data.sort((a, b) => a.price - b.price);
  }

  if (filters.sortBy === "HIGH_TO_LOW") {
    data.sort((a, b) => b.price - a.price);
  }

  return data;
}
