"use client";

import {
  Store,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const quickLinks = [
    { label: "Beranda", href: "#beranda" },
    { label: "Produk", href: "#produk" },
    { label: "Promo", href: "#promo" },
    { label: "Kontak", href: "#kontak" },
  ];

  const categories = [
    { label: "Buah Segar", href: "#produk" },
    { label: "Sayuran Organik", href: "#produk" },
    { label: "Buah Import", href: "#produk" },
    { label: "Paket Hemat", href: "#produk" },
    { label: "Buah Potong", href: "#produk" },
  ];

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 grid place-content-center rounded-lg bg-green-600 shadow-lg">
                <Store className="h-6 w-6" />
              </div>
              <div className="text-xl font-bold">Fruits Store</div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Toko buah dan sayur segar terpercaya dengan kualitas terbaik. Kami
              berkomitmen memberikan produk segar langsung dari petani lokal.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="h-10 w-10 rounded-lg bg-neutral-800 hover:bg-green-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Link Cepat</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-green-400 text-sm flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Kategori</h3>
            <ul className="space-y-3">
              {categories.map((cat, i) => (
                <li key={i}>
                  <a
                    href={cat.href}
                    className="text-neutral-400 hover:text-green-400 text-sm flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400">
                  Jl. Raya Medan No. 123, Medan, Sumatera Utara 20111
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-neutral-400">+62 821 2345 6789</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-neutral-400">info@fruitsstore.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-neutral-800" />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <p>© 2025 Fruits Store. All rights reserved.</p>
          <p>Made with love by Hizkia in Medan ❤️</p>
        </div>
      </div>
    </footer>
  );
}