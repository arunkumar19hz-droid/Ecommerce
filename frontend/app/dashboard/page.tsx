// Next.js 15 User Profile Dashboard
// File: frontend/app/dashboard/page.tsx

"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useCartStore } from '../../store/useCartStore';
import { User, Package, Heart, Tag, Bell, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const wishlistItems = useCartStore((state) => state.wishlistItems);

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <div className="pt-28 px-4 max-w-7xl mx-auto space-y-8">
        
        {/* Profile Card Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full flex items-center justify-center font-black text-black text-xl shadow-lg">
              VS
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-wider uppercase">Varun Sharma</h2>
              <p className="text-[10px] text-gray-400">Premium Circle Member • ID: u_743912</p>
            </div>
          </div>
          <button onClick={() => alert('Logged out successfully!')} className="px-5 py-2 border border-rose-500/20 hover:border-rose-500 text-rose-500 rounded-lg text-xs font-bold uppercase transition-all">
            Logout
          </button>
        </div>

        {/* Dashboard sub layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Side Menu */}
          <div className="space-y-2 lg:sticky lg:top-28">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                activeTab === 'orders' ? 'bg-amber-400 text-black' : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <Package className="w-4 h-4" />
              Order Tracking
            </button>

            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                activeTab === 'wishlist' ? 'bg-amber-400 text-black' : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <Heart className="w-4 h-4" />
              Wishlist ({wishlistItems.length})
            </button>

            <button 
              onClick={() => setActiveTab('coupons')}
              className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                activeTab === 'coupons' ? 'bg-amber-400 text-black' : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <Tag className="w-4 h-4" />
              My Coupons
            </button>

            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                activeTab === 'notifications' ? 'bg-amber-400 text-black' : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <Bell className="w-4 h-4" />
              Alerts Inbox
            </button>
          </div>

          {/* Sub Panels */}
          <div className="lg:col-span-3">
            
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-xs font-black tracking-widest uppercase border-b border-white/5 pb-2">Live Shipment Tracking</h3>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
                    <div>Order Ref: <span className="font-bold text-amber-400">GOWX-A91B4C</span></div>
                    <div className="text-gray-400 font-bold">Placed: 2026-07-09</div>
                  </div>
                  
                  {/* Delivery progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
                      <span>Placed</span>
                      <span className="text-amber-400">Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full w-[45%]" />
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-2 flex-wrap gap-2 text-xs border-t border-white/5">
                    <div className="flex gap-2">
                      <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=100&auto=format&fit=crop" className="w-10 h-12 object-cover rounded" alt="" />
                      <div>
                        <h4 className="font-bold text-white text-xs">Linen Luxury Shirt</h4>
                        <p className="text-[10px] text-gray-400">Size: M • Qty: 1</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-white text-sm">₹1,899.00</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h3 className="text-xs font-black tracking-widest uppercase border-b border-white/5 pb-2">Your Saved Collection</h3>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12 text-xs text-gray-400 bg-white/5 border border-white/5 rounded-2xl">
                    You have not saved any luxury items yet. Browse our Men's and Women's folders!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistItems.map((id) => (
                      <div key={id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex justify-between items-center">
                        <span className="text-xs font-bold uppercase">Product Ref: {id}</span>
                        <Link href="/shop" className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1">
                          View Item 
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'coupons' && (
              <div className="space-y-4">
                <h3 className="text-xs font-black tracking-widest uppercase border-b border-white/5 pb-2">Active Wallet Promo Codes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-amber-400/20 bg-amber-400/5 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Active</span>
                    <h4 className="text-base font-extrabold text-amber-400">GROWX20</h4>
                    <p className="text-xs text-gray-300 font-light">Get 20% off site-wide on luxury shirts and cargo pants. No min purchase.</p>
                  </div>

                  <div className="border border-indigo-500/20 bg-indigo-500/5 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">Active</span>
                    <h4 className="text-base font-extrabold text-indigo-400">VARUNEXA50</h4>
                    <p className="text-xs text-gray-300 font-light">Special varunexa developer coupon! Get ₹1000 flat discount on purchases above ₹3000.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h3 className="text-xs font-black tracking-widest uppercase border-b border-white/5 pb-2">Your Alerts</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex gap-3">
                    <span className="text-amber-400 font-bold">📢</span>
                    <div>
                      <h4 className="text-xs font-bold">Early Access: Summer linen drop tomorrow!</h4>
                      <p className="text-[11px] text-gray-400 pt-0.5">Prepare for original linen additions arriving 9 AM. Cart sizes sell fast.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
