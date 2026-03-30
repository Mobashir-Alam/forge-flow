import { useState } from "react";
import { useAllProducts, useAllCategories } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  original_price: string;
  image_url: string;
  category_id: string;
  stock: string;
  badge: string;
  is_active: boolean;
}

const empty: ProductForm = { name: "", description: "", price: "", original_price: "", image_url: "", category_id: "", stock: "0", badge: "", is_active: true };

const AdminProducts = () => {
  const { data: products = [], isLoading } = useAllProducts();
  const { data: categories = [] } = useAllCategories();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(empty);

  const openNew = () => { setForm(empty); setEditId(null); setShowForm(true); };
  const openEdit = (p: any) => {
    setForm({ name: p.name, description: p.description || "", price: String(p.price), original_price: p.original_price ? String(p.original_price) : "", image_url: p.image_url || "", category_id: p.category_id || "", stock: String(p.stock || 0), badge: p.badge || "", is_active: p.is_active ?? true });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) { toast({ title: "Name and price required", variant: "destructive" }); return; }
    const payload = {
      name: form.name,
      description: form.description || null,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      image_url: form.image_url || null,
      category_id: form.category_id || null,
      stock: parseInt(form.stock) || 0,
      badge: form.badge || null,
      is_active: form.is_active,
    };
    if (editId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Product updated" });
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Product created" });
    }
    queryClient.invalidateQueries({ queryKey: ["all-products"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Product deleted" });
    queryClient.invalidateQueries({ queryKey: ["all-products"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const u = (field: keyof ProductForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">Products ({products.length})</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold"><Plus className="w-4 h-4" /> Add Product</button>
      </div>

      {showForm && (
        <div className="p-6 rounded-2xl glass border border-border/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold">{editId ? "Edit" : "New"} Product</h3>
            <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-medium text-muted-foreground block mb-1">Name *</label><input value={form.name} onChange={u("name")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" /></div>
            <div><label className="text-xs font-medium text-muted-foreground block mb-1">Category</label>
              <select value={form.category_id} onChange={u("category_id")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm">
                <option value="">None</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-medium text-muted-foreground block mb-1">Price *</label><input type="number" value={form.price} onChange={u("price")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" /></div>
            <div><label className="text-xs font-medium text-muted-foreground block mb-1">Original Price</label><input type="number" value={form.original_price} onChange={u("original_price")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" /></div>
            <div><label className="text-xs font-medium text-muted-foreground block mb-1">Stock</label><input type="number" value={form.stock} onChange={u("stock")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" /></div>
            <div><label className="text-xs font-medium text-muted-foreground block mb-1">Badge</label><input value={form.badge} onChange={u("badge")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" placeholder="e.g. Bestseller" /></div>
            <div className="sm:col-span-2"><label className="text-xs font-medium text-muted-foreground block mb-1">Image URL</label><input value={form.image_url} onChange={u("image_url")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" /></div>
            <div className="sm:col-span-2"><label className="text-xs font-medium text-muted-foreground block mb-1">Description</label><textarea value={form.description} onChange={u("description")} rows={3} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="rounded" />
              <label className="text-sm">Active</label>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="px-6 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold">Save</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 rounded-xl border border-border text-sm">Cancel</button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" /></div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground"><p>No products yet. Click "Add Product" to get started.</p></div>
      ) : (
        <div className="overflow-x-auto rounded-2xl glass border border-border/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Product</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Category</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Price</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Stock</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-border/20 hover:bg-secondary/30">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image_url || "/placeholder.svg"} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium truncate max-w-[200px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{p.categories?.name || "—"}</td>
                  <td className="py-3 px-4 font-medium">₹{Number(p.price).toLocaleString()}</td>
                  <td className="py-3 px-4">{p.stock}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.is_active ? "bg-green-500/10 text-green-400" : "bg-destructive/10 text-destructive"}`}>
                      {p.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-secondary transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
