import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: umkmCount } = await supabase
    .from("umkm")
    .select("*", { count: "exact", head: true });

  const { count: produkCount } = await supabase
    .from("produk")
    .select("*", { count: "exact", head: true });

  const { count: kategoriCount } = await supabase
    .from("kategori")
    .select("*", { count: "exact", head: true });

  return (
    <div>
      <div className="rounded-2xl bg-gradient-to-br from-green-950 via-green-900 to-green-700 px-8 py-10 text-white">
        <p className="text-sm font-semibold text-lime-300">Selamat datang</p>
        <h1 className="mt-1 text-3xl font-bold">Dashboard Admin</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-green-100">
          Kelola data UMKM, produk, dan kategori Katalog UMKM Desa Tanggirejo dari sini.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon="🏪" value={umkmCount ?? 0} label="UMKM Terdaftar" color="bg-green-50 text-green-700" />
        <StatCard icon="📦" value={produkCount ?? 0} label="Produk" color="bg-amber-50 text-amber-700" />
        <StatCard icon="🏷️" value={kategoriCount ?? 0} label="Kategori" color="bg-blue-50 text-blue-700" />
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-slate-500">Menu Cepat</h2>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/umkm"
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-lg"
          >
            <div>
              <div className="text-2xl">🏪</div>
              <h3 className="mt-3 font-bold">Kelola Data UMKM</h3>
              <p className="mt-1 text-sm text-slate-500">Tambah, ubah, atau hapus data UMKM</p>
            </div>
            <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-green-700">
              →
            </span>
          </Link>

          <Link
            href="/admin/produk"
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-lg"
          >
            <div>
              <div className="text-2xl">📦</div>
              <h3 className="mt-3 font-bold">Kelola Data Produk</h3>
              <p className="mt-1 text-sm text-slate-500">Tambah, ubah, atau hapus data produk</p>
            </div>
            <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-green-700">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${color}`}>
        {icon}
      </div>
      <div className="mt-4 text-3xl font-bold text-slate-900">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}