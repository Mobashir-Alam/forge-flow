import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, Search, User, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsCartOpen, badgeAnimating, wishlist } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-card py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center group">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-none whitespace-nowrap"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ff1e1e 0%, #ff5a36 45%, #b80000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 8px rgba(255, 30, 30, 0.35))",
            }}
          >
            <motion.span
              className="inline-block"
              whileHover={{ rotate: -4, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Raj
            </motion.span>
            &nbsp;
            <motion.span
              className="inline-block"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              Hardware
            </motion.span>
          </motion.span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${location.pathname === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {link.label}
              {location.pathname === link.path && <motion.div layoutId="nav-underline" className="absolute bottom-0 left-2 right-2 h-0.5 gradient-primary rounded-full" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/shop" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          {isAdmin && (
            <Link to="/admin" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="Admin Panel">
              <Shield className="w-5 h-5" />
            </Link>
          )}
          {user ? (
            <button onClick={() => signOut()} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <Link to="/login" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <User className="w-5 h-5" />
            </Link>
          )}
          <Link to="/shop" className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold rounded-full gradient-primary text-primary-foreground flex items-center justify-center">{wishlist.length}</span>}
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && <motion.span key={totalItems} animate={badgeAnimating ? { scale: [1, 1.3, 1] } : {}} className="absolute -top-0.5 -right-0.5 w-5 h-5 text-[10px] font-bold rounded-full gradient-primary text-primary-foreground flex items-center justify-center">{totalItems}</motion.span>}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden glass-strong border-t border-border/30 overflow-hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>{link.label}</Link>
              ))}
              {isAdmin && <Link to="/admin" className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">Admin Panel</Link>}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
