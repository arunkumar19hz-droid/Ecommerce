// Premium Glassmorphic Sticky Header with Categorized Mega Menu
// File: frontend/components/Navbar.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const cartItems = useCartStore((state) => state.cartItems);
  const wishlistItems = useCartStore((state) => state.wishlistItems);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 heading-font">
            GROWX
          </span>
          <span className="text-[8px] tracking-[0.4em] uppercase text-gray-400 font-medium">FASHION</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden xl:flex items-center gap-8 text-xs font-bold tracking-wider uppercase text-gray-300">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>

          {/* MEN DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('men')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="hover:text-amber-400 transition-colors flex items-center gap-1">
              Men <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {activeDropdown === 'men' && (
              <div className="absolute top-full left-0 w-48 bg-black/95 border border-white/10 rounded-xl p-3 shadow-2xl space-y-2 mt-2">
                <Link href="/shop?category=men-shirts" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-amber-400 text-[11px]">Shirts</Link>
                <Link href="/shop?category=men-pants" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-amber-400 text-[11px]">Pants</Link>
                <Link href="/shop?category=men-baggy" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-amber-400 text-[11px]">Baggy</Link>
              </div>
            )}
          </div>

          {/* WOMEN DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('women')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="hover:text-amber-400 transition-colors flex items-center gap-1">
              Women <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {activeDropdown === 'women' && (
              <div className="absolute top-full left-0 w-48 bg-black/95 border border-white/10 rounded-xl p-3 shadow-2xl space-y-2 mt-2">
                <Link href="/shop?category=women-kurties" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-rose-400 text-[11px]">Kurties</Link>
                <Link href="/shop?category=women-tops" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-rose-400 text-[11px]">Tops & T-Shirts</Link>
                <Link href="/shop?category=women-baggy" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-rose-400 text-[11px]">Baggy</Link>
              </div>
            )}
          </div>

          <Link href="/shop?category=new-arrivals" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
            New Arrivals <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          </Link>
          <Link href="/shop?category=sale" className="text-rose-500 hover:text-rose-400 transition-colors font-extrabold">Sale</Link>
        </nav>

        {/* CONTROLS */}
        <div className="flex items-center gap-4">
          
          {/* SEARCH BAR */}
          <div className="relative hidden md:block w-48 lg:w-56">
            <input 
              type="text"
              placeholder="Search Men, Women, Kurties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-4 pr-10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
            />
            <Search className="absolute right-3.5 top-2 w-3.5 h-3.5 text-gray-400" />
          </div>

          {/* WISHLIST */}
          <Link href="/dashboard" className="relative p-2 rounded-full hover:bg-white/5 text-gray-300 hover:text-rose-400 transition-colors">
            <Heart className="w-5 h-5" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-[10px] text-white font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* SHOPPING BAG */}
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-white/5 text-gray-300 hover:text-amber-400 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-rose-500 text-[10px] text-black font-extrabold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* USER PROFILE */}
          <Link href="/dashboard" className="p-2 rounded-full hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-full hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROP-DOWN MENU */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-black border-t border-white/10 px-4 pt-4 pb-6 space-y-4 shadow-2xl">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-amber-400 tracking-widest block mb-1 uppercase">Men Collection</span>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold uppercase text-gray-300">
              <Link href="/shop?category=men-shirts" onClick={() => setIsMobileMenuOpen(false)} className="py-2 bg-white/5 rounded-lg hover:text-amber-400">Shirts</Link>
              <Link href="/shop?category=men-pants" onClick={() => setIsMobileMenuOpen(false)} className="py-2 bg-white/5 rounded-lg hover:text-amber-400">Pants</Link>
              <Link href="/shop?category=men-baggy" onClick={() => setIsMobileMenuOpen(false)} className="py-2 bg-white/5 rounded-lg hover:text-amber-400">Baggy</Link>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-rose-400 tracking-widest block mb-1 uppercase">Women Collection</span>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold uppercase text-gray-300">
              <Link href="/shop?category=women-kurties" onClick={() => setIsMobileMenuOpen(false)} className="py-2 bg-white/5 rounded-lg hover:text-rose-400">Kurties</Link>
              <Link href="/shop?category=women-tops" onClick={() => setIsMobileMenuOpen(false)} className="py-2 bg-white/5 rounded-lg hover:text-rose-400">Tops</Link>
              <Link href="/shop?category=women-baggy" onClick={() => setIsMobileMenuOpen(false)} className="py-2 bg-white/5 rounded-lg hover:text-rose-400">Baggy</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
