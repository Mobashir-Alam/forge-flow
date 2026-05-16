import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Search, QrCode, Download, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import QRCode from "qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCategories, useProducts, type DBCategory, type DBProduct } from "@/hooks/useProducts";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<DBCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<DBProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [qrOpen, setQrOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const { data: categories = [], isLoading: catLoading } = useCategories();
  const { data: products = [], isLoading: prodLoading } = useProducts(selectedCategory?.id);

  const filteredCategories = useMemo(
    () => categories.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [categories, searchTerm]
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const currentUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/gallery`;
    return selectedCategory ? `${base}?category=${selectedCategory.slug || selectedCategory.id}` : base;
  }, [selectedCategory]);

  useEffect(() => {
    if (!qrOpen || !currentUrl) return;
    QRCode.toDataURL(currentUrl, { width: 512, margin: 2, color: { dark: "#0a0a0a", light: "#ffffff" } })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [qrOpen, currentUrl]);

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    const safe = (selectedCategory?.name || "raj-hardware-catalog").replace(/\s+/g, "-").toLowerCase();
    a.download = `${safe}-qr.png`;
    a.click();
  };

  const shareUrl = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Raj Hardware Catalog", url: currentUrl });
      } else {
        await navigator.clipboard.writeText(currentUrl);
      }
    } catch {}
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 pt-4 relative"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
            <QrCode className="w-3.5 h-3.5" />
            QR Catalog
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            {selectedCategory ? selectedCategory.name : "Product Catalog"}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {selectedCategory ? "Browse products in this category" : "Select a category to explore our products"}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setQrOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:shadow-glow transition-shadow btn-ripple"
            >
              <QrCode className="w-4 h-4" />
              Generate QR
            </button>
            <button
              onClick={shareUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/50 text-sm font-medium hover:bg-accent transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
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
              {catLoading && (
                <p className="col-span-full text-center text-muted-foreground py-12">Loading categories...</p>
              )}
              {!catLoading && filteredCategories.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground py-12">No categories found.</p>
              )}
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
                      src={category.image_url || "/placeholder.svg"}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-sm md:text-base leading-tight">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                        {category.description}
                      </p>
                    )}
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
                <h2 className="font-display text-2xl font-bold">{selectedCategory.name}</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} available
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {prodLoading && (
                  <p className="col-span-full text-center text-muted-foreground py-12">Loading products...</p>
                )}
                {!prodLoading && filteredProducts.length === 0 && (
                  <p className="col-span-full text-center text-muted-foreground py-12">No products in this category.</p>
                )}
                {filteredProducts.map((item, i) => (
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
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-primary font-semibold mt-0.5">
                        ₹{Number(item.price).toLocaleString()}
                      </p>
                      {item.sku && (
                        <p className="text-[10px] text-muted-foreground mt-1 font-mono line-clamp-1">
                          {item.sku}
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
                  src={selectedItem.image_url || "/placeholder.svg"}
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
              <div className="p-5 space-y-2">
                <h3 className="font-display text-xl font-bold">{selectedItem.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-primary font-bold text-lg">
                    ₹{Number(selectedItem.price).toLocaleString()}
                  </span>
                  {selectedItem.original_price && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{Number(selectedItem.original_price).toLocaleString()}
                    </span>
                  )}
                </div>
                {selectedItem.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{selectedItem.description}</p>
                )}
                {selectedItem.sku && (
                  <p className="text-xs text-muted-foreground font-mono pt-1">SKU: {selectedItem.sku}</p>
                )}
                <Link
                  to={`/product/${selectedItem.id}`}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:shadow-glow transition-shadow"
                >
                  View Full Details
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* QR Modal */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {selectedCategory ? `${selectedCategory.name} QR` : "Catalog QR"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-2xl bg-white p-4 shadow-inner">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR code" className="w-56 h-56" />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-muted-foreground text-sm">
                  Generating...
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center break-all px-2">{currentUrl}</p>
            <div className="flex w-full gap-2">
              <button
                onClick={downloadQr}
                disabled={!qrDataUrl}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:shadow-glow transition-shadow disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={shareUrl}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border/50 text-sm font-medium hover:bg-accent transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
