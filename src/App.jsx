import { useState, useEffect } from "react";
import { fetchProducts, fetchCategories } from "./api";
import useDebounce from "./hooks/useDebounce";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SortSelect from "./components/SortSelect";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

function App() {
  const [view, setView] = useState("shop");
  const [selectedId, setSelectedId] = useState(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const [cart, setCart] = useState([]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchProducts({ search: debouncedSearch, category, sort, page })
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [debouncedSearch, category, sort, page]);

  function handleSearchChange(value) {
    setSearch(value);
    setCategory("");
    setPage(1);
  }

  function handleCategoryChange(value) {
    setCategory(value);
    setSearch("");
    setPage(1);
  }

  function handleSortChange(value) {
    setSort(value);
    setPage(1);
  }

  function openProduct(id) {
    setSelectedId(id);
    setView("details");
  }

  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        onHome={() => setView("shop")}
        onCart={() => setView("cart")}
      />

      <main className="container">
        {view === "shop" && (
          <>
            <div className="toolbar">
              <SearchBar value={search} onChange={handleSearchChange} />
              <CategoryFilter
                categories={categories}
                value={category}
                onChange={handleCategoryChange}
              />
              <SortSelect value={sort} onChange={handleSortChange} />
            </div>

            {loading && <p className="message">Loading products...</p>}
            {error && <p className="message error">{error}</p>}
            {!loading && !error && products.length === 0 && (
              <p className="message">No products found.</p>
            )}

            {!loading && !error && (
              <ProductList
                products={products}
                onView={openProduct}
                onAdd={addToCart}
              />
            )}

            <Pagination page={page} total={total} onChange={setPage} />
          </>
        )}

        {view === "details" && (
          <ProductDetails
            productId={selectedId}
            onBack={() => setView("shop")}
            onAdd={addToCart}
          />
        )}

        {view === "cart" && (
          <Cart
            items={cart}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
            onContinue={() => setView("shop")}
          />
        )}
      </main>
    </div>
  );
}

export default App;
