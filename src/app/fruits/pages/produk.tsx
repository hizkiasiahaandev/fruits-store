"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, Fragment } from "react";
import {
  Leaf, Heart, ShoppingCart, Star, Truck, Shield, Clock,
  RefreshCcw, RotateCcw, XCircle, History, Plus, Minus, Search
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { useShopStore } from "@/lib/store";

export default function Produk() {
  type Product = {
    id: number; name: string; price: number; image: string; category: string;
    badge: string; badgeColor: string; shortDesc: string; longDesc: string;
    rating: number; stock: number; weight: string; origin: string;
  };

  const base: Product[] = [
    { id: 1, name: "Mangga Harum Manis", price: 35000, image: "/mangga.jpg", category: "lokal", badge: "Terlaris", badgeColor: "bg-orange-500", shortDesc: "Mangga manis khas Indonesia dengan aroma harum", longDesc: "Mangga Harum Manis adalah varietas mangga unggulan Indonesia...", rating: 4.8, stock: 45, weight: "500g per buah", origin: "Indramayu, Jawa Barat" },
    { id: 2, name: "Jeruk Mandarin Premium", price: 28000, image: "/jeruk.jpg", category: "import", badge: "Premium", badgeColor: "bg-purple-500", shortDesc: "Jeruk manis tanpa biji dari kebun terpilih", longDesc: "Jeruk Mandarin Premium import langsung dari kebun terbaik...", rating: 4.9, stock: 60, weight: "1kg (8-10 buah)", origin: "China" },
    { id: 3, name: "Apel Fuji Organik", price: 45000, image: "/apel.jpg", category: "import", badge: "Organik", badgeColor: "bg-green-500", shortDesc: "Apel renyah bebas pestisida dengan rasa manis", longDesc: "Apel Fuji Organik ditanam tanpa pestisida kimia berbahaya...", rating: 4.7, stock: 30, weight: "1kg (4-5 buah)", origin: "Malang, Jawa Timur" },
    { id: 4, name: "Pisang Cavendish", price: 18000, image: "/pisang.jpg", category: "lokal", badge: "Promo", badgeColor: "bg-red-500", shortDesc: "Pisang manis berenergi tinggi untuk aktivitas", longDesc: "Pisang Cavendish adalah varietas pisang yang paling populer...", rating: 4.6, stock: 80, weight: "1kg (5-7 buah)", origin: "Lampung" },
    { id: 5, name: "Semangka Merah Manis", price: 25000, image: "/semangka.jpg", category: "lokal", badge: "Segar", badgeColor: "bg-blue-500", shortDesc: "Semangka super manis dan segar penuh air", longDesc: "Semangka Merah Manis dipilih langsung dari petani lokal...", rating: 4.8, stock: 25, weight: "3-4kg per buah", origin: "Banyuwangi, Jawa Timur" },
    { id: 6, name: "Alpukat Mentega", price: 32000, image: "/alpukat.jpg", category: "lokal", badge: "Fresh", badgeColor: "bg-emerald-500", shortDesc: "Alpukat lembut creamy kaya lemak sehat", longDesc: "Alpukat Mentega memiliki tekstur daging yang lembut dan creamy...", rating: 4.9, stock: 40, weight: "400-500g per buah", origin: "Bogor, Jawa Barat" },
    { id: 7, name: "Stroberi Organik", price: 55000, image: "/strowberi.jpg", category: "lokal", badge: "Premium", badgeColor: "bg-purple-500", shortDesc: "Stroberi manis asam segar dari dataran tinggi", longDesc: "Stroberi Organik premium dari perkebunan dataran tinggi Lembang...", rating: 4.9, stock: 20, weight: "250g per pack", origin: "Lembang, Bandung" },
    { id: 8, name: "Anggur Hijau Seedless", price: 65000, image: "/anggur.jpg", category: "import", badge: "Import", badgeColor: "bg-indigo-500", shortDesc: "Anggur tanpa biji manis renyah dan juicy", longDesc: "Anggur Hijau Seedless import premium tanpa biji...", rating: 4.8, stock: 35, weight: "500g per pack", origin: "Australia" },
    { id: 9, name: "Melon Golden Premium", price: 38000, image: "/melon.jpg", category: "lokal", badge: "Terlaris", badgeColor: "bg-orange-500", shortDesc: "Melon kuning manis dengan aroma harum khas", longDesc: "Melon Golden Premium dengan daging buah kuning keemasan...", rating: 4.7, stock: 28, weight: "1.5-2kg per buah", origin: "Semarang, Jawa Tengah" }
  ];

  const products: Product[] = useMemo(() => {
    const out: Product[] = [];
    for (let i = 0; i < 50; i++) {
      const b = base[i % base.length];
      const n = i + 1;
      out.push({
        ...b,
        id: n,
        name: `${b.name} ${n}`,
        price: Math.round(b.price * (0.9 + ((i % 7) * 0.02))),
        rating: Math.round((Math.min(4.9, Math.max(4.5, b.rating - 0.2 + ((i % 5) * 0.1)))) * 10) / 10,
        stock: Math.max(5, b.stock - (i % 9) * 3),
        badge: ["Terlaris", "Premium", "Organik", "Promo", "Segar", "Fresh", "Import"][i % 7],
        badgeColor: ["bg-orange-500", "bg-purple-500", "bg-green-500", "bg-red-500", "bg-blue-500", "bg-emerald-500", "bg-indigo-500"][i % 7],
      });
    }
    return out;
  }, []);

  const addToCart = useShopStore((s) => s.addToCart);
  const updateQty = useShopStore((s) => s.updateQty);
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);
  const cartMap = useShopStore((s) => s.cart);
  const wishlist = useShopStore((s) => s.wishlist);

  const wishedSet = useMemo(() => new Set<number>(wishlist ?? []), [wishlist]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("semua");
  const [sort, setSort] = useState<string>("terbaru");
  const [recentViews, setRecentViews] = useState<number[]>([]);
  const [showAddedAnimation, setShowAddedAnimation] = useState<number | null>(null);

  const pageSize = 21;
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [search, filter, sort]);

  useEffect(() => {
    if (showAddedAnimation !== null) {
      const timer = setTimeout(() => setShowAddedAnimation(null), 1200);
      return () => clearTimeout(timer);
    }
  }, [showAddedAnimation]);

  const handleAdd = (p: Product) => {
    addToCart(p);
    setShowAddedAnimation(p.id);
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setRecentViews((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 5);
    });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchQ = q === "" || p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q);
      const matchFilter =
        filter === "semua" ? true : filter === "promo" ? p.badge.toLowerCase() === "promo" : p.category === filter;
      return matchQ && matchFilter;
    });
  }, [products, search, filter]);

  const sorted = useMemo(() => {
    const arr = [...filteredList];
    if (sort === "termurah") arr.sort((a, b) => a.price - b.price);
    else if (sort === "termahal") arr.sort((a, b) => b.price - a.price);
    else if (sort === "terlaris") arr.sort((a, b) => b.rating - a.rating);
    else if (sort === "rating-rendah") arr.sort((a, b) => a.rating - b.rating);
    else if (sort === "a-z") arr.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "z-a") arr.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "stok-tinggi") arr.sort((a, b) => b.stock - a.stock);
    else arr.sort((a, b) => b.id - a.id);
    return arr;
  }, [filteredList, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageItems = useMemo(() => sorted.slice((page - 1) * pageSize, page * pageSize), [sorted, page, pageSize]);

  const pagesToShow = useMemo(() => {
    const res: number[] = [];
    const max = totalPages;
    const window = 1;
    for (let i = 1; i <= max; i++) {
      if (i === 1 || i === max || (i >= page - window && i <= page + window)) res.push(i);
    }
    return res;
  }, [page, totalPages]);

  const resetFilters = () => {
    setSearch("");
    setFilter("semua");
    setSort("terbaru");
    setPage(1);
  };

  const recentProducts = useMemo(() => {
    return recentViews.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
  }, [recentViews, products]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <section id="produk" className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
                <Leaf className="h-4 w-4" />
                <span>Segar Dari Kebun Langsung</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">Buah-buahan Segar</h2>
              <p className="text-neutral-600 mt-2">
                Dipetik langsung dari kebun pilihan — segar, manis, dan siap memanjakan lidahmu.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  id="search-input-buah"
                  type="search"
                  placeholder="Cari buah favorit"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 pl-10 bg-white border border-neutral-200"
                  autoComplete="off"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-[140px] bg-white border border-neutral-200 rounded-lg">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua</SelectItem>
                  <SelectItem value="lokal">Lokal</SelectItem>
                  <SelectItem value="import">Import</SelectItem>
                  <SelectItem value="promo">Promo</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-full sm:w-[160px] bg-white border border-neutral-200 rounded-lg">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terbaru">Terbaru</SelectItem>
                  <SelectItem value="termurah">Harga Terendah</SelectItem>
                  <SelectItem value="termahal">Harga Tertinggi</SelectItem>
                  <SelectItem value="terlaris">Rating Tertinggi</SelectItem>
                  <SelectItem value="rating-rendah">Rating Terendah</SelectItem>
                  <SelectItem value="a-z">Nama A-Z</SelectItem>
                  <SelectItem value="z-a">Nama Z-A</SelectItem>
                  <SelectItem value="stok-tinggi">Stok Terbanyak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(search || filter !== "semua") && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-neutral-600">Filter aktif:</span>
              {search && (
                <Badge variant="secondary" className="gap-1">
                  Pencarian: "{search}"
                  <button onClick={() => setSearch("")} className="ml-1 hover:bg-neutral-300 rounded-full">
                    <XCircle className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filter !== "semua" && (
                <Badge variant="secondary" className="gap-1">
                  {filter}
                  <button onClick={() => setFilter("semua")} className="ml-1 hover:bg-neutral-300 rounded-full">
                    <XCircle className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <button onClick={resetFilters} className="text-sm text-red-600 hover:text-red-700 font-medium">
                Reset Semua
              </button>
            </div>
          )}

          {recentViews.length > 0 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 text-neutral-600 text-sm font-medium whitespace-nowrap">
                <History className="h-4 w-4" />
                <span>Terakhir Dilihat:</span>
              </div>
              <div className="flex gap-2">
                {recentProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => viewProduct(p)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-neutral-200 rounded-lg hover:border-green-300 transition-all whitespace-nowrap"
                  >
                    <div className="w-8 h-8 relative rounded overflow-hidden">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <span className="text-sm font-medium">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24">
            <div className="h-14 w-14 rounded-full bg-neutral-100 grid place-content-center mb-4">
              <RefreshCcw className="h-7 w-7 text-neutral-500" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">Tidak ada hasil pencarian</h3>
            <p className="text-neutral-600 max-w-md mb-6">Coba ganti kata kunci, ubah kategori, atau reset filter untuk melihat produk yang tersedia.</p>
            <div className="flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex items-center shadow-lg gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filter
              </button>
              <button
                onClick={() => setSearch("")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition"
              >
                <XCircle className="w-4 h-4" />
                Hapus Pencarian
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((product) => {
                const inCartQty = cartMap[product.id]?.qty || 0;
                const wished = wishedSet.has(product.id);
                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-lg border-2 hover:-translate-y-2 border-neutral-100 hover:border-green-200 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <button onClick={() => viewProduct(product)} className="w-full">
                        <div className="relative w-full h-56">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                            priority={product.id <= 6}
                          />
                        </div>
                      </button>
                      <Badge className={`absolute top-3 left-3 ${product.badgeColor} text-white border-0`}>
                        {product.badge}
                      </Badge>
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 ${wished ? "text-red-500" : "text-neutral-400"}`}
                        >
                          <Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
                        </button>
                      </div>
                      {showAddedAnimation === product.id && (
                        <div className="absolute inset-0 bg-green-600/80 flex items-center justify-center animate-in fade-in zoom-in duration-200">
                          <div className="bg-white rounded-full p-4">
                            <ShoppingCart className="h-8 w-8 text-green-600" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-green-600 transition-colors">
                            {search ? highlightText(product.name, search) : product.name}
                          </h3>
                          <p className="text-sm text-neutral-600 line-clamp-2">
                            {search ? highlightText(product.shortDesc, search) : product.shortDesc}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-neutral-700">{product.rating.toFixed(1)}</span>
                        <span className="text-sm text-neutral-500">• Stok: {product.stock}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="text-2xl font-bold text-green-600">{formatPrice(product.price)}</div>
                          <div className="text-xs text-neutral-500">per {product.weight.split(" ")[0]}</div>
                        </div>
                        {inCartQty > 0 ? (
                          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border-2 border-green-200 rounded-lg">
                            <button onClick={() => updateQty(product.id, -1)} className="p-1 hover:bg-green-200 rounded transition-colors">
                              <Minus className="h-4 w-4 text-green-700" />
                            </button>
                            <span className="text-lg font-bold text-green-700 min-w-[24px] text-center">
                              {inCartQty}
                            </span>
                            <button
                              onClick={() => updateQty(product.id, 1)}
                              disabled={inCartQty >= product.stock}
                              className="p-1 hover:bg-green-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-4 w-4 text-green-700" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAdd(product)}
                            disabled={product.stock === 0}
                            className="flex items-center gap-2 px-4 py-2.5 shadow-lg bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Tambah</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-neutral-600">
                Menampilkan {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} dari {sorted.length} produk
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); }}
                      aria-disabled={page === 1}
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {pagesToShow.map((pIdx, i) => {
                    const prev = pagesToShow[i - 1];
                    const needDots = i > 0 && pIdx - (prev || 0) > 1;
                    return (
                      <Fragment key={`grp-${pIdx}`}>
                        {needDots && (
                          <PaginationItem key={`dots-${pIdx}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem key={`page-${pIdx}`}>
                          <PaginationLink
                            href="#"
                            isActive={pIdx === page}
                            onClick={(e) => { e.preventDefault(); setPage(pIdx); }}
                          >
                            {pIdx}
                          </PaginationLink>
                        </PaginationItem>
                      </Fragment>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(totalPages, p + 1)); }}
                      aria-disabled={page === totalPages}
                      className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}

        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="container max-h-[90vh] overflow-y-auto">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-neutral-900 pr-6">
                    {selectedProduct.name}
                  </DialogTitle>
                  <DialogDescription className="text-neutral-600">
                    {selectedProduct.shortDesc}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative rounded-lg overflow-hidden">
                    <div className="relative w-full h-66">
                      <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
                    </div>
                    <Badge className={`absolute top-3 left-3 ${selectedProduct.badgeColor} text-white border-0`}>
                      {selectedProduct.badge}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                          <span className="text-lg font-bold text-neutral-900">
                            {selectedProduct.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-neutral-500">•</span>
                        <span className="text-sm text-neutral-600">Stok tersedia: {selectedProduct.stock}</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-4">
                        <div className="text-3xl font-bold text-green-600">
                          {formatPrice(selectedProduct.price)}
                        </div>
                        <span className="text-sm text-neutral-500">/ {selectedProduct.weight}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                        <Truck className="h-5 w-5 text-green-600 mb-1" />
                        <span className="text-xs text-neutral-600 text-center">Pengiriman Cepat</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                        <Shield className="h-5 w-5 text-blue-600 mb-1" />
                        <span className="text-xs text-neutral-600 text-center">Produk Terjamin</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg">
                        <Clock className="h-5 w-5 text-amber-600 mb-1" />
                        <span className="text-xs text-neutral-600 text-center">Segar Setiap Hari</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleWishlist(selectedProduct.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 ${wishedSet.has(selectedProduct.id) ? "border-red-500 bg-red-50 text-red-500" : "border-neutral-200 hover:border-red-300 text-neutral-400 hover:text-red-500"}`}
                      >
                        <Heart className={`h-5 w-5 ${wishedSet.has(selectedProduct.id) ? "fill-current" : ""}`} />
                      </button>
                      {cartMap[selectedProduct.id]?.qty ? (
                        <div className="flex-1 flex items-center justify-between gap-3 px-4 py-3 bg-green-50 border-2 border-green-300 rounded-lg">
                          <button onClick={() => updateQty(selectedProduct.id, -1)} className="p-2 hover:bg-green-200 rounded-lg transition-colors">
                            <Minus className="h-5 w-5 text-green-700" />
                          </button>
                          <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-green-700">
                              {cartMap[selectedProduct.id]?.qty}
                            </span>
                          </div>
                          <button
                            onClick={() => updateQty(selectedProduct.id, 1)}
                            disabled={(cartMap[selectedProduct.id]?.qty || 0) >= selectedProduct.stock}
                            className="p-2 hover:bg-green-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="h-5 w-5 text-green-700" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAdd(selectedProduct)}
                          disabled={selectedProduct.stock === 0}
                          className="flex-1 flex items-center justify-center shadow-lg gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          <span>{selectedProduct.stock === 0 ? "Stok Habis" : "Tambah"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-t pt-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">Deskripsi Produk</h3>
                    <p className="text-neutral-600 leading-relaxed">{selectedProduct.longDesc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <div className="text-sm text-neutral-500 mb-1">Berat</div>
                      <div className="font-semibold text-neutral-900">{selectedProduct.weight}</div>
                    </div>
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <div className="text-sm text-neutral-500 mb-1">Asal</div>
                      <div className="font-semibold text-neutral-900">{selectedProduct.origin}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}