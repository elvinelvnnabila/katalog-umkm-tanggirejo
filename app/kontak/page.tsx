import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

export default function KontakPage() {
  const whatsappMessage = encodeURIComponent(
    "Halo, saya ingin bertanya mengenai Katalog UMKM Desa Tanggirejo."
  );
  const whatsappUrl = `https://wa.me/6280000000000?text=${whatsappMessage}`;

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
            <Link href="/" className="hover:text-green-800">Beranda</Link>
            <Link href="/katalog" className="hover:text-green-800">Katalog UMKM</Link>
            <Link href="/tentang" className="hover:text-green-800">Tentang</Link>
            <Link href="/kontak" className="font-semibold text-green-800">Kontak</Link>
          </nav>
        </div>
      </header>

      {/* HEADER */}
      <section className="bg-gradient-to-br from-green-950 via-green-900 to-green-700">
        <div className="mx-auto max-w-7xl px-5 py-16 text-white lg:px-8">
          <p className="text-sm font-semibold text-lime-300">Hubungi Kami</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Kontak</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        <p className="leading-7 text-slate-700">
          Untuk pertanyaan seputar Katalog UMKM Desa Tanggirejo, pendaftaran UMKM baru,
          atau kerja sama, silakan hubungi kami melalui kontak berikut:
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="text-3xl">💬</div>
            <h3 className="mt-3 font-bold">WhatsApp</h3>
            <p className="mt-1 text-sm text-slate-500">Admin Desa Tanggirejo</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-xl bg-green-800 px-5 py-3 text-sm font-semibold text-white hover:bg-green-900"
            >
              Hubungi via WhatsApp
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="text-3xl">📍</div>
            <h3 className="mt-3 font-bold">Alamat</h3>
            <p className="mt-1 text-sm text-slate-500">
              Kantor Desa Tanggirejo, Kecamatan Tanggirejo
            </p>
          </div>
        </div>
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