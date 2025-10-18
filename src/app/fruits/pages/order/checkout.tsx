"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ShoppingCart,
  User,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Tag,
  Percent,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  image: string;
  stock: number;
}

interface CartItem {
  product: Product;
  qty: number;
}

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  cartTotal: number;
  onCheckoutComplete?: () => void;
}

const promoCodes = [
  { code: "BUAHSEGAR50", discount: 0.5, minPurchase: 100000, type: "percentage" },
  { code: "GRATIS30K", discount: 30000, minPurchase: 150000, type: "fixed" },
  { code: "IMPORTFRESH20", discount: 0.2, minPurchase: 200000, type: "percentage" },
  { code: "ORGANIK25", discount: 0.25, minPurchase: 175000, type: "percentage" }
];

export default function CheckoutDialog({
  open,
  onOpenChange,
  cartItems = [],
  cartTotal = 0,
  onCheckoutComplete
}: CheckoutDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    promoCode: ""
  });

  const [promoApplied, setPromoApplied] = useState<any>(null);
  const [promoError, setPromoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const discount = useMemo(() => {
    if (!promoApplied) return 0;
    if (promoApplied.type === "percentage") {
      return cartTotal * promoApplied.discount;
    }
    return promoApplied.discount;
  }, [promoApplied, cartTotal]);

  const finalTotal = useMemo(() => {
    return Math.max(0, cartTotal - discount);
  }, [cartTotal, discount]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const applyPromoCode = () => {
    const code = formData.promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError("Masukkan kode promo");
      return;
    }

    const promo = promoCodes.find(p => p.code === code);
    
    if (!promo) {
      setPromoError("Kode promo tidak valid");
      setPromoApplied(null);
      return;
    }

    if (cartTotal < promo.minPurchase) {
      setPromoError(`Minimal belanja ${formatPrice(promo.minPurchase)}`);
      setPromoApplied(null);
      return;
    }

    setPromoApplied(promo);
    setPromoError("");
  };

  const removePromo = () => {
    setPromoApplied(null);
    setPromoError("");
    setFormData(prev => ({ ...prev, promoCode: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi";
    } else if (!/^[0-9]{10,13}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "Nomor telepon tidak valid";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Alamat wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let message = `*PESANAN BARU - FRUITS STORE*\n\n`;
      message += `*Data Pembeli:*\n`;
      message += `Nama: ${formData.name}\n`;
      message += `Telepon: ${formData.phone}\n`;
      if (formData.email) message += `Email: ${formData.email}\n`;
      message += `Alamat: ${formData.address}\n`;
      if (formData.notes) message += `Catatan: ${formData.notes}\n`;
      message += `\n*Detail Pesanan:*\n`;
      
      cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.product.name}\n`;
        message += `   ${item.product.weight} x ${item.qty} = ${formatPrice(item.product.price * item.qty)}\n`;
      });

      message += `\n*Ringkasan:*\n`;
      message += `Subtotal: ${formatPrice(cartTotal)}\n`;
      
      if (promoApplied) {
        message += `Promo (${promoApplied.code}): -${formatPrice(discount)}\n`;
      }
      
      message += `Ongkir: GRATIS\n`;
      message += `*TOTAL: ${formatPrice(finalTotal)}*\n`;

      const whatsappNumber = "+6289510144492";
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");

      setTimeout(() => {
        setIsSubmitting(false);
        onOpenChange(false);
        if (onCheckoutComplete) {
          onCheckoutComplete();
        }
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          notes: "",
          promoCode: ""
        });
        setPromoApplied(null);
        setPromoError("");
      }, 1000);

    } catch (error) {
      setIsSubmitting(false);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="container max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-green-600 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <span>Checkout Pesanan</span>
          </DialogTitle>
          <DialogDescription>
            Lengkapi data Anda untuk menyelesaikan pesanan. Pesanan akan dikirim langsung ke WhatsApp kami.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-neutral-900">Data Pembeli</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-green-600" />
                Nama Lengkap <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                className={errors.name ? "border-red-500" : ""}
              />
              <p className="text-xs text-neutral-500">Nama sesuai identitas untuk pengiriman paket</p>
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                Nomor Telepon <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="08xx xxxx xxxx"
                className={errors.phone ? "border-red-500" : ""}
              />
              <p className="text-xs text-neutral-500">Nomor yang dapat dihubungi untuk konfirmasi pesanan dan pengiriman</p>
              {errors.phone && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-600" />
                Email (Opsional)
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              <p className="text-xs text-neutral-500">Email untuk menerima notifikasi dan invoice digital</p>
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                Alamat Lengkap <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota"
                rows={3}
                className={errors.address ? "border-red-500" : ""}
              />
              <p className="text-xs text-neutral-500">Alamat lengkap termasuk nama jalan, nomor rumah, RT/RW, dan patokan</p>
              {errors.address && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.address}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-green-600" />
                Catatan Pesanan (Opsional)
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Tambahkan catatan khusus untuk pesanan Anda"
                rows={2}
              />
              <p className="text-xs text-neutral-500">Permintaan khusus seperti waktu pengiriman atau instruksi tambahan</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-lg text-neutral-900">Kode Promo</h3>
            
            {!promoApplied ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      id="promoCode"
                      name="promoCode"
                      value={formData.promoCode}
                      onChange={handleInputChange}
                      placeholder="Masukkan kode promo"
                      className="uppercase"
                    />
                    {promoError && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {promoError}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Tag className="h-4 w-4" />
                    Terapkan
                  </button>
                </div>
                <p className="text-xs text-neutral-500">Masukkan kode promo untuk mendapatkan diskon spesial</p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-900">{promoApplied.code}</div>
                    <div className="text-sm text-green-700">Promo berhasil diterapkan!</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removePromo}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>

          <div className="space-y-3 p-4 bg-neutral-50 rounded-lg border">
            <h3 className="font-semibold text-neutral-900">Ringkasan Pesanan</h3>
            
            <div className="space-y-2 text-sm">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-neutral-600">
                    <span>{item.product.name} x{item.qty}</span>
                    <span>{formatPrice(item.product.price * item.qty)}</span>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 text-center py-2">Tidak ada item dalam keranjang</p>
              )}
            </div>

            <div className="pt-3 border-t space-y-2">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center gap-1">
                    <Percent className="h-4 w-4" />
                    Diskon Promo
                  </span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Ongkir</span>
                <span className="font-semibold text-green-600">GRATIS</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t-2">
                <span className="text-lg font-bold text-neutral-900">Total Bayar</span>
                <span className="text-2xl font-bold text-green-600">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || cartItems.length === 0}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Mengirim Pesanan...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-6 w-6" />
                <span>Kirim ke WhatsApp</span>
              </>
            )}
          </button>

          <p className="text-xs text-center text-neutral-500">
            Dengan melanjutkan, Anda setuju dengan syarat dan ketentuan kami
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}