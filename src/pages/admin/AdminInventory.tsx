import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Pencil, Save, X, TrendingUp, TrendingDown, Package } from "lucide-react";
import { toast } from "sonner";

type ProductRow = {
  id: string;
  name: string;
  price: number;
  cost_price: number | null;
  stock: number | null;
  offline_sold: number | null;
  image_url: string | null;
};

type OnlineMap = Record<string, number>;

const fmt = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const AdminInventory = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [online, setOnline] = useState<OnlineMap>({});
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ cost_price: string; offline_sold: string }>({ cost_price: "", offline_sold: "" });

  const load = async () => {
    setLoading(true);
    const [{ data: prods, error: pErr }, { data: items, error: iErr }] = await Promise.all([
      supabase.from("products").select("id,name,price,cost_price,stock,offline_sold,image_url").order("name"),
      supabase.from("order_items").select("product_id,quantity"),
    ]);
    if (pErr) toast.error(pErr.message);
    if (iErr) toast.error(iErr.message);
    const map: OnlineMap = {};
    (items || []).forEach((it: any) => {
      if (!it.product_id) return;
      map[it.product_id] = (map[it.product_id] || 0) + (it.quantity || 0);
    });
    setOnline(map);
    setProducts((prods as ProductRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (p: ProductRow) => {
    setEditing(p.id);
    setDraft({ cost_price: String(p.cost_price ?? 0), offline_sold: String(p.offline_sold ?? 0) });
  };

  const saveEdit = async (id: string) => {
    const cp = Number(draft.cost_price) || 0;
    const off = Math.max(0, parseInt(draft.offline_sold || "0", 10));
    const { error } = await supabase.from("products").update({ cost_price: cp, offline_sold: off }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Inventory updated");
    setEditing(null);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, cost_price: cp, offline_sold: off } : p));
  };

  const filtered = useMemo(
    () => products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );

  const totals = useMemo(() => {
    let stock = 0, onlineUnits = 0, offlineUnits = 0, revenue = 0, cost = 0;
    filtered.forEach(p => {
      const on = online[p.id] || 0;
      const off = p.offline_sold || 0;
      stock += p.stock || 0;
      onlineUnits += on;
      offlineUnits += off;
      revenue += (on + off) * Number(p.price || 0);
      cost += (on + off) * Number(p.cost_price || 0);
    });
    return { stock, onlineUnits, offlineUnits, revenue, cost, profit: revenue - cost };
  }, [filtered, online]);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Inventory</h2>
          <p className="text-sm text-muted-foreground">Track stock, online + offline sales, and per-product profit.</p>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search product..."
          className="px-4 py-2 rounded-lg bg-card border border-border text-sm w-full sm:w-64"
        />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard icon={<Package className="w-4 h-4" />} label="Total Stock" value={totals.stock.toString()} />
        <SummaryCard icon={<TrendingUp className="w-4 h-4" />} label="Units Sold" value={(totals.onlineUnits + totals.offlineUnits).toString()} sub={`${totals.onlineUnits} online · ${totals.offlineUnits} offline`} />
        <SummaryCard icon={<TrendingUp className="w-4 h-4" />} label="Revenue" value={fmt(totals.revenue)} sub={`Cost ${fmt(totals.cost)}`} />
        <SummaryCard
          icon={totals.profit >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          label={totals.profit >= 0 ? "Profit" : "Loss"}
          value={fmt(Math.abs(totals.profit))}
          positive={totals.profit >= 0}
        />
      </div>

      <div className="rounded-2xl glass border border-border/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-right px-3 py-3">Stock</th>
                <th className="text-right px-3 py-3">CP</th>
                <th className="text-right px-3 py-3">SP</th>
                <th className="text-right px-3 py-3">Online</th>
                <th className="text-right px-3 py-3">Offline</th>
                <th className="text-right px-3 py-3">Total Sold</th>
                <th className="text-right px-3 py-3">Revenue</th>
                <th className="text-right px-3 py-3">Profit / Loss</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const on = online[p.id] || 0;
                const off = p.offline_sold || 0;
                const totalSold = on + off;
                const sp = Number(p.price || 0);
                const cp = Number(p.cost_price || 0);
                const revenue = totalSold * sp;
                const pl = totalSold * (sp - cp);
                const isEditing = editing === p.id;
                const lowStock = (p.stock || 0) < 5;
                return (
                  <tr key={p.id} className="border-t border-border/30 hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        {p.image_url && <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded object-cover" />}
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className={`text-right px-3 py-3 ${lowStock ? "text-destructive font-semibold" : ""}`}>{p.stock ?? 0}</td>
                    <td className="text-right px-3 py-3">
                      {isEditing ? (
                        <input type="number" min="0" value={draft.cost_price} onChange={e => setDraft(d => ({ ...d, cost_price: e.target.value }))} className="w-20 px-2 py-1 rounded bg-background border border-border text-right" />
                      ) : fmt(cp)}
                    </td>
                    <td className="text-right px-3 py-3">{fmt(sp)}</td>
                    <td className="text-right px-3 py-3">{on}</td>
                    <td className="text-right px-3 py-3">
                      {isEditing ? (
                        <input type="number" min="0" value={draft.offline_sold} onChange={e => setDraft(d => ({ ...d, offline_sold: e.target.value }))} className="w-20 px-2 py-1 rounded bg-background border border-border text-right" />
                      ) : off}
                    </td>
                    <td className="text-right px-3 py-3 font-medium">{totalSold}</td>
                    <td className="text-right px-3 py-3">{fmt(revenue)}</td>
                    <td className={`text-right px-3 py-3 font-semibold ${pl >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                      {pl >= 0 ? "+" : "-"}{fmt(Math.abs(pl))}
                    </td>
                    <td className="px-3 py-3 text-right">
                      {isEditing ? (
                        <div className="flex justify-end gap-1">
                          <button onClick={() => saveEdit(p.id)} className="p-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20"><Save className="w-4 h-4" /></button>
                          <button onClick={() => setEditing(null)} className="p-1.5 rounded bg-secondary text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(p)} className="p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-primary/10"><Pencil className="w-4 h-4" /></button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="text-center py-12 text-muted-foreground">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, label, value, sub, positive }: { icon: React.ReactNode; label: string; value: string; sub?: string; positive?: boolean }) => (
  <div className="p-4 rounded-2xl glass border border-border/30">
    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
      {icon} {label}
    </div>
    <div className={`mt-2 font-display text-2xl font-bold ${positive === true ? "text-emerald-500" : positive === false ? "text-destructive" : ""}`}>{value}</div>
    {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
  </div>
);

export default AdminInventory;