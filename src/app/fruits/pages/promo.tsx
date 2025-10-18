"use client"

import { useState } from "react"
import { Tag, Copy, Check, Gift, Percent, Clock, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Promo() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    const promos = [
        {
            id: 1,
            code: "BUAHSEGAR50",
            discount: "50%",
            title: "Diskon 50% Buah Lokal",
            description: "Dapatkan diskon hingga 50% untuk semua buah lokal pilihan",
            minPurchase: "Minimal belanja Rp 100.000",
            validUntil: "31 Des 2025",
            badge: "Terpopuler",
            badgeColor: "bg-orange-500",
            bgGradient: "from-orange-500 to-red-500"
        },
        {
            id: 2,
            code: "GRATIS30K",
            discount: "Rp 30K",
            title: "Gratis Ongkir Rp 30.000",
            description: "Bebas biaya pengiriman untuk pembelian pertama kamu",
            minPurchase: "Minimal belanja Rp 150.000",
            validUntil: "25 Okt 2025",
            badge: "Terbatas",
            badgeColor: "bg-red-500",
            bgGradient: "from-blue-500 to-cyan-500"
        },
        {
            id: 3,
            code: "IMPORTFRESH20",
            discount: "20%",
            title: "Diskon Buah Import Premium",
            description: "Nikmati diskon 20% untuk semua buah import pilihan",
            minPurchase: "Minimal belanja Rp 200.000",
            validUntil: "15 Nov 2025",
            badge: "Premium",
            badgeColor: "bg-purple-500",
            bgGradient: "from-purple-500 to-pink-500"
        },
        {
            id: 4,
            code: "ORGANIK25",
            discount: "25%",
            title: "Diskon Buah Organik",
            description: "Hemat 25% untuk produk organik segar dan sehat",
            minPurchase: "Minimal belanja Rp 175.000",
            validUntil: "30 Okt 2025",
            badge: "Organik",
            badgeColor: "bg-green-500",
            bgGradient: "from-green-500 to-emerald-500"
        }
    ]

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code)
        setCopiedCode(code)
        setTimeout(() => setCopiedCode(null), 2000)
    }

    return (
        <section id="promo" className="relative overflow-hidden bg-white">


            <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                        <Sparkles className="h-4 w-4" />
                        <span>Penawaran Spesial Hari Ini</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
                        Promo & Kode Diskon
                    </h2>
                    <p className="text-neutral-600 max-w-lg mx-auto">
                        Jangan lewatkan penawaran menarik! Gunakan kode promo di bawah untuk hemat lebih banyak
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className="group relative bg-white rounded-lg border-2 border-neutral-100 hover:border-green-200 overflow-hidden transition-all duration-300  hover:-translate-y-2"
                        >

                            <div className={`relative h-32 bg-gradient-to-br ${promo.bgGradient} p-6 flex items-center justify-between`}>
                                <div className="relative z-10">
                                    <Badge className={`${promo.badgeColor} text-white border-0 mb-2`}>
                                        {promo.badge}
                                    </Badge>
                                    <div className="text-4xl font-bold text-white mb-1">
                                        {promo.discount}
                                    </div>
                                    <div className="text-white/90 text-sm font-medium">OFF</div>
                                </div>
                                <div className="relative z-10">
                                    <Gift className="h-16 w-16 text-white/20" />
                                </div>

                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                            </div>


                            <div className="p-6">
                                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-green-600 transition-colors">
                                    {promo.title}
                                </h3>
                                <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                                    {promo.description}
                                </p>


                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                                        <Tag className="h-4 w-4 text-green-600" />
                                        <span>{promo.minPurchase}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                                        <Clock className="h-4 w-4 text-amber-600" />
                                        <span>Berlaku hingga {promo.validUntil}</span>
                                    </div>
                                </div>


                                <div className="flex items-center gap-3">
                                    <div className="flex-1 px-4 py-3 bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-lg">
                                        <div className="text-xs text-neutral-500 mb-1">Kode Promo</div>
                                        <div className="text-lg font-bold text-neutral-900 tracking-wide">
                                            {promo.code}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => copyCode(promo.code)}
                                        className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center gap-2 group"
                                    >
                                        {copiedCode === promo.code ? (
                                            <>
                                                <Check className="h-4 w-4" />
                                                <span className="hidden sm:inline">Tersalin</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-4 w-4" />
                                                <span className="hidden sm:inline">Salin</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    )
}