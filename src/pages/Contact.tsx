import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Get in <span className="gradient-text">Touch</span></h1>
          <p className="text-muted-foreground">Have questions? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="p-8 rounded-2xl glass border border-border/30 space-y-4">
            {[
              { label: "Name", field: "name", type: "text", placeholder: "Your name" },
              { label: "Email", field: "email", type: "email", placeholder: "your@email.com" },
              { label: "Phone", field: "phone", type: "tel", placeholder: "+91 98765 43210" },
            ].map(f => (
              <div key={f.field}>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{f.label}</label>
                <input type={f.type} value={form[f.field as keyof typeof form]} onChange={e => setForm(prev => ({ ...prev, [f.field]: e.target.value }))} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Message</label>
              <textarea value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} rows={4} placeholder="Your message..." className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow btn-ripple flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
            {[
              { icon: Phone, title: "Call Us", info: "+91 98765 43210", sub: "Mon-Sat 9:00 AM - 8:00 PM" },
              { icon: Mail, title: "Email Us", info: "info@buildmart.com", sub: "We reply within 24 hours" },
              { icon: MapPin, title: "Visit Us", info: "123 Industrial Area, Construction Hub", sub: "India - 400001" },
            ].map((c, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl glass border border-border/30">
                <div className="w-12 h-12 shrink-0 rounded-xl gradient-primary flex items-center justify-center">
                  <c.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{c.title}</h3>
                  <p className="text-sm">{c.info}</p>
                  <p className="text-xs text-muted-foreground">{c.sub}</p>
                </div>
              </div>
            ))}
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-600 text-foreground font-semibold hover:bg-green-700 transition-colors">
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
            <div className="rounded-2xl overflow-hidden border border-border/30 h-56">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160984!2d72.7411!3d19.0826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai!5e0!3m2!1sen!2sin!4v1" width="100%" height="100%" style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }} allowFullScreen loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
