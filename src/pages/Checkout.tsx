import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Banknote, Smartphone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const [payment, setPayment] = useState("cod");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    clearCart();
    navigate("/order-success");
  };

  if (items.length === 0) return (
    <div className="min-h-screen pt-32 text-center px-4">
      <p className="text-muted-foreground mb-4">No items in cart</p>
      <Link to="/shop" className="text-primary hover:underline">Go to Shop</Link>
    </div>
  );

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4" /> Back to Cart</Link>
        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {/* Shipping */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl glass border border-border/30">
              <h2 className="font-display font-bold text-lg mb-4">Shipping Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", field: "name", placeholder: "John Doe" },
                  { label: "Phone Number", field: "phone", placeholder: "+91 98765 43210" },
                  { label: "Address", field: "address", placeholder: "123 Main Street", full: true },
                  { label: "City", field: "city", placeholder: "Mumbai" },
                  { label: "PIN Code", field: "pincode", placeholder: "400001" },
                ].map(f => (
                  <div key={f.field} className={f.full ? "sm:col-span-2" : ""}>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">{f.label}</label>
                    <input value={form[f.field as keyof typeof form]} onChange={update(f.field)} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl glass border border-border/30">
              <h2 className="font-display font-bold text-lg mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: "cod", label: "Cash on Delivery", icon: Banknote, desc: "Pay when you receive" },
                  { id: "upi", label: "UPI Payment", icon: Smartphone, desc: "GPay, PhonePe, Paytm" },
                  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
                ].map(p => (
                  <label key={p.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${payment === p.id ? "border-primary bg-primary/5" : "border-border hover:border-border/80"}`}>
                    <input type="radio" name="payment" value={p.id} checked={payment === p.id} onChange={() => setPayment(p.id)} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payment === p.id ? "border-primary" : "border-muted-foreground"}`}>
                      {payment === p.id && <div className="w-2.5 h-2.5 rounded-full gradient-primary" />}
                    </div>
                    <p.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{p.label}</p>
                      <p className="text-xs text-muted-foreground">{p.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-28 p-6 rounded-2xl glass border border-border/30 space-y-4">
              <h3 className="font-display font-bold text-lg">Order Summary</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/40 pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-green-400">Free</span></div>
              </div>
              <div className="border-t border-border/40 pt-4 flex justify-between font-display font-bold text-lg">
                <span>Total</span><span className="gradient-text">₹{totalPrice.toLocaleString()}</span>
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow btn-ripple">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
