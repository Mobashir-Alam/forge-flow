export interface CatalogItem {
  id: string;
  name: string;
  variation: string;
  code?: string;
  image: string;
}

export interface CatalogCategory {
  id: string;
  name: string;
  image: string;
  items: CatalogItem[];
}

export const catalogCategories: CatalogCategory[] = [
  {
    id: "door-handles",
    name: "Door Handles",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
    items: [
      { id: "dh1", name: "Classic Lever Handle", variation: "Satin Nickel", code: "DH-101", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
      { id: "dh2", name: "Classic Lever Handle", variation: "Antique Brass", code: "DH-102", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
      { id: "dh3", name: "Modern Bar Handle", variation: "Chrome", code: "DH-201", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
      { id: "dh4", name: "Modern Bar Handle", variation: "Matte Black", code: "DH-202", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
      { id: "dh5", name: "Round Knob Handle", variation: "Polished Brass", code: "DH-301", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
      { id: "dh6", name: "Round Knob Handle", variation: "Rose Gold", code: "DH-302", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
      { id: "dh7", name: "Pull Handle", variation: "Stainless Steel", code: "DH-401", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
      { id: "dh8", name: "Pull Handle", variation: "Bronze", code: "DH-402", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
      { id: "dh9", name: "Flush Handle", variation: "Silver", code: "DH-501", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
      { id: "dh10", name: "Flush Handle", variation: "Gold", code: "DH-502", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
    ],
  },
  {
    id: "door-locks",
    name: "Door Locks",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop",
    items: [
      { id: "dl1", name: "Mortise Lock Set", variation: "Satin Steel", code: "DL-101", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop" },
      { id: "dl2", name: "Mortise Lock Set", variation: "Antique Copper", code: "DL-102", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop" },
      { id: "dl3", name: "Deadbolt Lock", variation: "Chrome", code: "DL-201", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop" },
      { id: "dl4", name: "Deadbolt Lock", variation: "Matte Black", code: "DL-202", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop" },
      { id: "dl5", name: "Cylindrical Lock", variation: "Brass", code: "DL-301", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop" },
      { id: "dl6", name: "Pad Lock Heavy Duty", variation: "Hardened Steel", code: "DL-401", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop" },
      { id: "dl7", name: "Digital Smart Lock", variation: "Black", code: "DL-501", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop" },
      { id: "dl8", name: "Night Latch Lock", variation: "Brass", code: "DL-601", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop" },
    ],
  },
  {
    id: "hinges",
    name: "Hinges",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
    items: [
      { id: "h1", name: "Butt Hinge 4 inch", variation: "Stainless Steel", code: "HG-101", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop" },
      { id: "h2", name: "Butt Hinge 4 inch", variation: "Brass", code: "HG-102", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop" },
      { id: "h3", name: "Parliament Hinge", variation: "Chrome", code: "HG-201", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop" },
      { id: "h4", name: "Spring Hinge", variation: "Satin Nickel", code: "HG-301", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop" },
      { id: "h5", name: "Concealed Hinge", variation: "Zinc Alloy", code: "HG-401", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop" },
      { id: "h6", name: "T-Hinge Heavy Duty", variation: "Black Iron", code: "HG-501", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop" },
    ],
  },
  {
    id: "bathroom-fittings",
    name: "Bathroom Fittings",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=400&fit=crop",
    items: [
      { id: "bf1", name: "Shower Head Set", variation: "Chrome Round", code: "BF-101", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "bf2", name: "Shower Head Set", variation: "Matte Black Square", code: "BF-102", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "bf3", name: "Basin Mixer Tap", variation: "Chrome", code: "BF-201", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "bf4", name: "Towel Rod 24 inch", variation: "Stainless Steel", code: "BF-301", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "bf5", name: "Soap Dispenser", variation: "Wall Mount Chrome", code: "BF-401", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "bf6", name: "Toilet Paper Holder", variation: "Brushed Nickel", code: "BF-501", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "bf7", name: "Angle Valve", variation: "Chrome", code: "BF-601", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "bf8", name: "Health Faucet Set", variation: "Chrome", code: "BF-701", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
    ],
  },
  {
    id: "kitchen-fittings",
    name: "Kitchen Fittings",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    items: [
      { id: "kf1", name: "Kitchen Sink Mixer", variation: "Chrome Pull-Out", code: "KF-101", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop" },
      { id: "kf2", name: "Kitchen Sink Mixer", variation: "Matte Black", code: "KF-102", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop" },
      { id: "kf3", name: "Sink Basket Strainer", variation: "Stainless Steel", code: "KF-201", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop" },
      { id: "kf4", name: "Cabinet Handle", variation: "Brushed Gold", code: "KF-301", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop" },
      { id: "kf5", name: "Cabinet Handle", variation: "Chrome Bar", code: "KF-302", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop" },
      { id: "kf6", name: "Soft Close Drawer Slide", variation: "18 inch", code: "KF-401", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop" },
    ],
  },
  {
    id: "pipes",
    name: "Pipes",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
    items: [
      { id: "p1", name: "CPVC Pipe 1 inch", variation: "10ft Length", code: "PP-101", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
      { id: "p2", name: "CPVC Pipe 3/4 inch", variation: "10ft Length", code: "PP-102", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
      { id: "p3", name: "PVC Drainage Pipe 4 inch", variation: "White", code: "PP-201", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
      { id: "p4", name: "GI Pipe 1 inch", variation: "Medium Grade", code: "PP-301", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
      { id: "p5", name: "Flexible Hose Pipe", variation: "1/2 inch Chrome", code: "PP-401", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
      { id: "p6", name: "SWR Pipe 3 inch", variation: "Grey", code: "PP-501", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
    ],
  },
  {
    id: "taps",
    name: "Taps",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=400&fit=crop",
    items: [
      { id: "t1", name: "Pillar Cock Tap", variation: "Chrome", code: "TP-101", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "t2", name: "Pillar Cock Tap", variation: "Gold Finish", code: "TP-102", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "t3", name: "Bib Cock Tap", variation: "Chrome", code: "TP-201", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "t4", name: "Wall Mixer Tap", variation: "Chrome 3-in-1", code: "TP-301", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "t5", name: "Concealed Stop Cock", variation: "Chrome 15mm", code: "TP-401", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "t6", name: "Swan Neck Tap", variation: "Chrome", code: "TP-501", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
      { id: "t7", name: "Swan Neck Tap", variation: "Matte Black", code: "TP-502", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=600&fit=crop" },
    ],
  },
  {
    id: "lights",
    name: "Lights",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    items: [
      { id: "l1", name: "LED Panel Light 18W", variation: "Cool White Round", code: "LT-101", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop" },
      { id: "l2", name: "LED Panel Light 18W", variation: "Warm White Square", code: "LT-102", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop" },
      { id: "l3", name: "LED Bulb 12W", variation: "Cool Daylight", code: "LT-201", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop" },
      { id: "l4", name: "LED Strip Light 5m", variation: "RGB Color", code: "LT-301", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop" },
      { id: "l5", name: "Ceiling Light Fixture", variation: "Flush Mount White", code: "LT-401", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop" },
      { id: "l6", name: "Wall Light Sconce", variation: "Modern Black", code: "LT-501", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop" },
      { id: "l7", name: "Spot Light Track", variation: "Chrome 3-Light", code: "LT-601", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop" },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
    items: [
      { id: "tl1", name: "Cordless Drill 20V", variation: "DeWalt Yellow", code: "TL-101", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
      { id: "tl2", name: "Angle Grinder 4 inch", variation: "Bosch Blue", code: "TL-201", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop" },
      { id: "tl3", name: "Circular Saw 7 inch", variation: "Makita Teal", code: "TL-301", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
      { id: "tl4", name: "Hammer Claw 16oz", variation: "Fiberglass Handle", code: "TL-401", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
      { id: "tl5", name: "Measuring Tape 5m", variation: "Stanley Yellow", code: "TL-501", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
      { id: "tl6", name: "Spirit Level 24 inch", variation: "Aluminum", code: "TL-601", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
      { id: "tl7", name: "Screwdriver Set 8pc", variation: "Insulated", code: "TL-701", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop" },
    ],
  },
  {
    id: "paint-items",
    name: "Paint Items",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=400&fit=crop",
    items: [
      { id: "pi1", name: "Interior Emulsion 20L", variation: "White", code: "PT-101", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=600&fit=crop" },
      { id: "pi2", name: "Exterior Emulsion 20L", variation: "Off White", code: "PT-102", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=600&fit=crop" },
      { id: "pi3", name: "Enamel Paint 4L", variation: "Glossy Black", code: "PT-201", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=600&fit=crop" },
      { id: "pi4", name: "Wood Primer 4L", variation: "White Base", code: "PT-301", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=600&fit=crop" },
      { id: "pi5", name: "Wall Putty 40kg", variation: "White Cement Base", code: "PT-401", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=600&fit=crop" },
      { id: "pi6", name: "Paint Roller Set", variation: "9 inch with Tray", code: "PT-501", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=600&fit=crop" },
      { id: "pi7", name: "Masking Tape 2 inch", variation: "Yellow 50m", code: "PT-601", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=600&fit=crop" },
    ],
  },
];
