import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Minus, Plus, ArrowLeft, Truck, Shield, RotateCcw, Star } from "lucide-react";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id || "");
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [qty, setQty] = useState(1);
  const { data: allProducts = [] } = useProducts();

  if (isLoading) return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen pt-32 text-center">
      <p className="text-muted-foreground">Product not found</p>
      <Link to="/shop" className="text-primary hover:underline mt-4 inline-block">Back to Shop</Link>
    </div>
  );

  const price = Number(product.price);
  const originalPrice = product.original_price ? Number(product.original_price) : null;
  const isWished = wishlist.includes(product.id);
  const related = allProducts.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  const categoryName = product.categories?.name || "";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative rounded-2xl overflow-hidden aspect-square bg-card border border-border/30">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 px-4 py-1.5 text-xs font-bold uppercase rounded-full gradient-primary text-primary-foreground">{product.badge}</span>
            )}
            <img src={product.image_url || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">{categoryName}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "fill-primary text-primary" : "text-muted"}`} />)}</div>
              <span className="text-sm text-muted-foreground">{product.rating || 0} ({product.reviews_count || 0} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-4xl font-black gradient-text">₹{price.toLocaleString()}</span>
              {originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{originalPrice.toLocaleString()}</span>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-green-500/10 text-green-400">{discount}% OFF</span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Variants */}
            {product.product_variants && product.product_variants.length > 0 && (
              <div className="mb-6 space-y-3">
                <span className="text-sm font-medium">Variants:</span>
                <div className="flex flex-wrap gap-2">
                  {product.product_variants.filter(v => v.is_active).map(v => (
                    <span key={v.id} className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs font-medium">
                      {v.variant_name}: {v.variant_value}
                      {Number(v.price_adjustment) !== 0 && ` (+₹${Number(v.price_adjustment).toLocaleString()})`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-6">
              <span className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${(product.stock || 0) > 0 ? "bg-green-500/10 text-green-400" : "bg-destructive/10 text-destructive"}`}>
                {(product.stock || 0) > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-secondary transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="px-4 py-2 font-medium text-sm border-x border-border">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 hover:bg-secondary transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <button onClick={() => addToCart(product, qty)} className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow btn-ripple">
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <Link to="/checkout" onClick={() => addToCart(product, qty)} className="flex-1 flex items-center justify-center px-6 py-3.5 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors">
                Buy Now
              </Link>
              <button onClick={() => toggleWishlist(product.id)} className={`p-3.5 rounded-xl border transition-colors ${isWished ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}>
                <Heart className={`w-5 h-5 ${isWished ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Free Delivery", sub: "Orders above ₹999" },
                { icon: Shield, label: "Genuine Product", sub: "100% authentic" },
                { icon: RotateCcw, label: "Easy Returns", sub: "7-day policy" },
              ].map((b, i) => (
                <div key={i} className="p-3 rounded-xl bg-secondary/50 border border-border/30 text-center">
                  <b.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs font-medium">{b.label}</p>
                  <p className="text-[10px] text-muted-foreground">{b.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-8">Related <span className="gradient-text">Products</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
