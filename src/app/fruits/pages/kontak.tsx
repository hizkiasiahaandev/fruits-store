"use client"
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Kontak() {

    const socialMedia = [
        { icon: Facebook, name: "Facebook", handle: "@freshfruit.id", color: "hover:bg-blue-600", link: "#" },
        { icon: Instagram, name: "Instagram", handle: "@freshfruit.id", color: "hover:bg-pink-600", link: "#" },
        { icon: Twitter, name: "Twitter", handle: "@freshfruit_id", color: "hover:bg-sky-600", link: "#" },
        { icon: MessageCircle, name: "WhatsApp", handle: "+62 812-3456-7890", color: "hover:bg-green-600", link: "#" }
    ]

    return (
        <section id="kontak" className="relative overflow-hidden bg-gradient-to-b from-white to-green-50">

            <div className="max-w-7xl mx-auto px-4 py-16 relative">

                <div className="text-center mb-12">
                    <Badge className="inline-flex items-center mb-4 gap-2 bg-green-100 text-green-700 border-0 px-4 py-2 rounded-full text-sm font-medium">
                        <MessageCircle className="h-4 w-4" />
                        Hubungi Kami
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                        Ada Pertanyaan? Yuk Ngobrol!
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Tim kami siap membantu Anda. Kirimkan pesan atau hubungi kami langsung melalui kontak di bawah ini.
                    </p>
                </div>




                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Terhubung dengan Kami</h3>
                        <p className="text-green-100">Ikuti media sosial kami untuk update produk dan promo menarik!</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {socialMedia.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 border border-white/20 ${social.color}`}
                            >
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <social.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm">{social.name}</p>
                                    <p className="text-xs text-green-100 truncate">{social.handle}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}