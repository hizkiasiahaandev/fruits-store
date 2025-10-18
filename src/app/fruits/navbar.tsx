"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Store, ShieldCheck, ShoppingCart, Home, Tag, Percent, PhoneCall,
  Menu, X, Search, Heart, Trash2, Minus, Plus, Package
} from "lucide-react";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useShopStore } from "@/lib/store";
import CheckoutDialog from "./pages/order/checkout";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Beranda");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const cartMap = useShopStore((s) => s.cart);
  const wishlist = useShopStore((s) => s.wishlist);
  const cartOpen = useShopStore((s) => s.cartOpen);
  const setCartOpen = useShopStore((s) => s.setCartOpen);
  const updateQty = useShopStore((s) => s.updateQty);
  const removeItem = useShopStore((s) => s.removeFromCart);
  const clearCart = useShopStore((s) => s.clearCart);

  const cartItems = useMemo(() => Object.values(cartMap ?? {}), [cartMap]);
  const cartItemsForCheckout = useMemo(
    () =>
      cartItems.map(({ product, qty }) => ({
        product: { ...product, id: String(product.id) },
        qty,
      })),
    [cartItems]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((n, it) => n + (it?.qty ?? 0), 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, it) => sum + it.product.price * it.qty, 0),
    [cartItems]
  );

  const wishlistCount = wishlist?.length ?? 0;

  const nav = [
    { label: "Beranda", icon: Home, href: "#beranda" },
    { label: "Produk", icon: Tag, href: "#produk" },
    { label: "Promo", icon: Percent, href: "#promo", badge: "Hot" },
    { label: "Kontak", icon: PhoneCall, href: "#kontak" },
  ];

  const handleScroll = (href: string, label: string) => {
    setActiveNav(label);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="w-full border-b bg-white fixed left-0 top-0 z-50 shadow-md scroll-smooth">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 grid place-content-center rounded-lg bg-green-600 text-white shadow-lg">
              <Store className="h-7 w-7" />
            </div>
            <div>
              <div
                onClick={() => {
                  const section = document.querySelector("#beranda");
                  section?.scrollIntoView();
                }}
                className="text-2xl font-bold text-neutral-900 leading-none cursor-pointer hover:text-green-600 transition-colors"
              >
                Fruits Store
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-500 mt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Verified Store</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <Input
                id="search-input-lg"
                name="search"
                type="text"
                placeholder="Cari produk segar..."
                className="w-full h-12 pl-12 pr-4 rounded-lg border-2 border-neutral-200 focus-visible:ring-0 focus:border-green-500"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {nav.map((n, i) => (
              <button
                key={i}
                onClick={() => handleScroll(n.href, n.label)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeNav === n.label
                    ? "bg-green-600 text-white shadow-md"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                <n.icon className="h-4 w-4" />
                <span>{n.label}</span>
                {n.badge && (
                  <Badge className="ml-1 bg-red-500 text-white text-[10px] px-1.5">
                    {n.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="hidden sm:flex relative h-11 w-11 items-center justify-center rounded-lg border-2 border-neutral-200 bg-white hover:bg-red-50"
              title="Wishlist"
            >
              <Heart className="h-5 w-5 text-neutral-600" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-[10px]">
                  {wishlistCount}
                </Badge>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-lg border-2 border-neutral-200 bg-white hover:bg-neutral-100"
              title="Keranjang"
            >
              <ShoppingCart className="h-5 w-5 text-neutral-600" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-green-600 text-white text-[10px] shadow-md">
                  {cartCount}
                </Badge>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg border-2 border-neutral-200 bg-white hover:bg-neutral-100"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-neutral-700" />
              ) : (
                <Menu className="h-5 w-5 text-neutral-700" />
              )}
            </button>
          </div>
        </div>

        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              id="search-input-sm"
              name="search"
              type="text"
              placeholder="Cari produk segar..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-neutral-200 focus-visible:ring-0 focus:border-green-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div className={`${mobileMenuOpen ? "max-h-96" : "max-h-0"} md:hidden overflow-hidden transition-all duration-300`}>
        <nav className="px-4 pb-4 space-y-2 bg-neutral-50">
          {[
            { label: "Beranda", icon: Home, href: "#beranda" },
            { label: "Produk", icon: Tag, href: "#produk" },
            { label: "Promo", icon: Percent, href: "#promo", badge: "Hot" },
            { label: "Kontak", icon: PhoneCall, href: "#kontak" },
          ].map((n, i) => (
            <button
              key={i}
              onClick={() => handleScroll(n.href, n.label)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium ${
                activeNav === n.label
                  ? "bg-green-600 text-white shadow-md"
                  : "text-neutral-700 bg-white hover:bg-neutral-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <n.icon className="h-5 w-5" />
                <span>{n.label}</span>
              </div>
              {n.badge && (
                <Badge className="bg-red-500 text-white text-[10px] px-2">
                  {n.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="flex items-center gap-3">
              <div className="p-2 bg-green-600 shadow-lg rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text font-bold text-neutral-900">Keranjang Belanja</div>
                <div className="text-sm text-neutral-600">{cartCount} item dipilih</div>
              </div>
            </SheetTitle>
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="h-24 w-24 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                <Package className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Keranjang Kosong</h3>
              <p className="text-neutral-600 text-center mb-6">Belum ada produk yang ditambahkan ke keranjang</p>
              <button
                onClick={() => setCartOpen(false)}
                className="inline-flex items-center shadow-lg justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Mulai Belanja</span>
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {cartItems.map(({ product, qty }) => (
                    <div key={product.id} className="bg-white border-2 border-neutral-100 rounded p-4 hover:border-green-200 transition-all">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-neutral-900 mb-1 truncate">{product.name}</h4>
                          <p className="text-sm text-neutral-600 mb-2">{product.weight}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-green-600">{formatPrice(product.price)}</div>
                            <button
                              onClick={() => removeItem(product.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                              title="Hapus dari keranjang"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center gap-3 bg-neutral-50 rounded-lg px-3 py-2">
                          <button onClick={() => updateQty(product.id, -1)} className="p-1 hover:bg-neutral-200 rounded transition-colors">
                            <Minus className="h-4 w-4 text-neutral-700" />
                          </button>
                          <span className="text-lg font-bold text-neutral-900 min-w-[32px] text-center">{qty}</span>
                          <button
                            onClick={() => updateQty(product.id, 1)}
                            disabled={qty >= product.stock}
                            className="p-1 hover:bg-neutral-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="h-4 w-4 text-neutral-700" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-neutral-500 mb-1">Subtotal</div>
                          <div className="text-lg font-bold text-neutral-900">{formatPrice(product.price * qty)}</div>
                        </div>
                      </div>

                      {qty >= product.stock && (
                        <div className="mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          <span className="text-xs text-amber-700 font-medium">Stok maksimal tercapai</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t bg-white px-6 py-4 space-y-4">
                <button
                  onClick={clearCart}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Kosongkan Keranjang</span>
                </button>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-neutral-600">
                    <span>Subtotal ({cartCount} item)</span>
                    <span className="font-semibold">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-600">
                    <span>Biaya Pengiriman</span>
                    <span className="font-semibold text-green-600">GRATIS</span>
                  </div>
                  <div className="pt-2 border-t-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-neutral-900">Total</span>
                    <span className="text-2xl font-bold text-green-600">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>Checkout Sekarang</span>
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        cartItems={cartItemsForCheckout}
        cartTotal={cartTotal}
        onCheckoutComplete={() => {
          clearCart();
          setCheckoutOpen(false);
        }}
      />
    </div>
  );
}
