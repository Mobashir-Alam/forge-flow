import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { testimonials, brands } from "@/data/products";

const stats = [
  { value: 15000, suffix: "+", label: "Products" },
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 50000, suffix: "+", label: "Happy Customers" },
  { value: 500, suffix: "+", label: "Brands" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <div ref={ref} className="font-display text-4xl md:text-5xl font-black gradient-text">{count.toLocaleString()}{suffix}</div>;
};

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [featuredPage, setFeaturedPage] = useState(0);
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const featured = products.slice(0, 8);
  const perPage = 4;
  const pages = Math.ceil(featured.length / perPage);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <div ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop" alt="Construction" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" /> Trusted by 50,000+ Contractors
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] mb-6">
              Complete <span className="gradient-text">Hardware</span> & Construction Solutions
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              Premium tools, building materials, and supplies. Everything you need to build your dreams, all under one roof.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow btn-ripple hover:shadow-xl transition-shadow">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-card/50 backdrop-blur text-foreground font-semibold hover:bg-secondary transition-colors">
                Get Quote
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-primary" /> Free Delivery</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Same Day Dispatch</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Genuine Products</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Categories */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">Shop by <span className="gradient-text">Category</span></h2>
          <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">Browse our wide range of construction materials and hardware supplies</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.id} delay={i * 0.08}>
              <Link to="/shop" className="group block rounded-2xl overflow-hidden relative aspect-[4/5] card-3d">
                <img src={cat.image_url || "/placeholder.svg"} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-2xl mb-1 block">{cat.icon}</span>
                  <h3 className="font-display font-bold text-sm">{cat.name}</h3>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Featured <span className="gradient-text">Products</span></h2>
              <p className="text-muted-foreground mt-2">Hand-picked quality products at the best prices</p>
            </div>
            {pages > 1 && (
              <div className="flex gap-2">
                <button onClick={() => setFeaturedPage(p => Math.max(0, p - 1))} disabled={featuredPage === 0} className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-30 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setFeaturedPage(p => Math.min(pages - 1, p + 1))} disabled={featuredPage >= pages - 1} className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-30 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.slice(featuredPage * perPage, featuredPage * perPage + perPage).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No products yet. Add products from the admin panel.</p>
          </div>
        )}
        <div className="text-center mt-10">
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1} className="text-center">
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground mt-2 font-medium">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">What Our <span className="gradient-text">Customers</span> Say</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="p-6 rounded-2xl glass border border-border/30 h-full">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <h3 className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-8">Trusted Brands</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {brands.map((b, i) => (
              <motion.span key={b} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="text-lg font-display font-bold text-muted-foreground/40 hover:text-primary transition-colors cursor-default">
                {b}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <AnimatedSection>
          <div className="rounded-3xl gradient-primary p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-black text-primary-foreground mb-4">Ready to Build Something Great?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">Get the best deals on construction materials. Bulk orders welcome with special pricing.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/shop" className="px-8 py-3.5 rounded-xl bg-primary-foreground text-primary font-bold hover:bg-primary-foreground/90 transition-colors">
                  Start Shopping
                </Link>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-bold hover:bg-primary-foreground/10 transition-colors">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Home;
