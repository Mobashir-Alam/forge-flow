import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const images = [
  { src: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop", title: "Power Tools Collection" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=800&fit=crop", title: "Construction Site" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", title: "Building Materials" },
  { src: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop", title: "Workshop" },
  { src: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop", title: "Plumbing Supplies" },
  { src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=800&fit=crop", title: "Electrical Department" },
  { src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop", title: "Paint Section" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop", title: "Completed Project" },
];

const Gallery = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our <span className="gradient-text">Gallery</span></h1>
        <p className="text-muted-foreground">Explore our store, products, and completed projects</p>
      </motion.div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <AnimatedSection key={i} delay={i * 0.05}>
            <div className="group relative rounded-2xl overflow-hidden break-inside-avoid card-3d">
              <img src={img.src} alt={img.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <span className="font-display font-bold text-sm">{img.title}</span>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </div>
);

export default Gallery;
