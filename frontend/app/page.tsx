// Next.js 15 Highly Interactive Landing Page
// File: frontend/app/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useCartStore } from '../store/useCartStore';
import { ArrowRight, Sparkles, Shirt, ShieldCheck, Truck, ShoppingBag, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  compare_at_price?: number;
  images: string[];
  brand: string;
  fabric: string;
  sizes: string[];
  colors: string[];
  category_id: string;
  slug: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Local state for interactive sizes selected on the homepage cards
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  // Zustand Store Hooks
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wishlistItems = useCartStore((state) => state.wishlistItems);

  useEffect(() => {
    // Fallback list of their beautiful flat-lays to show directly on the homepage
    const fallbackList: Product[] = [
      {
        id: "prod_men_1",
        name: "Men's Premium Burgundy Plaid Flannel Outfit Set",
        price: 1899,
        compare_at_price: 2499,
        images: ["/images/products/men_outfit_1.jpg"],
        brand: "GrowX Premium",
        fabric: "Premium Flannel",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Beige", "White"],
        category_id: "men-shirts",
        slug: "mens-luxury-burgundy-plaid-flannel-shirt-set"
      },
      {
        id: "prod_women_1",
        name: "Women's Lucknowi Handloom Premium Purple Suit Set",
        price: 1999,
        compare_at_price: 2699,
        images: ["/images/products/photo_26_2026-07-10_11-19-21.jpg"],
        brand: "GrowX Ethnic",
        fabric: "Premium Handloom Cotton",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Lilac"],
        category_id: "women-kurties",
        slug: "womens-lucknowi-handloom-premium-purple-suit"
      },
      {
        id: "prod_men_7",
        name: "Men's Classic Camel Tan Ribbed Polo & Chino",
        price: 1699,
        compare_at_price: 2299,
        images: ["/images/products/men_outfit_7.jpg"],
        brand: "GrowX Polo",
        fabric: "Knit Yarn",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Beige"],
        category_id: "men-pants",
        slug: "mens-classic-camel-tan-ribbed-polo"
      },
      {
        id: "prod_women_15",
        name: "Women's Burgundy Collar Resort Co-Ord Set",
        price: 1699,
        compare_at_price: 2199,
        images: ["/images/products/photo_40_2026-07-10_11-19-21.jpg"],
        brand: "GrowX Co-Ords",
        fabric: "Linen Viscose Blend",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Burgundy"],
        category_id: "women-baggy",
        slug: "womens-burgundy-collar-resort-co-ord"
      }
    ];

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'https://growx-fashion-backend.onrender.com/api/v1';
    fetch(`${apiURL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products.slice(0, 4));
        } else {
          setProducts(fallbackList);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("DB Fetch failed, loading local mapped catalog:", err);
        setProducts(fallbackList);
        setLoading(false);
      });
  }, []);

  const handleSizeClick = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.id];
    if (!size) {
      alert(`Please select a Size (S, M, L, XL) for ${product.name} first!`);
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: size,
      color: product.colors[0] || 'Default',
      quantity: 1,
      image: product.images[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop'
    });

    alert(`✓ Successfully added 1x ${product.name} (Size: ${size}) to your Bag!`);
  };

  return (
    <div className="relative min-h-screen pb-16">
      <Navbar />

      {/* Main Luxury Banner */}
      <section className="pt-32 pb-16 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-amber-400/10 text-amber-400 rounded-full border border-amber-400/20 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            GrowX Fashion • varunexa Enterprise
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none uppercase">
            UPGRADE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500">YOUR STYLE.</span>
          </h1>
          <p className="text-sm text-gray-400 font-light max-w-md leading-relaxed">
            Discover our handpicked **Men's Plaid Flannels, Ribbed Knit Polos** & **Women's Chikankari, Cotton Kurties, and Luxury Co-Ords** directly on our custom-styled layout.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="px-8 py-4 bg-white text-black font-extrabold text-xs uppercase hover:bg-amber-400 transition-all rounded-full flex items-center gap-2 shadow-xl">
              Shop Men Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/shop" className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-extrabold text-xs uppercase transition-all rounded-full">
              Shop Women Collection
            </Link>
          </div>
        </div>

        <div className="relative h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: `url('/images/products/men_outfit_1.jpg')` }}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl">
            <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest">Featured Men Outfit Set</p>
            <h3 className="text-base font-bold text-white uppercase">Burgundy Plaid Flannel & Beige Chinos</h3>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DIRECT SHOPPING SECTION */}
      <section className="px-4 max-w-7xl mx-auto py-12 space-y-8">
        <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Shop Direct From Homepage</h2>
            <p className="text-xs text-gray-400">Select your size and add to cart in one click—no navigation needed!</p>
          </div>
          <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-amber-400 hover:underline flex items-center gap-1">
            View All 65 Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => {
            const isWishlisted = wishlistItems.includes(p.id);
            const activeSize = selectedSizes[p.id] || '';
            const discount = Math.round(((p.compare_at_price! - p.price) / p.compare_at_price!) * 100);

            return (
              <div key={p.id} className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-[1.01] transition-all flex flex-col justify-between p-4 space-y-4">
                
                {/* Image & Badges */}
                <div className="relative h-64 rounded-2xl overflow-hidden bg-black/40">
                  <img src={p.images[0]} className="w-full h-full object-cover" alt={p.name} />
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                    {discount}% OFF
                  </span>
                  <button 
                    onClick={() => toggleWishlist(p.id)}
                    className="absolute top-3 right-3 p-2 bg-black/60 rounded-full text-white hover:text-rose-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-300'}`} />
                  </button>
                </div>

                {/* Product Metadata */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase block">{p.brand} • {p.fabric}</span>
                  <h4 className="text-xs font-bold line-clamp-1 uppercase text-white">{p.name}</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-amber-400">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs line-through text-gray-500">₹{p.compare_at_price?.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* INTERACTIVE SIZE SELECTOR DIRECT ON HOMEPAGE CARD */}
                <div className="space-y-2">
                  <span className="text-[9px] text-gray-400 font-black uppercase block">Select Size:</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {p.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSizeClick(p.id, s)}
                        className={`py-1.5 rounded text-[10px] font-black border uppercase transition-all ${
                          activeSize === s 
                            ? 'bg-amber-400 text-black border-amber-400 shadow-lg' 
                            : 'border-white/10 text-gray-400 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ADD TO BAG TRIGGER */}
                <button
                  onClick={() => handleAddToCart(p)}
                  className={`w-full py-3.5 rounded-xl font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all shadow-md ${
                    activeSize 
                      ? 'bg-white text-black hover:bg-amber-400 shadow-xl' 
                      : 'bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {activeSize ? 'Add To Bag' : 'Choose Size First'}
                </button>

              </div>
            );
          })}
        </div>
      </section>

      {/* Secure Transactions & Free Payments Advantage Section */}
      <section className="px-4 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-start gap-4">
            <div className="p-3.5 bg-amber-400/10 text-amber-400 rounded-2xl border border-amber-400/20">
              <Shirt className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">Premium Lucknowi Fabrics</h4>
              <p className="text-xs text-gray-400 pt-1">Traditional hand-loomed Chikankari, cottons, and flannel sets.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-start gap-4">
            <div className="p-3.5 bg-rose-500/10 text-rose-500 rounded-2xl border border-rose-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">Free Payment Gateway</h4>
              <p className="text-xs text-gray-400 pt-1">Configured for free secure sandbox testing via Stripe & Razorpay.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-start gap-4">
            <div className="p-3.5 bg-indigo-500/10 text-indigo-500 rounded-2xl border border-indigo-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">BlueDart Salem Shipping</h4>
              <p className="text-xs text-gray-400 pt-1">Dispatched locally from Salem, Tamil Nadu with free shipping above ₹1500.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
