import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProduk } from "@/lib/actions/produk";

export const instant = false;

export default async function AdminProdukListPage() {
  const supabase = await createClient();

  const { data: produk } = await supabase
    .from("produk")
    .select("id, nama_produk, harga, status, umkm ( nama_usaha )")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kelola Produk</h1>
          <p className="mt-1 text-sm text-slate-500">{produk?.length ?? 0} produk terdaftar</p>
        </div>

        <Link href="/admin/produk/baru" className="rounded-xl bg-green-800 px-5 py-3 text-sm font-semibold text-white hover:bg-green-900">
          + Tambah Produk
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">Nama Produk</th>
              <th className="px-4 py-3">UMKM</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produk?.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{item.nama_produk}</td>
                <td className="px-4 py-3 text-slate-500">{(item.umkm as any)?.nama_usaha ?? "-"}</td>
                <td className="px-4 py-3 text-slate-500">Rp {Number(item.harga).toLocaleString("id-ID")}</td>
                <td className="px-4 py-3">
                  {item.status ? (
                    <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">Aktif</span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">Nonaktif</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/produk/${item.id}`} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50">
                      Edit
                    </Link>
                    <form action={deleteProduk}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                        Hapus
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!produk || produk.length === 0) && (
          <div className="px-4 py-12 text-center text-sm text-slate-500">
            Belum ada produk. Klik &quot;Tambah Produk&quot; untuk menambahkan.
          </div>
        )}
      </div>
    </div>
  );
}