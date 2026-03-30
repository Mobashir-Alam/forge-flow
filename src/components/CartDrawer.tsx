import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-strong z-50 flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-border/40">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display text-lg font-bold">Cart ({totalItems})</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-lg hover:bg-secondary transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
                  <p className="font-medium">Your cart is empty</p>
                  <Link to="/shop" onClick={() => setIsCartOpen(false)} className="mt-4 text-primary text-sm hover:underline">Continue Shopping</Link>
                </div>
              ) : (
                items.map(item => (
                  <motion.div key={item.product.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex gap-4 p-3 rounded-xl bg-secondary/50 border border-border/30">
                    <img src={item.product.image_url || "/placeholder.svg"} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                      <p className="text-primary font-bold mt-1">₹{Number(item.product.price).toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-border transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-border transition-colors"><Plus className="w-3 h-3" /></button>
                        <button onClick={() => removeFromCart(item.product.id)} className="ml-auto p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="p-5 border-t border-border/40 space-y-3">
                <div className="flex items-center justify-between font-display">
                  <span className="text-muted-foreground">Total</span>
                  <motion.span key={totalPrice} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-xl font-bold gradient-text">₹{totalPrice.toLocaleString()}</motion.span>
                </div>
                <Link to="/cart" onClick={() => setIsCartOpen(false)} className="block w-full text-center py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm hover:bg-border transition-colors">View Cart</Link>
                <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full text-center py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm btn-ripple shadow-glow">Checkout</Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
