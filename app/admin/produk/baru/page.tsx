import { createClient } from "@/lib/supabase/server";
import { createProduk } from "@/lib/actions/produk";
import { ProdukForm } from "@/components/admin/produk-form";

export const instant = false;

export default async function TambahProdukPage() {
  const supabase = await createClient();
  const { data: umkmList } = await supabase.from("umkm").select("id, nama_usaha").order("nama_usaha");

  return (
    <div>
      <h1 className="text-2xl font-bold">Tambah Produk</h1>
      <ProdukForm action={createProduk} umkmList={umkmList ?? []} submitLabel="Tambah Produk" />
    </div>
  );
}