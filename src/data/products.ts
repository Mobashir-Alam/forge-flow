export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  stock: number;
  badge?: string;
}

export const categories = [
  { name: "Power Tools", icon: "⚡", count: 45, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop" },
  { name: "Building Materials", icon: "🧱", count: 78, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
  { name: "Plumbing", icon: "🔧", count: 56, image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop" },
  { name: "Electrical", icon: "💡", count: 63, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop" },
  { name: "Paint", icon: "🎨", count: 34, image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop" },
  { name: "Safety Gear", icon: "🦺", count: 29, image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop" },
];

export const products: Product[] = [
  { id: 1, name: "DeWalt 20V MAX Drill Driver Kit", price: 4999, originalPrice: 6999, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&h=500&fit=crop", category: "Power Tools", rating: 4.8, reviews: 234, description: "Professional-grade cordless drill with brushless motor, 2-speed transmission, and LED work light. Includes 2 batteries and charger.", stock: 15, badge: "Bestseller" },
  { id: 2, name: "UltraTech Portland Cement 50kg", price: 399, originalPrice: 450, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=500&fit=crop", category: "Building Materials", rating: 4.5, reviews: 189, description: "Premium quality OPC 53 grade cement. Ideal for all construction needs. High early strength and durability.", stock: 500, badge: "Hot Deal" },
  { id: 3, name: "Bosch Angle Grinder 4 inch", price: 2799, originalPrice: 3499, image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&h=500&fit=crop", category: "Power Tools", rating: 4.7, reviews: 156, description: "Heavy-duty angle grinder with 720W motor. Anti-vibration side handle and spindle lock for quick disc changes.", stock: 23 },
  { id: 4, name: "CPVC Pipe Fitting Set", price: 1299, originalPrice: 1599, image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&h=500&fit=crop", category: "Plumbing", rating: 4.3, reviews: 98, description: "Complete CPVC pipe fitting kit including elbows, tees, couplings, and end caps. Suitable for hot and cold water systems.", stock: 45 },
  { id: 5, name: "Havells Wire 2.5mm (90m Roll)", price: 3299, originalPrice: 3899, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=500&fit=crop", category: "Electrical", rating: 4.6, reviews: 312, description: "FR-LSH insulated copper wire. Flame retardant, low smoke halogen free. BIS certified for safety.", stock: 80, badge: "Popular" },
  { id: 6, name: "Asian Paints Apex Exterior 20L", price: 5499, originalPrice: 6299, image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&h=500&fit=crop", category: "Paint", rating: 4.9, reviews: 267, description: "Premium exterior emulsion with Dust Guard technology. Weather resistant with 7 year warranty.", stock: 30, badge: "Premium" },
  { id: 7, name: "TMT Steel Bars 12mm (per kg)", price: 72, image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=500&fit=crop", category: "Building Materials", rating: 4.4, reviews: 445, description: "Fe-500D grade TMT steel bars. Superior earthquake resistance and high tensile strength.", stock: 2000 },
  { id: 8, name: "Makita Circular Saw 7-1/4\"", price: 8999, originalPrice: 11999, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&h=500&fit=crop", category: "Power Tools", rating: 4.8, reviews: 87, description: "Powerful 15 AMP motor with 5,800 RPM for faster cutting. Built-in dust blower and LED light.", stock: 8, badge: "25% OFF" },
  { id: 9, name: "Safety Helmet with Visor", price: 599, originalPrice: 899, image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=500&fit=crop", category: "Safety Gear", rating: 4.2, reviews: 178, description: "HDPE construction helmet with adjustable ratchet headband. Includes clear polycarbonate visor.", stock: 120 },
  { id: 10, name: "PVC Water Tank 1000L", price: 7999, originalPrice: 9999, image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&h=500&fit=crop", category: "Plumbing", rating: 4.5, reviews: 64, description: "Multi-layer PVC water storage tank. UV stabilized, food grade safe. 10 year warranty.", stock: 12 },
  { id: 11, name: "LED Panel Light 18W (Set of 4)", price: 1199, originalPrice: 1599, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=500&fit=crop", category: "Electrical", rating: 4.6, reviews: 203, description: "Slim LED panel lights with high luminous efficiency. Energy saving, no flickering. Cool daylight 6500K.", stock: 55, badge: "Value Pack" },
  { id: 12, name: "Wall Putty 40kg Bag", price: 899, image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&h=500&fit=crop", category: "Paint", rating: 4.3, reviews: 142, description: "White cement-based wall putty for smooth finish before painting. Excellent adhesion and coverage.", stock: 200 },
];

export const testimonials = [
  { name: "Rajesh Kumar", role: "Contractor", text: "Best hardware store in town! Quality materials and excellent pricing. My go-to supplier for all projects.", rating: 5 },
  { name: "Priya Sharma", role: "Interior Designer", text: "Amazing range of products. The staff is very knowledgeable and always helps me find the right materials.", rating: 5 },
  { name: "Suresh Patel", role: "Builder", text: "Reliable delivery and genuine products. I've been buying from them for over 5 years now.", rating: 4 },
];

export const brands = ["DeWalt", "Bosch", "Makita", "Asian Paints", "Havells", "UltraTech", "Tata Steel", "Pidilite", "Crompton", "Finolex"];
