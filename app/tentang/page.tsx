import Link from "next/link";

export default function TentangPage() {
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
            <Link href="/tentang" className="font-semibold text-green-800">Tentang</Link>
            <Link href="/kontak" className="hover:text-green-800">Kontak</Link>
          </nav>
        </div>
      </header>

      {/* HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-700">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 text-white lg:px-8">
          <p className="text-sm font-semibold text-lime-300">Tentang Kami</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold md:text-5xl">
            Katalog UMKM Desa Tanggirejo
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-green-100">
            Media digital untuk memperkenalkan produk dan usaha lokal Desa Tanggirejo
            kepada masyarakat yang lebih luas.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-3xl px-5 pb-4 pt-16 text-center lg:px-8">
        <p className="text-lg leading-8 text-slate-600">
          Katalog UMKM Desa Tanggirejo adalah media digital yang dibuat untuk
          memperkenalkan produk dan usaha lokal milik warga Desa Tanggirejo
          kepada masyarakat yang lebih luas. Melalui platform ini, pengunjung
          dapat menemukan berbagai UMKM beserta produk unggulannya, lengkap
          dengan informasi kontak, lokasi, dan cara memesan.
        </p>
      </section>

      {/* TUJUAN KAMI */}
      <section className="bg-[#faf8f1]">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <p className="text-sm font-semibold text-green-700">Yang Kami Perjuangkan</p>
          <h2 className="mt-1 text-3xl font-bold">Tujuan Kami</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                📱
              </div>
              <h3 className="mt-4 font-bold">Digitalisasi UMKM</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Membantu UMKM lokal lebih dikenal secara digital, menjangkau
                pembeli yang lebih luas.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                🔍
              </div>
              <h3 className="mt-4 font-bold">Mudah Ditemukan</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Memudahkan masyarakat menemukan produk lokal berkualitas
                lewat pencarian & kategori.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                🌱
              </div>
              <h3 className="mt-4 font-bold">Ekonomi Desa Tumbuh</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Mendorong pertumbuhan ekonomi Desa Tanggirejo lewat dukungan
                produk lokal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-semibold text-green-700">Sederhana & Cepat</p>
        <h2 className="mt-1 text-3xl font-bold">Cara Kerja</h2>

        <div className="mt-8 space-y-6">
          <Step
            number="1"
            title="Jelajahi Katalog"
            description="Pengunjung menjelajahi katalog UMKM, mencari berdasarkan nama atau kategori produk."
          />
          <Step
            number="2"
            title="Lihat Detail Produk"
            description="Melihat detail UMKM: profil pemilik, alamat, jam operasional, dan daftar produk yang tersedia."
          />
          <Step
            number="3"
            title="Hubungi Langsung"
            description="Menghubungi pemilik usaha secara langsung melalui WhatsApp, atau menemukan lokasinya lewat Google Maps."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="rounded-3xl bg-green-900 px-7 py-12 text-center text-white md:px-16">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold md:text-3xl">
            Mulai jelajahi produk lokal Desa Tanggirejo
          </h2>
          <Link
            href="/katalog"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-green-900"
          >
            Lihat Katalog UMKM
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

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-800 font-bold text-white">
        {number}
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}