import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import type { DBProduct } from "@/hooks/useProducts";

const ProductCard = ({ product, index = 0 }: { product: DBProduct; index?: number }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWished = wishlist.includes(product.id);
  const price = Number(product.price);
  const originalPrice = product.original_price ? Number(product.original_price) : null;
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  const categoryName = product.categories?.name || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative rounded-2xl bg-card border border-border/40 overflow-hidden card-3d"
    >
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full gradient-primary text-primary-foreground">
          {product.badge}
        </div>
      )}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-card/80 backdrop-blur-md border border-border/30 transition-all hover:scale-110"
      >
        <Heart className={`w-4 h-4 ${isWished ? "fill-primary text-primary" : "text-muted-foreground"}`} />
      </button>

      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <span className="flex items-center gap-1 text-xs font-medium text-foreground bg-card/80 backdrop-blur-md px-3 py-1.5 rounded-full">
            <Eye className="w-3 h-3" /> Quick View
          </span>
        </div>
      </Link>

      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-1">{categoryName}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < Math.floor(product.rating || 0) ? "text-primary" : "text-muted"}`}>★</span>
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({product.reviews_count || 0})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg">₹{price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{originalPrice.toLocaleString()}</span>
            )}
            {discount > 0 && (
              <span className="text-[10px] font-bold text-green-400">{discount}% OFF</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-2.5 rounded-xl gradient-primary text-primary-foreground hover:shadow-glow transition-shadow btn-ripple"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
