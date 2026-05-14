import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, FolderTree, ShoppingBag, Users, ArrowLeft, Palette } from "lucide-react";

const adminLinks = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Categories", path: "/admin/categories", icon: FolderTree },
  { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Theme", path: "/admin/theme", icon: Palette },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display text-2xl font-bold">Admin <span className="gradient-text">Panel</span></h1>
        </div>
        <div className="flex gap-6">
          <nav className="hidden md:block w-56 shrink-0">
            <div className="sticky top-28 p-4 rounded-2xl glass border border-border/30 space-y-1">
              {adminLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          {/* Mobile nav */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-border/30 px-2 py-2 flex justify-around">
            {adminLinks.map(link => (
              <Link key={link.path} to={link.path} className={`flex flex-col items-center gap-0.5 p-2 rounded-lg text-[10px] ${location.pathname === link.path ? "text-primary" : "text-muted-foreground"}`}>
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
