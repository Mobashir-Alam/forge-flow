import { useProducts, useCategories, useOrders } from "@/hooks/useProducts";
import { Package, FolderTree, ShoppingBag, Users, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: orders = [] } = useOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total_amount), 0);

  const cards = [
    { label: "Products", value: products.length, icon: Package, color: "text-blue-400" },
    { label: "Categories", value: categories.length, icon: FolderTree, color: "text-green-400" },
    { label: "Orders", value: orders.length, icon: ShoppingBag, color: "text-amber-400" },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="p-5 rounded-2xl glass border border-border/30">
            <div className="flex items-center justify-between mb-3">
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
            <p className="font-display text-2xl font-bold">{c.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl glass border border-border/30">
        <h3 className="font-display font-bold mb-4">Recent Orders</h3>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Order ID</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Customer</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map(o => (
                  <tr key={o.id} className="border-b border-border/20">
                    <td className="py-2 px-3 font-mono text-xs">{o.id.slice(0, 8)}...</td>
                    <td className="py-2 px-3">{o.shipping_name}</td>
                    <td className="py-2 px-3 font-medium">₹{Number(o.total_amount).toLocaleString()}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        o.status === "delivered" ? "bg-green-500/10 text-green-400" :
                        o.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                        "bg-primary/10 text-primary"
                      }`}>{o.status}</span>
                    </td>
                    <td className="py-2 px-3 text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
