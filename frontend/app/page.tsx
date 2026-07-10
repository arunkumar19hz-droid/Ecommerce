// Next.js 15 Landing Page
// File: frontend/app/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { ArrowRight, Sparkles, Shirt, ShieldCheck, Truck } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  compare_at_price?: number;
  images: string[];
  brand: string;
  fabric: string;
  slug: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch active collections from the live Render FastAPI backend
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'https://growx-fashion-backend.onrender.com/api/v1';
    fetch(`${apiURL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products.slice(0, 4));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to connect to Render API:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative min-h-screen pb-16">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="pt-32 pb-16 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-amber-400/10 text-amber-400 rounded-full border border-amber-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            Luxurious Streetwear Collection
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none">
            UPGRADE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500">YOUR STYLE.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 font-light max-w-md">
            Experience the finest selections of Turkish linen, oversized baggy cuts, athletic tracks, and luxury staples tailored for varunexa circle.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3.5 bg-white text-black font-extrabold text-xs uppercase hover:bg-amber-400 transition-all rounded-full flex items-center gap-2">
              Explore Store
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-extrabold text-xs uppercase transition-all rounded-full">
              New Releases
            </button>
          </div>
        </div>

        <div className="relative h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 max-w-7xl mx-auto py-12 space-y-8">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-widest uppercase">Featured Catalog</h2>
          <p className="text-xs text-gray-400 pt-1">Directly syncs and updates live from your Supabase server</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 h-80 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="relative h-60 bg-black/40">
                  <img 
                    src={p.images[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop'} 
                    className="w-full h-full object-cover" 
                    alt={p.name} 
                  />
                </div>
                <div className="p-4 space-y-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{p.brand} • {p.fabric}</p>
                  <h4 className="text-xs font-bold line-clamp-1">{p.name}</h4>
                  <div className="pt-2">
                    <span className="text-sm font-black text-amber-400">₹{p.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-white/5 bg-white/5 rounded-2xl">
            <p className="text-xs text-gray-400">No active products found. Use your live Admin Dashboard to launch collections!</p>
          </div>
        )}
      </section>

      {/* Advantages Banner */}
      <section className="px-4 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">100% Original Cotton</h4>
              <p className="text-xs text-gray-400 pt-1">Premium certified Turkish linen and high-thread cottons.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Secure Transactions</h4>
              <p className="text-xs text-gray-400 pt-1">Protected checkout processing via Stripe and Razorpay integrations.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">BlueDart Express shipping</h4>
              <p className="text-xs text-gray-400 pt-1">Dispatching out of Salem, Tamil Nadu with free delivery on ₹1500+ order values.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
