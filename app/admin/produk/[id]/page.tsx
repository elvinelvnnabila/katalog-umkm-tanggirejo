import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProduk } from "@/lib/actions/produk";
import { ProdukForm } from "@/components/admin/produk-form";

export const instant = false;

type EditProdukPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProdukPage({ params }: EditProdukPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: produk } = await supabase.from("produk").select("*").eq("id", id).single();

  if (!produk) {
    notFound();
  }

  const { data: umkmList } = await supabase.from("umkm").select("id, nama_usaha").order("nama_usaha");

  const updateProdukWithId = updateProduk.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Produk</h1>
      <ProdukForm action={updateProdukWithId} umkmList={umkmList ?? []} defaultValues={produk} submitLabel="Simpan Perubahan" />
    </div>
  );
}