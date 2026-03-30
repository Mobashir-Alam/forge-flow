import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AdminUsers = () => {
  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: roles = [], refetch: refetchRoles } = useQuery({
    queryKey: ["admin-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*");
      if (error) throw error;
      return data;
    },
  });

  const toggleAdmin = async (userId: string) => {
    const hasAdmin = roles.some(r => r.user_id === userId && r.role === "admin");
    if (hasAdmin) {
      const role = roles.find(r => r.user_id === userId && r.role === "admin");
      if (role) {
        const { error } = await supabase.from("user_roles").delete().eq("id", role.id);
        if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
        toast({ title: "Admin role removed" });
      }
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Admin role granted" });
    }
    refetchRoles();
  };

  if (isLoading) return <div className="text-center py-10"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" /></div>;

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold">Users ({profiles.length})</h2>
      {profiles.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground"><p>No users yet.</p></div>
      ) : (
        <div className="overflow-x-auto rounded-2xl glass border border-border/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">User</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Phone</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">City</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Role</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Joined</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map(p => {
                const isAdmin = roles.some(r => r.user_id === p.user_id && r.role === "admin");
                return (
                  <tr key={p.id} className="border-b border-border/20 hover:bg-secondary/30">
                    <td className="py-3 px-4 font-medium">{p.display_name || "—"}</td>
                    <td className="py-3 px-4 text-muted-foreground">{p.phone || "—"}</td>
                    <td className="py-3 px-4 text-muted-foreground">{p.city || "—"}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isAdmin ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>{isAdmin ? "Admin" : "User"}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => toggleAdmin(p.user_id)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${isAdmin ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : "bg-primary/10 text-primary hover:bg-primary/20"}`}>
                        {isAdmin ? "Remove Admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
