"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/umkm", label: "Kelola UMKM" },
  { href: "/admin/produk", label: "Kelola Produk" },
  { href: "/katalog", label: "Lihat Katalog" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="leading-tight">
              <div className="font-bold text-green-800">Admin Katalog UMKM</div>
              <div className="text-xs text-slate-400">Desa Tanggirejo</div>
            </div>
          </Link>

          <nav className="flex items-center gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 transition ${
                    isActive
                      ? "bg-green-50 font-semibold text-green-800"
                      : "text-slate-600 hover:bg-slate-100 hover:text-green-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="ml-2 border-l border-slate-200 pl-3">
              <LogoutButton />
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}