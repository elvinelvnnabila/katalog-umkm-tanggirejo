"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog UMKM" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xl md:hidden"
        aria-label="Buka menu"
      >
        ☰
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex flex-col bg-white">
            <div className="flex h-24 shrink-0 items-center justify-between border-b border-slate-200 px-5">
              <span className="font-bold text-green-800">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xl"
                aria-label="Tutup menu"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto bg-white px-5 py-4 text-lg font-medium">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}