import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Package } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccess = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 15 }} className="text-center max-w-md">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", damping: 10 }} className="w-24 h-24 rounded-full gradient-primary mx-auto mb-6 flex items-center justify-center shadow-glow">
        <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-3xl md:text-4xl font-bold mb-3">
        Order <span className="gradient-text">Confirmed!</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-muted-foreground mb-2">
        Thank you for your purchase! Your order has been placed successfully.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-2 text-sm text-primary mb-8">
        <Package className="w-4 h-4" /> Estimated delivery: 3-5 business days
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap justify-center gap-4">
        <Link to="/" className="px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow btn-ripple">
          <span className="flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Back to Home</span>
        </Link>
        <Link to="/shop" className="px-6 py-3 rounded-xl border border-border font-semibold hover:bg-secondary transition-colors">
          Continue Shopping
        </Link>
      </motion.div>
    </motion.div>
  </div>
);

export default OrderSuccess;
