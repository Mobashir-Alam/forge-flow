import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type DBProduct = Tables<"products"> & {
  categories?: Tables<"categories"> | null;
  product_variants?: Tables<"product_variants">[];
};

export type DBCategory = Tables<"categories">;

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as DBCategory[];
    },
  });

export const useProducts = (categoryId?: string) =>
  useQuery({
    queryKey: ["products", categoryId],
    queryFn: async () => {
      let q = supabase
        .from("products")
        .select("*, categories(*), product_variants(*)")
        .eq("is_active", true);
      if (categoryId) q = q.eq("category_id", categoryId);
      const { data, error } = await q.order("created_at", { ascending: false });
      if (error) throw error;
      return data as DBProduct[];
    },
  });

export const useProduct = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(*), product_variants(*), product_images(*)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as DBProduct & { product_images?: Tables<"product_images">[] };
    },
    enabled: !!id,
  });

export const useAllProducts = () =>
  useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(*), product_variants(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as DBProduct[];
    },
  });

export const useAllCategories = () =>
  useQuery({
    queryKey: ["all-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as DBCategory[];
    },
  });

export const useOrders = () =>
  useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
