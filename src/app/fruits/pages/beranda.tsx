"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Leaf, Clock, Award, Star, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function Beranda() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

    const features = [
        {
            icon: Leaf,
            title: "100% Organik",
            desc: "Buah-buahan tanpa pestisida berbahaya",
            color: "bg-green-500",
        },
        {
            icon: Clock,
            title: "Pengiriman Cepat",
            desc: "Diantar dalam 2-4 jam di area kota",
            color: "bg-orange-500",
        },
        {
            icon: Award,
            title: "Harga Terjangkau",
            desc: "Kualitas premium dengan harga bersahabat",
            color: "bg-purple-500",
        },
    ];

    const images = [
        "/melon.jpg",
        "/alpukat.jpg",
        "/anggur.jpg",
        "/mangga.jpg",
        "/jeruk.jpg",
        "/semangka.jpg",
        "/apel.jpg",
    ];

    return (
        <section id="beranda" className="relative overflow-hidden pt-22 bg-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNTgwM2QiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

            <div className="relative mx-auto max-w-7xl px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                            <Leaf className="h-4 w-4" />
                            <span>Segar Dari Kebun Langsung</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight">
                            Kesegaran Alami
                            <span className="block text-green-600">Untuk Keluarga Sehat</span>
                        </h1>

                        <p className="text-lg sm:text-base text-neutral-600 leading-relaxed max-w-xl">
                            Pilihan buah tropis terbaik dipetik saat matang sempurna. Nikmati vitamin dan nutrisi maksimal dalam setiap gigitan untuk hidup lebih sehat.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => {
                                    const section = document.querySelector("#produk");
                                    section?.scrollIntoView();
                                }}
                                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-lg transition-all duration-300"
                            >
                                <span>Pesan Sekarang</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => {
                                    const section = document.querySelector("#produk");
                                    section?.scrollIntoView();
                                }}
                                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-900 rounded-lg font-semibold border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-300"
                            >
                                Katalog Buah
                            </button>
                        </div>

                        <div className="flex items-center gap-6 pt-4">
                            <div>
                                <div className="text-3xl font-bold text-neutral-900">2.5K+</div>
                                <div className="text-sm text-neutral-600">Order Selesai</div>
                            </div>
                            <div className="h-12 w-px bg-neutral-300"></div>
                            <div>
                                <div className="text-3xl font-bold text-neutral-900">80+</div>
                                <div className="text-sm text-neutral-600">Varietas Buah</div>
                            </div>
                            <div className="h-12 w-px bg-neutral-300"></div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <span className="text-3xl font-bold text-neutral-900">4.8</span>
                                    <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                                </div>
                                <div className="text-sm text-neutral-600">Kepuasan</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>

                        <Carousel
                            className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-neutral-100"
                            plugins={[plugin.current]}
                            opts={{ loop: true }}
                        >
                            <CarouselContent>
                                {images.map((src, idx) => (
                                    <CarouselItem key={idx} className="basis-full">
                                        <div className="relative w-full h-[480px]">
                                            <Image
                                                src={src}
                                                alt="Fresh tropical fruits"
                                                fill
                                                priority={idx === 0}
                                                sizes="(min-width:1024px) 50vw, 100vw"
                                                className="object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                                <div className="text-white">
                                                    <div className="text-2xl font-bold mb-1">Buah Tropis Premium</div>
                                                    <div className="text-white/90">Dipetik fresh setiap hari</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6 mt-16">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setHoveredCard(i)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className={`relative bg-white rounded-lg p-6 border-2 transition-all duration-300 ${hoveredCard === i ? "border-green-300 shadow-lg -translate-y-2" : "border-neutral-100 shadow-md"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`${feature.color} h-12 w-12 rounded-lg flex items-center justify-center text-white shadow-lg`}>
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-neutral-900 mb-1">{feature.title}</h3>
                                    <p className="text-sm text-neutral-600">{feature.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}