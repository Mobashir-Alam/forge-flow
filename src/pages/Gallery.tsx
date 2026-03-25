import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Search, QrCode } from "lucide-react";
import { catalogCategories, CatalogCategory, CatalogItem } from "@/data/catalogData";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<CatalogCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = catalogCategories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredItems = selectedCategory?.items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.variation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  return (
    <div className="min-h-screen pt-20 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 pt-4"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
            <QrCode className="w-3.5 h-3.5" />
            QR Catalog
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Product Catalog
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Select a category to see available designs & variations
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative max-w-md mx-auto mb-8"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={selectedCategory ? "Search items..." : "Search categories..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            /* Category Grid */
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"
            >
              {filteredCategories.map((category, i) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchTerm("");
                  }}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border/40 text-left transition-shadow hover:shadow-lg hover:shadow-primary/5 active:scale-[0.98]"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-sm md:text-base leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {category.items.length} items
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            /* Category Items */
            <motion.div
              key="items"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back button */}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-5 py-2 px-3 -ml-3 rounded-lg hover:bg-accent/50 transition-colors active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                All Categories
              </button>

              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold">
                  {selectedCategory.name}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {filteredItems?.length} design{(filteredItems?.length ?? 0) !== 1 ? "s" : ""} available
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredItems?.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedItem(item)}
                    className="group rounded-2xl overflow-hidden bg-card border border-border/40 text-left transition-shadow hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-primary mt-0.5">{item.variation}</p>
                      {item.code && (
                        <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                          {item.code}
                        </p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Preview Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl gap-0">
          {selectedItem && (
            <>
              <div className="relative aspect-square bg-muted">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-display text-xl font-bold">{selectedItem.name}</h3>
                <p className="text-primary font-medium text-sm">{selectedItem.variation}</p>
                {selectedItem.code && (
                  <p className="text-xs text-muted-foreground font-mono pt-1">
                    Code: {selectedItem.code}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
