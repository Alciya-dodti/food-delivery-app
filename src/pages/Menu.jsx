 
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
 
// ── All food items (in real app: fetch from API in useEffect) ──
const ALL_FOODS = [
  { id: 1,  name: "Margherita Pizza",   emoji: "🍕", price: 249, rating: 4.5, category: "Pizza",   description: "Classic tomato, mozzarella, fresh basil." },
  { id: 2,  name: "Pepperoni Pizza",    emoji: "🍕", price: 299, rating: 4.7, category: "Pizza",   description: "Loaded with spicy pepperoni slices." },
  { id: 3,  name: "Classic Burger",     emoji: "🍔", price: 149, rating: 4.3, category: "Burgers", description: "Juicy patty, lettuce, tomato, secret sauce." },
  { id: 4,  name: "Double Smash",       emoji: "🍔", price: 199, rating: 4.8, category: "Burgers", description: "Two smashed beef patties, cheddar, pickles." },
  { id: 5,  name: "Chicken Taco",       emoji: "🌮", price: 129, rating: 4.4, category: "Tacos",   description: "Grilled chicken, salsa, sour cream, jalapeño." },
  { id: 6,  name: "Veg Taco",           emoji: "🌮", price: 99,  rating: 4.2, category: "Tacos",   description: "Black beans, corn, guacamole, lime." },
  { id: 7,  name: "Ramen Bowl",         emoji: "🍜", price: 189, rating: 4.6, category: "Noodles", description: "Rich tonkotsu broth, soft egg, nori." },
  { id: 8,  name: "Pad Thai",           emoji: "🍜", price: 169, rating: 4.5, category: "Noodles", description: "Rice noodles, peanuts, tamarind sauce." },
  { id: 9,  name: "Chocolate Lava Cake",emoji: "🍰", price: 119, rating: 4.9, category: "Desserts",description: "Warm cake with molten chocolate centre." },
  { id: 10, name: "Mango Cheesecake",   emoji: "🍰", price: 139, rating: 4.7, category: "Desserts",description: "Creamy cheesecake with fresh mango compote." },
  { id: 11, name: "BBQ Burger",         emoji: "🍔", price: 179, rating: 4.6, category: "Burgers", description: "Smoky BBQ sauce, caramelized onions, bacon." },
  { id: 12, name: "Farm Pizza",         emoji: "🍕", price: 279, rating: 4.4, category: "Pizza",   description: "Mushroom, bell peppers, black olives, corn." },
];
 
const CATEGORIES = ["All", "Pizza", "Burgers", "Tacos", "Noodles", "Desserts"];
 
function Menu() {
  // CONCEPT: useSearchParams — reads URL query string
  // e.g. /menu?category=Pizza → category = "Pizza"
  const [searchParams] = useSearchParams();
 
  const [searchText, setSearchText]     = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy]             = useState("default"); // "price-asc" | "rating"
 
  // CONCEPT: useEffect — runs when component mounts
  // Reads the ?category= from URL and sets the filter
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== "All") {
      // Strip emoji if present e.g. "🍕 Pizza" → "Pizza"
      const clean = cat.replace(/[^\w\s]/g, "").trim();
      setActiveCategory(clean);
    }
  }, [searchParams]);
 
  // CONCEPT: useMemo — only recalculates when dependencies change
  // Without useMemo, this filter runs on EVERY render (wasteful)
  const filteredFoods = useMemo(() => {
    let list = [...ALL_FOODS];
 
    // Filter by category
    if (activeCategory !== "All") {
      list = list.filter((f) => f.category === activeCategory);
    }
 
    // Filter by search text
    if (searchText.trim()) {
      list = list.filter((f) =>
        f.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
 
    // Sort
    if (sortBy === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating")     list.sort((a, b) => b.rating - a.rating);
 
    return list;
  }, [activeCategory, searchText, sortBy]);
 
  return (
    <div style={styles.page}>
      <div style={styles.container}>
 
        {/* Header */}
        <h1 style={styles.title}>Our Menu</h1>
        <p style={styles.sub}>{filteredFoods.length} items available</p>
 
        {/* Search + Sort row */}
        <div style={styles.toolRow}>
          <input
            type="text"
            placeholder="🔍  Search dishes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={styles.searchInput}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
 
        {/* Category tabs */}
        <div style={styles.tabs}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              style={{
                ...styles.tab,
                background: activeCategory === cat ? "#ff6b35" : "#fff",
                color:      activeCategory === cat ? "#fff"    : "#555",
                borderColor: activeCategory === cat ? "#ff6b35" : "#ddd",
              }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
 
        {/* CONCEPT: Conditional Rendering
            Show "no results" message if nothing matches */}
        {filteredFoods.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: "48px" }}>🍽️</div>
            <p>No items found. Try a different search!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filteredFoods.map((food) => (
              // CONCEPT: State lifting
              // FoodCard reads its own cart quantity from Redux
              // but category filter state lives here in Menu
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
 
      </div>
    </div>
  );
}
 
const styles = {
  page: { background: "#f8f8f8", minHeight: "100vh", paddingBottom: "60px" },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "40px 32px" },
  title: { fontSize: "32px", fontWeight: 900, color: "#1a1a2e", marginBottom: "4px" },
  sub: { fontSize: "14px", color: "#888", marginBottom: "28px" },
  toolRow: { display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" },
  searchInput: {
    flex: 1, minWidth: "200px",
    padding: "12px 16px", borderRadius: "12px",
    border: "1.5px solid #e0e0e0", fontSize: "14px",
    outline: "none", fontFamily: "inherit",
    background: "#fff",
  },
  sortSelect: {
    padding: "12px 16px", borderRadius: "12px",
    border: "1.5px solid #e0e0e0", fontSize: "14px",
    outline: "none", fontFamily: "inherit", background: "#fff",
    cursor: "pointer",
  },
  tabs: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" },
  tab: {
    padding: "8px 18px", borderRadius: "100px",
    border: "1.5px solid", fontSize: "13px", fontWeight: 600,
    cursor: "pointer", transition: "all 0.18s", fontFamily: "inherit",
  },
  grid: {
    display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "flex-start",
  },
  empty: { textAlign: "center", padding: "60px", color: "#999", fontSize: "16px" },
};
 
export default Menu;
