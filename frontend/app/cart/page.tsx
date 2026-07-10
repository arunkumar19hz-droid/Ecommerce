// Next.js 15 Shopping Cart Page
// File: frontend/app/cart/page.tsx

"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useCartStore } from '../../store/useCartStore';
import { ShoppingBag, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';

export default function Cart() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getCartSubtotal, 
    getDiscountAmount, 
    getCartTotal, 
    appliedCoupon, 
    applyCoupon 
  } = useCartStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const subtotal = getCartSubtotal();
  const discount = getDiscountAmount();
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 1500 ? 0 : 100;
  const total = getCartTotal();

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'GROWX20') {
      applyCoupon({ code: 'GROWX20', discountType: 'percentage', value: 20 });
      setCouponMsg('✓ Promo code GROWX20 applied! Saved 20% on subtotal.');
    } else if (code === 'VARUNEXA50') {
      applyCoupon({ code: 'VARUNEXA50', discountType: 'fixed_amount', value: 1000 });
      setCouponMsg('✓ Special varunexa developer coupon applied! Saved ₹1000 flat.');
    } else {
      setCouponMsg('✗ Invalid Promo Code. Try GROWX20 or VARUNEXA50.');
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <div className="pt-28 px-4 max-w-7xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="border-b border-white/10 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase">Your Shopping Bag</h1>
          <p className="text-xs text-gray-400">Securely review and configure your design pieces before checkout.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 bg-white/5 border border-white/5 rounded-3xl space-y-4 max-w-2xl mx-auto">
            <ShoppingBag className="w-12 h-12 text-gray-500 mx-auto" />
            <h2 className="text-base font-bold uppercase tracking-wider">Your bag is empty</h2>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">Discover luxury linens, original cotton track pants, and custom collections online.</p>
            <Link href="/shop" className="inline-block px-6 py-2.5 bg-white text-black text-xs font-bold uppercase rounded-full hover:bg-amber-400 transition-all">
              Go To Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex gap-4 items-center justify-between flex-wrap sm:flex-nowrap">
                  <div className="flex gap-4 items-center">
                    <img src={item.image} className="w-12 h-14 object-cover rounded-lg" alt="" />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase">Shade: {item.color} • Size: {item.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between w-full sm:w-auto">
                    {/* Quantity Controls */}
                    <div className="flex border border-white/10 rounded-lg overflow-hidden w-20">
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="flex-grow py-1 text-center text-xs hover:bg-white/5 font-extrabold">-</button>
                      <span className="flex-grow py-1 text-center text-xs font-bold bg-white/5">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="flex-grow py-1 text-center text-xs hover:bg-white/5 font-extrabold">+</button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-amber-400 block">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="text-[10px] text-rose-500 hover:underline">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Calculations Column */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-6">
              <h3 className="text-xs font-black tracking-widest uppercase border-b border-white/10 pb-3">Order Summary</h3>
              
              {/* Coupon Row */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-amber-400" />
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. GROWX20" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow bg-white/5 border border-white/10 rounded-lg text-xs py-2 px-3 focus:outline-none focus:border-amber-400 text-white uppercase font-bold tracking-wider" 
                  />
                  <button onClick={handleApplyCoupon} className="px-4 py-2 bg-white text-black text-xs font-black tracking-wider uppercase rounded-lg hover:bg-amber-400 transition-all">Apply</button>
                </div>
                {couponMsg && <p className="text-[10px] text-emerald-400 font-semibold">{couponMsg}</p>}
              </div>

              {/* Price Calculations */}
              <div className="space-y-3 text-xs border-y border-white/5 py-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Discount:</span>
                  <span className="text-emerald-400 font-bold">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax (18% standard):</span>
                  <span className="font-bold">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery Cost:</span>
                  <span className="font-bold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">TOTAL:</span>
                <span className="text-lg font-black text-amber-400">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <Link href="/checkout" className="w-full py-4 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 text-black font-black tracking-widest text-xs uppercase hover:brightness-110 transition-all rounded-xl shadow-2xl flex items-center justify-center gap-2">
                Checkout 
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2 text-[10px] text-gray-400 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Payments fully secured via Stripe & Razorpay
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
