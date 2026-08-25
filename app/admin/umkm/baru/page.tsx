import { createClient } from "@/lib/supabase/server";
import { createUmkm } from "@/lib/actions/umkm";
import { UmkmForm } from "@/components/admin/umkm-form";

export const instant = false;

export default async function TambahUmkmPage() {
  const supabase = await createClient();
  const { data: kategoriList } = await supabase.from("kategori").select("id, nama").order("nama");

  return (
    <div>
      <h1 className="text-2xl font-bold">Tambah UMKM</h1>
      <UmkmForm action={createUmkm} kategoriList={kategoriList ?? []} submitLabel="Tambah UMKM" />
    </div>
  );
}