import { Link } from "react-router-dom";
import { Wrench, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border/40 mt-20">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">
              <span className="gradient-text">Build</span>Mart
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your trusted partner for quality hardware and construction materials. Building dreams since 2005.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Shop", "About", "Gallery", "Contact"].map(l => (
              <Link key={l} to={`/${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Categories</h4>
          <div className="flex flex-col gap-2">
            {["Power Tools", "Building Materials", "Plumbing", "Electrical", "Paint", "Safety Gear"].map(c => (
              <Link key={c} to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">{c}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 98765 43210</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@buildmart.com</div>
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5" /> 123 Industrial Area, Construction Hub, India</div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/40 mt-10 pt-6 text-center text-xs text-muted-foreground">
        © 2025 BuildMart. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
