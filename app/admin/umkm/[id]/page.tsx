import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateUmkm } from "@/lib/actions/umkm";
import { UmkmForm } from "@/components/admin/umkm-form";

export const instant = false;

type EditUmkmPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditUmkmPage({ params }: EditUmkmPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: umkm } = await supabase.from("umkm").select("*").eq("id", id).single();

  if (!umkm) {
    notFound();
  }

  const { data: kategoriList } = await supabase.from("kategori").select("id, nama").order("nama");

  const updateUmkmWithId = updateUmkm.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit UMKM</h1>
      <UmkmForm action={updateUmkmWithId} kategoriList={kategoriList ?? []} defaultValues={umkm} submitLabel="Simpan Perubahan" />
    </div>
  );
}