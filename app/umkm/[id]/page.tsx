import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailUmkmPage({
  params,
}: DetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: umkm, error } = await supabase
    .from("umkm")
    .select(`
      id,
      nama_usaha,
      nama_pemilik,
      deskripsi,
      alamat,
      whatsapp,
      maps_url,
      marketplace_url,
      instagram,
      jam_operasional,
      foto_url,
      kategori (
        id,
        nama
      )
    `)
    .eq("id", id)
    .eq("status", true)
    .single();

  if (error || !umkm) {
    notFound();
  }

  const { data: produk } = await supabase
    .from("produk")
    .select("id, nama_produk, deskripsi, harga, foto_url, marketplace_url")
    .eq("umkm_id", id)
    .eq("status", true)
    .order("created_at", { ascending: false });

  const whatsappMessage = encodeURIComponent(
    `Halo, saya melihat ${umkm.nama_usaha} di Katalog UMKM Desa Tanggirejo. Saya ingin bertanya mengenai produknya.`
  );

  const whatsappUrl =
    `https://wa.me/${umkm.whatsapp}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="leading-tight">
            <div className="font-bold text-green-800">KATALOG UMKM</div>
            <div className="text-xs font-semibold text-slate-500">DESA TANGGIREJO</div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/">Beranda</Link>
            <Link href="/katalog" className="text-green-800">Katalog UMKM</Link>
            <Link href="/tentang">Tentang</Link>
            <Link href="/kontak">Kontak</Link>
          </nav>
        </div>
      </header>

      {/* BREADCRUMB */}
      <section className="border-b border-slate-100 bg-[#faf8f1]">
        <div className="mx-auto max-w-7xl px-5 py-5 text-sm lg:px-8">
          <Link href="/" className="text-slate-500 hover:text-green-800">Beranda</Link>
          <span className="mx-2 text-slate-300">/</span>
          <Link href="/katalog" className="text-slate-500 hover:text-green-800">Katalog</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-medium text-green-800">{umkm.nama_usaha}</span>
        </div>
      </section>

      {/* DETAIL */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 to-green-100">
              {umkm.foto_url ? (
                <img src={umkm.foto_url} alt={umkm.nama_usaha} className="h-full w-full object-cover" />
              ) : (
                <div className="text-[130px] md:text-[180px]">🍘</div>
              )}
            </div>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
              {(umkm.kategori as any)?.nama ?? "UMKM"}
            </span>
            <h1 className="mt-5 text-3xl font-bold md:text-5xl">{umkm.nama_usaha}</h1>
            <p className="mt-3 text-sm font-medium text-slate-400">Oleh {umkm.nama_pemilik ?? "-"}</p>
            <p className="mt-6 leading-7 text-slate-600">{umkm.deskripsi ?? "Produk lokal Desa Tanggirejo."}</p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <InfoRow icon="👤" label="Pemilik" value={umkm.nama_pemilik ?? "-"} />
              <InfoRow icon="📍" label="Alamat" value={umkm.alamat ?? "Desa Tanggirejo"} />
              <InfoRow icon="🕒" label="Jam Operasional" value={umkm.jam_operasional ?? "-"} />
              <InfoRow icon="📱" label="WhatsApp" value={umkm.whatsapp ? `+${umkm.whatsapp}` : "-"} />
              {umkm.instagram && <InfoRow icon="📸" label="Instagram" value={umkm.instagram} />}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {umkm.whatsapp && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 text-sm font-bold text-white transition hover:opacity-90">
                  <span>💬</span>Hubungi WhatsApp
                </a>
              )}
              {umkm.maps_url && (
                <a href={umkm.maps_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-4 text-sm font-bold text-white transition hover:bg-green-900">
                  <span>📍</span>Google Maps
                </a>
              )}
              {umkm.marketplace_url && (
                <a href={umkm.marketplace_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-orange-600 sm:col-span-2">
                  <span>🛍️</span>Lihat di Marketplace
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-[#faf8f1]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-green-700">Produk UMKM</p>
            <h2 className="mt-2 text-3xl font-bold">Produk yang Tersedia</h2>
            <p className="mt-2 text-sm text-slate-500">Hubungi pemilik UMKM untuk mengetahui stok dan informasi produk terbaru.</p>
          </div>

          {produk && produk.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {produk.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 to-amber-50">
                    {item.foto_url ? (
                      <img src={item.foto_url} alt={item.nama_produk} className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-7xl">🍽️</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold">{item.nama_produk}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.deskripsi ?? ""}</p>
                    <div className="mt-4 text-lg font-bold text-green-800">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </div>
                    {umkm.whatsapp && (
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 flex w-full items-center justify-center rounded-xl bg-green-800 px-4 py-3 text-sm font-semibold text-white hover:bg-green-900">
                        Tanya Produk
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <p className="text-sm text-slate-500">Belum ada produk untuk UMKM ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* BACK */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <Link href="/katalog" className="inline-flex items-center gap-2 text-sm font-semibold text-green-800">
          ← Kembali ke Katalog UMKM
        </Link>
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

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[32px_120px_1fr] gap-2 border-b border-slate-100 px-5 py-4 last:border-b-0">
      <span>{icon}</span>
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}