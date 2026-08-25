"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduk(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("produk").insert({
    umkm_id: formData.get("umkm_id") as string,
    nama_produk: formData.get("nama_produk") as string,
    deskripsi: formData.get("deskripsi") as string,
    harga: Number(formData.get("harga")),
    foto_url: formData.get("foto_url") as string,
    marketplace_url: formData.get("marketplace_url") as string,
    status: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/produk");
  revalidatePath("/katalog");
  redirect("/admin/produk");
}

export async function updateProduk(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("produk")
    .update({
      umkm_id: formData.get("umkm_id") as string,
      nama_produk: formData.get("nama_produk") as string,
      deskripsi: formData.get("deskripsi") as string,
      harga: Number(formData.get("harga")),
      foto_url: formData.get("foto_url") as string,
      marketplace_url: formData.get("marketplace_url") as string,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/produk");
  revalidatePath("/katalog");
  redirect("/admin/produk");
}

export async function deleteProduk(formData: FormData) {
  const id = formData.get("id") as string;
  const supabase = await createClient();

  const { error } = await supabase.from("produk").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/produk");
  revalidatePath("/katalog");
}