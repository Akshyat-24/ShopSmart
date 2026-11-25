const BASE_URL = "https://dummyjson.com";

export const PRODUCTS_PER_PAGE = 12;

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Something went wrong. Please try again.");
  }
  return response.json();
}

export function fetchProducts({ search, category, sort, page }) {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  let params = `limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;

  if (sort) {
    const [sortBy, order] = sort.split("-");
    params += `&sortBy=${sortBy}&order=${order}`;
  }

  if (search) {
    return getData(`${BASE_URL}/products/search?q=${encodeURIComponent(search)}&${params}`);
  }

  if (category) {
    return getData(`${BASE_URL}/products/category/${category}?${params}`);
  }

  return getData(`${BASE_URL}/products?${params}`);
}

export function fetchCategories() {
  return getData(`${BASE_URL}/products/categories`);
}

export function fetchProductById(id) {
  return getData(`${BASE_URL}/products/${id}`);
}
