import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) return (
    <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center px-4">
      <ShoppingBag className="w-20 h-20 text-muted-foreground/20 mb-4" />
      <h1 className="font-display text-2xl font-bold mb-2">Your Cart is Empty</h1>
      <p className="text-muted-foreground mb-6">Add some products to get started!</p>
      <Link to="/shop" className="px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold">Browse Products</Link>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
        <h1 className="font-display text-3xl font-bold mb-8">Shopping <span className="gradient-text">Cart</span></h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <motion.div key={item.product.id} layout className="flex gap-4 p-4 rounded-2xl glass border border-border/30">
                <img src={item.product.image_url || "/placeholder.svg"} alt={item.product.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary transition-colors line-clamp-1">{item.product.name}</Link>
                  <p className="text-xs text-muted-foreground mt-1">{item.product.categories?.name || ""}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display font-bold">₹{(Number(item.product.price) * item.quantity).toLocaleString()}</span>
                      <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <button onClick={clearCart} className="text-sm text-destructive hover:underline">Clear Cart</button>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-2xl glass border border-border/30 space-y-4">
              <h3 className="font-display font-bold text-lg">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-green-400">Free</span></div>
              </div>
              <div className="border-t border-border/40 pt-4 flex justify-between font-display font-bold text-lg">
                <span>Total</span>
                <span className="gradient-text">₹{totalPrice.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="block w-full text-center py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow btn-ripple">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
