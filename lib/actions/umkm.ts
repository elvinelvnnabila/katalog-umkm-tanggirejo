"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUmkm(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("umkm").insert({
    nama_usaha: formData.get("nama_usaha") as string,
    nama_pemilik: formData.get("nama_pemilik") as string,
    kategori_id: formData.get("kategori_id") as string,
    deskripsi: formData.get("deskripsi") as string,
    alamat: formData.get("alamat") as string,
    whatsapp: formData.get("whatsapp") as string,
    maps_url: formData.get("maps_url") as string,
    marketplace_url: formData.get("marketplace_url") as string,
    instagram: formData.get("instagram") as string,
    jam_operasional: formData.get("jam_operasional") as string,
    foto_url: formData.get("foto_url") as string,
    status: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/umkm");
  revalidatePath("/katalog");
  redirect("/admin/umkm");
}

export async function updateUmkm(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("umkm")
    .update({
      nama_usaha: formData.get("nama_usaha") as string,
      nama_pemilik: formData.get("nama_pemilik") as string,
      kategori_id: formData.get("kategori_id") as string,
      deskripsi: formData.get("deskripsi") as string,
      alamat: formData.get("alamat") as string,
      whatsapp: formData.get("whatsapp") as string,
      maps_url: formData.get("maps_url") as string,
      marketplace_url: formData.get("marketplace_url") as string,
      instagram: formData.get("instagram") as string,
      jam_operasional: formData.get("jam_operasional") as string,
      foto_url: formData.get("foto_url") as string,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/umkm");
  revalidatePath("/katalog");
  revalidatePath(`/umkm/${id}`);
  redirect("/admin/umkm");
}

export async function deleteUmkm(formData: FormData) {
  const id = formData.get("id") as string;
  const supabase = await createClient();

  const { error } = await supabase.from("umkm").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/umkm");
  revalidatePath("/katalog");
}