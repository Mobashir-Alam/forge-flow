import { motion } from "framer-motion";
import { Shield, Award, Users, Clock, Target, Zap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const timeline = [
  { year: "2005", title: "Founded", desc: "Started as a small hardware shop with a vision to serve builders." },
  { year: "2010", title: "Expanded", desc: "Opened 5 new branches across the state with 10,000+ products." },
  { year: "2015", title: "Online Launch", desc: "Launched our ecommerce platform reaching customers nationwide." },
  { year: "2020", title: "Industry Leader", desc: "Became one of the top hardware suppliers with 50,000+ customers." },
  { year: "2025", title: "Innovation", desc: "Investing in smart supply chain and same-day delivery network." },
];

const values = [
  { icon: Shield, title: "Quality Assured", desc: "Every product is sourced directly from authorized manufacturers." },
  { icon: Award, title: "Best Prices", desc: "Competitive pricing with bulk order discounts for contractors." },
  { icon: Users, title: "Expert Support", desc: "Knowledgeable team to help you choose the right materials." },
  { icon: Clock, title: "Fast Delivery", desc: "Same-day dispatch with reliable logistics partners." },
  { icon: Target, title: "Wide Range", desc: "15,000+ products covering all construction needs." },
  { icon: Zap, title: "Easy Returns", desc: "Hassle-free 7-day return policy on all purchases." },
];

const About = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About <span className="gradient-text">BuildMart</span></h1>
        <p className="text-lg text-muted-foreground">Building trust since 2005. Your one-stop destination for premium hardware and construction materials.</p>
      </motion.div>

      {/* Values */}
      <section className="mb-20">
        <AnimatedSection><h2 className="font-display text-2xl font-bold text-center mb-10">Why Choose <span className="gradient-text">Us</span></h2></AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.08}>
              <div className="p-6 rounded-2xl glass border border-border/30 h-full card-3d">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <AnimatedSection><h2 className="font-display text-2xl font-bold text-center mb-10">Our <span className="gradient-text">Journey</span></h2></AnimatedSection>
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {timeline.map((t, i) => (
            <AnimatedSection key={t.year} delay={i * 0.1}>
              <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full gradient-primary -translate-x-1/2 mt-2 shadow-glow" />
                <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-primary font-display font-bold text-sm">{t.year}</span>
                  <h3 className="font-display font-bold text-lg">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default About;
