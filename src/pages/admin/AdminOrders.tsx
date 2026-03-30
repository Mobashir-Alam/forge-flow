import { useOrders } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type OrderStatus = Database["public"]["Enums"]["order_status"];
const statuses: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const AdminOrders = () => {
  const { data: orders = [], isLoading } = useOrders();
  const queryClient = useQueryClient();

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: `Order marked as ${status}` });
    queryClient.invalidateQueries({ queryKey: ["all-orders"] });
  };

  if (isLoading) return <div className="text-center py-10"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" /></div>;

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold">Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground"><p>No orders yet.</p></div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="p-5 rounded-2xl glass border border-border/30 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">#{order.id.slice(0, 8)}</p>
                  <p className="font-medium">{order.shipping_name}</p>
                  <p className="text-xs text-muted-foreground">{order.shipping_phone} · {order.shipping_city}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-lg">₹{Number(order.total_amount).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{order.payment_method} · {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Status:</span>
                {statuses.map(s => (
                  <button key={s} onClick={() => updateStatus(order.id, s)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${order.status === s ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{s}</button>
                ))}
              </div>
              {order.order_items && order.order_items.length > 0 && (
                <div className="border-t border-border/30 pt-3">
                  <p className="text-xs text-muted-foreground mb-2">Items:</p>
                  <div className="space-y-1">
                    {order.order_items.map((item: any) => (
                      <p key={item.id} className="text-xs">{item.product_name} × {item.quantity} = ₹{(Number(item.unit_price) * item.quantity).toLocaleString()}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
