import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useProducts, useCategories } from "@/hooks/useProducts";

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [showFilters, setShowFilters] = useState(false);
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [] } = useCategories();

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategory) result = result.filter(p => p.category_id === selectedCategory);
    result = result.filter(p => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]);
    switch (sort) {
      case "price-asc": result.sort((a, b) => Number(a.price) - Number(b.price)); break;
      case "price-desc": result.sort((a, b) => Number(b.price) - Number(a.price)); break;
      case "rating": result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
    }
    return result;
  }, [search, selectedCategory, sort, priceRange, products]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-semibold text-sm mb-3">Categories</h3>
        <div className="space-y-1">
          <button onClick={() => setSelectedCategory("")} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
            All Categories
          </button>
          {categories.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === c.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display font-semibold text-sm mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm" placeholder="Min" />
          <span className="text-muted-foreground">-</span>
          <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm" placeholder="Max" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Shop <span className="gradient-text">Products</span></h1>
          <p className="text-muted-foreground mt-2">Browse our complete collection of hardware and construction materials</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none">
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden px-4 py-2.5 rounded-xl bg-card border border-border text-sm flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 p-5 rounded-2xl glass border border-border/30">
              <FilterPanel />
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
                <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="absolute left-0 top-0 bottom-0 w-80 glass-strong p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-bold">Filters</h2>
                    <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
                  </div>
                  <FilterPanel />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1">
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-2xl bg-card border border-border/40 overflow-hidden animate-pulse">
                    <div className="aspect-square bg-secondary" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-secondary rounded w-1/3" />
                      <div className="h-4 bg-secondary rounded w-3/4" />
                      <div className="h-5 bg-secondary rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">{filtered.length} products found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm mt-1">Try adjusting your filters</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
