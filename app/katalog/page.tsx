import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

type KatalogPageProps = {
  searchParams: Promise<{ cari?: string; kategori?: string }>;
};

export default async function KatalogPage({ searchParams }: KatalogPageProps) {
  const { cari, kategori } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("umkm")
    .select(`
      id,
      nama_usaha,
      nama_pemilik,
      deskripsi,
      alamat,
      foto_url,
      kategori ( id, nama )
    `)
    .eq("status", true)
    .order("created_at", { ascending: false });

  if (cari) {
    query = query.ilike("nama_usaha", `%${cari}%`);
  }

  if (kategori) {
    query = query.eq("kategori_id", kategori);
  }

  const { data: umkm, error } = await query;

  const { data: kategoriList } = await supabase
    .from("kategori")
    .select("id, nama")
    .eq("status", true)
    .order("nama");

  if (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="leading-tight">
            <div className="font-bold text-green-800">KATALOG UMKM</div>
            <div className="text-xs font-semibold text-slate-500">DESA TANGGIREJO</div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/" className="hover:text-green-800">Beranda</Link>
            <Link href="/katalog" className="font-semibold text-green-800">Katalog UMKM</Link>
            <Link href="/tentang" className="hover:text-green-800">Tentang</Link>
            <Link href="/kontak" className="hover:text-green-800">Kontak</Link>
          </nav>
        </div>
      </header>

      {/* HEADER */}
      <section className="bg-gradient-to-br from-green-950 via-green-900 to-green-700">
        <div className="mx-auto max-w-7xl px-5 py-16 text-white lg:px-8">
          <p className="text-sm font-semibold text-lime-300">Produk Lokal Desa Tanggirejo</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Katalog UMKM</h1>
          <p className="mt-4 max-w-2xl leading-7 text-green-100">
            Temukan berbagai produk dari pelaku usaha lokal Desa Tanggirejo.
          </p>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <section className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
        <form action="/katalog" method="GET" className="flex gap-3">
          <input
            type="text"
            name="cari"
            defaultValue={cari ?? ""}
            placeholder="Cari UMKM atau produk..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-600"
          />
          {kategori && <input type="hidden" name="kategori" value={kategori} />}
          <button type="submit" className="rounded-xl bg-green-800 px-6 py-3 text-sm font-semibold text-white hover:bg-green-900">
            Cari
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={cari ? `/katalog?cari=${encodeURIComponent(cari)}` : "/katalog"}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${!kategori ? "bg-green-800 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
          >
            Semua Kategori
          </Link>
          {kategoriList?.map((k) => (
            <Link
              key={k.id}
              href={`/katalog?kategori=${k.id}${cari ? `&cari=${encodeURIComponent(cari)}` : ""}`}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${kategori === k.id ? "bg-green-800 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
            >
              {k.nama}
            </Link>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Daftar UMKM</h2>
          <p className="mt-1 text-sm text-slate-500">{umkm?.length ?? 0} UMKM tersedia</p>
        </div>

        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Terjadi kesalahan saat mengambil data UMKM.
          </div>
        )}

        {umkm && umkm.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {umkm.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-amber-100 to-green-50">
                  {item.foto_url ? (
                    <img src={item.foto_url} alt={item.nama_usaha} className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-7xl">🍘</div>
                  )}
                </div>

                <div className="p-5">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {(item.kategori as any)?.nama ?? "UMKM"}
                  </span>

                  <h3 className="mt-4 text-lg font-bold">{item.nama_usaha}</h3>
                  <p className="mt-1 text-xs font-medium text-slate-400">{item.nama_pemilik ?? ""}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                    {item.deskripsi ?? "Produk lokal Desa Tanggirejo."}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <span>📍</span>
                    <span>{item.alamat ?? "Desa Tanggirejo"}</span>
                  </div>

                  <Link
                    href={`/umkm/${item.id}`}
                    className="mt-5 flex w-full items-center justify-center rounded-xl bg-green-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
                  >
                    Lihat Detail UMKM
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <div className="text-5xl">📦</div>
            <h3 className="mt-5 text-lg font-bold">Tidak ada UMKM ditemukan</h3>
            <p className="mt-2 text-sm text-slate-500">
              Coba kata kunci lain atau lihat semua kategori.
            </p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-green-950 text-green-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
          <div>
            <div className="font-bold">KATALOG UMKM</div>
            <div className="text-sm">DESA TANGGIREJO</div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-green-200">
              Media katalog digital untuk memperkenalkan usaha dan produk lokal Desa Tanggirejo.
            </p>
          </div>
          <div>
            <div className="font-semibold">Menu</div>
            <div className="mt-4 space-y-2 text-sm text-green-200">
              <div>Beranda</div>
              <div>Katalog UMKM</div>
              <div>Tentang</div>
              <div>Kontak</div>
            </div>
          </div>
          <div>
            <div className="font-semibold">Terintegrasi</div>
            <div className="mt-4 space-y-2 text-sm text-green-200">
              <div>WhatsApp</div>
              <div>Google Maps</div>
              <div>Marketplace</div>
            </div>
          </div>
        </div>
        <div className="border-t border-green-900 py-5 text-center text-xs text-green-300">
          © 2026 Katalog UMKM Desa Tanggirejo
        </div>
      </footer>
    </main>
  );
}