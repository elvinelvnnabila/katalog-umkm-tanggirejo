import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

const categoryIcons: Record<string, string> = {
  "Camilan": "🍘",
  "Makanan Berat": "🍱",
  "Minuman": "🥤",
  "Kue & Dessert": "🍰",
  "Oleh-oleh": "🛍️",
  "Bumbu & Sambal": "🌶️",
  "Frozen Food": "🧊",
  "Lainnya": "✨",
};

export default async function Home() {
  const supabase = await createClient();

  const { count: umkmCount } = await supabase
    .from("umkm")
    .select("*", { count: "exact", head: true })
    .eq("status", true);

  const { count: produkCount } = await supabase
    .from("produk")
    .select("*", { count: "exact", head: true })
    .eq("status", true);

  const { data: kategoriList, count: kategoriCount } = await supabase
    .from("kategori")
    .select("id, nama", { count: "exact" })
    .eq("status", true)
    .order("nama");

  const { data: umkmUnggulan } = await supabase
    .from("umkm")
    .select("id, nama_usaha, deskripsi, foto_url, kategori ( nama )")
    .eq("status", true)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="leading-tight">
            <div className="font-bold text-green-800">KATALOG UMKM</div>
            <div className="text-xs font-semibold text-slate-500">DESA TANGGIREJO</div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link className="text-green-800" href="/">Beranda</Link>
            <Link className="hover:text-green-800" href="/katalog">Katalog UMKM</Link>
            <Link className="hover:text-green-800" href="/tentang">Tentang</Link>
            <Link className="hover:text-green-800" href="/kontak">Kontak</Link>
          </nav>

          <button className="rounded-lg border px-3 py-2 md:hidden">☰</button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-700">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-green-50">
              Produk Lokal Desa Tanggirejo
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
              Dukung Produk Lokal,
              <span className="block text-lime-300">Majukan Desa Tanggirejo</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-green-100 md:text-lg">
              Temukan berbagai produk dari pelaku UMKM Desa Tanggirejo.
              Hubungi penjual melalui WhatsApp dan temukan lokasi usaha melalui Google Maps.
            </p>

            <form action="/katalog" method="GET" className="mt-8 flex max-w-xl rounded-2xl bg-white p-2 shadow-xl">
              <input
                type="text"
                name="cari"
                placeholder="Cari UMKM atau produk..."
                className="min-w-0 flex-1 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none"
              />
              <button type="submit" className="rounded-xl bg-green-800 px-6 py-3 text-sm font-semibold text-white">
                Cari
              </button>
            </form>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-[32px] border border-white/20 bg-white/10 p-6 backdrop-blur">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-amber-100 p-8">
                  <div className="text-6xl">🍘</div>
                  <div className="mt-12 font-bold text-amber-950">Camilan Lokal</div>
                </div>
                <div className="rounded-3xl bg-orange-100 p-8">
                  <div className="text-6xl">🍱</div>
                  <div className="mt-12 font-bold text-orange-950">Makanan</div>
                </div>
                <div className="rounded-3xl bg-lime-100 p-8">
                  <div className="text-6xl">🥤</div>
                  <div className="mt-12 font-bold text-lime-950">Minuman</div>
                </div>
                <div className="rounded-3xl bg-yellow-100 p-8">
                  <div className="text-6xl">🍰</div>
                  <div className="mt-12 font-bold text-yellow-950">Kue & Dessert</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="mx-auto -mt-7 max-w-6xl px-5">
        <div className="relative grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:grid-cols-4">
          <Stat value={`${umkmCount ?? 0}`} label="UMKM Terdaftar" />
          <Stat value={`${produkCount ?? 0}`} label="Produk Lokal" />
          <Stat value={`${kategoriCount ?? 0}`} label="Kategori" />
          <Stat value="100%" label="Produk Lokal" />
        </div>
      </section>

      {/* CATEGORY */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-green-700">Jelajahi</p>
            <h2 className="mt-1 text-3xl font-bold">Kategori Populer</h2>
          </div>
          <Link href="/katalog" className="hidden text-sm font-semibold text-green-800 md:block">
            Lihat semua →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {kategoriList?.map((category) => (
            <Link
              key={category.id}
              href={`/katalog?kategori=${category.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
            >
              <div className="text-3xl">{categoryIcons[category.nama] ?? "🏷️"}</div>
              <div className="mt-3 text-sm font-semibold">{category.nama}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* UMKM */}
      <section className="bg-[#faf8f1]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-green-700">Produk Desa</p>
              <h2 className="mt-1 text-3xl font-bold">UMKM Unggulan</h2>
              <p className="mt-2 text-sm text-slate-500">
                Temukan produk unggulan dari pelaku UMKM Desa Tanggirejo.
              </p>
            </div>
            <Link href="/katalog" className="hidden text-sm font-semibold text-green-800 md:block">
              Lihat semua →
            </Link>
          </div>

          {umkmUnggulan && umkmUnggulan.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {umkmUnggulan.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 text-7xl">
                    {item.foto_url ? (
                      <img src={item.foto_url} alt={item.nama_usaha} className="h-full w-full object-cover" />
                    ) : (
                      "🍘"
                    )}
                  </div>
                  <div className="p-5">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {(item.kategori as any)?.nama ?? "UMKM"}
                    </span>
                    <h3 className="mt-4 font-bold">{item.nama_usaha}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.deskripsi ?? ""}</p>
                    <Link href={`/umkm/${item.id}`} className="mt-5 inline-flex text-sm font-semibold text-green-800">
                      Lihat Detail →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Belum ada UMKM.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="rounded-3xl bg-green-900 px-7 py-12 text-center text-white md:px-16">
          <p className="text-sm font-semibold text-lime-300">Dukung Ekonomi Lokal</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold">
            Temukan dan dukung UMKM Desa Tanggirejo
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-green-100">
            Setiap produk yang kamu pilih turut mendukung perkembangan usaha masyarakat lokal.
          </p>
          <Link href="/katalog" className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-green-900">
            Jelajahi Katalog
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-950 text-green-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
          <div>
            <div className="font-bold">KATALOG UMKM</div>
            <div className="text-sm">DESA TANGGIREJO</div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-green-200">
              Media katalog digital untuk membantu memperkenalkan produk dan usaha lokal Desa Tanggirejo.
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
            <div className="font-semibold">Terintegrasi Dengan</div>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-b border-slate-200 p-5 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="text-2xl font-bold text-green-800">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{label}</div>
    </div>
  );
}