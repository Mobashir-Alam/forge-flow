import { useState } from "react";
import { useAllCategories } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CatForm { name: string; icon: string; image_url: string; description: string; sort_order: string; is_active: boolean; }
const empty: CatForm = { name: "", icon: "", image_url: "", description: "", sort_order: "0", is_active: true };

const AdminCategories = () => {
  const { data: categories = [], isLoading } = useAllCategories();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<CatForm>(empty);

  const openNew = () => { setForm(empty); setEditId(null); setShowForm(true); };
  const openEdit = (c: any) => {
    setForm({ name: c.name, icon: c.icon || "", image_url: c.image_url || "", description: c.description || "", sort_order: String(c.sort_order || 0), is_active: c.is_active ?? true });
    setEditId(c.id); setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name) { toast({ title: "Name required", variant: "destructive" }); return; }
    const payload = { name: form.name, icon: form.icon || null, image_url: form.image_url || null, description: form.description || null, sort_order: parseInt(form.sort_order) || 0, is_active: form.is_active };
    if (editId) {
      const { error } = await supabase.from("categories").update(payload).eq("id", editId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Category updated" });
    } else {
      const { error } = await supabase.from("categories").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Category created" });
    }
    queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Category deleted" });
    queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  const u = (field: keyof CatForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">Categories ({categories.length})</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold"><Plus className="w-4 h-4" /> Add Category</button>
      </div>

      {showForm && (
        <div className="p-6 rounded-2xl glass border border-border/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold">{editId ? "Edit" : "New"} Category</h3>
            <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-medium text-muted-foreground block mb-1">Name *</label><input value={form.name} onChange={u("name")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" /></div>
            <div><label className="text-xs font-medium text-muted-foreground block mb-1">Icon (emoji)</label><input value={form.icon} onChange={u("icon")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" placeholder="⚡" /></div>
            <div><label className="text-xs font-medium text-muted-foreground block mb-1">Sort Order</label><input type="number" value={form.sort_order} onChange={u("sort_order")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" /></div>
            <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} /><label className="text-sm">Active</label></div>
            <div className="sm:col-span-2"><label className="text-xs font-medium text-muted-foreground block mb-1">Image URL</label><input value={form.image_url} onChange={u("image_url")} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" /></div>
            <div className="sm:col-span-2"><label className="text-xs font-medium text-muted-foreground block mb-1">Description</label><textarea value={form.description} onChange={u("description")} rows={2} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm" /></div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="px-6 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold">Save</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 rounded-xl border border-border text-sm">Cancel</button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" /></div>
      ) : categories.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground"><p>No categories yet.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(c => (
            <div key={c.id} className="p-4 rounded-2xl glass border border-border/30">
              <div className="flex items-center gap-3 mb-3">
                {c.image_url && <img src={c.image_url} alt={c.name} className="w-12 h-12 rounded-lg object-cover" />}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{c.icon} {c.name}</h4>
                  <p className="text-xs text-muted-foreground">Order: {c.sort_order}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${c.is_active ? "bg-green-500/10 text-green-400" : "bg-destructive/10 text-destructive"}`}>{c.is_active ? "Active" : "Inactive"}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(c)} className="flex-1 py-1.5 rounded-lg border border-border text-xs hover:bg-secondary transition-colors flex items-center justify-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
                <button onClick={() => handleDelete(c.id)} className="py-1.5 px-3 rounded-lg border border-destructive/30 text-destructive text-xs hover:bg-destructive/10 transition-colors"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
