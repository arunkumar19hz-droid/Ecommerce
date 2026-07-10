// Next.js 15 Checkout Page
// File: frontend/app/checkout/page.tsx

"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useCartStore } from '../../store/useCartStore';
import { ShieldCheck, Truck, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCartStore();
  const [shippingMethod, setShippingMethod] = useState('razorpay');
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const [fname, setFname] = useState('Varun');
  const [lname, setLname] = useState('Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [street, setStreet] = useState('102, Varunexa Luxury Enclave, Block-C');
  const [city, setCity] = useState('Salem');
  const [state, setState] = useState('Tamil Nadu');
  const [postal, setPostal] = useState('636001');

  const total = getCartTotal();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street || !phone) {
      alert("Please enter street address and contact phone number!");
      return;
    }
    
    // Simulate successful order placement with ref
    const ref = "GOWX-" + Math.floor(100000 + Math.random() * 900000);
    setOrderRef(ref);
    setIsSuccess(true);
    clearCart();
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <div className="pt-28 px-4 max-w-7xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="border-b border-white/10 pb-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase">GrowX Secure Checkout</h1>
          <p className="text-xs text-gray-400">Transactions are encrypted and authenticated with Supabase Auth</p>
        </div>

        {isSuccess ? (
          <div className="text-center bg-white/5 border border-white/5 max-w-lg mx-auto rounded-3xl p-10 space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl">✓</div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-wider uppercase">Order Placed Successfully!</h2>
              <p className="text-xs text-gray-400">Thank you for your order! We are packing your premium streetwear items.</p>
            </div>
            <div className="border-y border-white/5 py-4 text-xs space-y-2 text-left max-w-xs mx-auto">
              <div className="flex justify-between"><span className="text-gray-400">Order Ref:</span><span className="font-bold text-white">{orderRef}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Payment Gateway:</span><span className="font-bold text-amber-400 uppercase">{shippingMethod}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Shipment Status:</span><span className="font-bold text-white">BlueDart Express (3-5 Days)</span></div>
            </div>
            <div className="flex gap-4 max-w-sm mx-auto">
              <Link href="/dashboard" className="flex-grow py-3 bg-white text-black text-xs font-black tracking-wider uppercase rounded-xl hover:bg-amber-400 text-center">Track Order</Link>
              <Link href="/" className="flex-grow py-3 bg-white/5 border border-white/10 text-white text-xs font-black tracking-wider uppercase rounded-xl hover:bg-white/10 text-center">Keep Shopping</Link>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xs text-gray-400">Please add garments to your cart first.</p>
            <Link href="/shop" className="inline-block mt-4 px-6 py-2 bg-white text-black text-xs font-bold uppercase rounded-lg">Browse Collections</Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Shipment Details */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xs font-black tracking-widest uppercase border-b border-white/10 pb-3 text-white">1. Shipping & Contact</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">First Name</label>
                  <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">Last Name</label>
                  <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-bold uppercase">Phone Number</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-bold uppercase">Street Address</label>
                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs text-white" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">City</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">State</label>
                  <input type="text" value={state} onChange={(e) => setState(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">Postal Code</label>
                  <input type="text" value={postal} onChange={(e) => setPostal(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs text-white" />
                </div>
              </div>
            </div>

            {/* Right Column: Payment Gateway */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xs font-black tracking-widest uppercase border-b border-white/10 pb-3 text-white">2. Payment Gateway</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setShippingMethod('razorpay')}
                  className={`p-4 border-2 rounded-2xl cursor-pointer text-center space-y-2 transition-all ${
                    shippingMethod === 'razorpay' ? 'border-amber-400 bg-amber-400/5' : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  <h4 className="text-xs font-black">RAZORPAY</h4>
                  <p className="text-[10px] text-gray-400">UPI, Netbanking, Cards, EMI</p>
                </div>

                <div 
                  onClick={() => setShippingMethod('stripe')}
                  className={`p-4 border-2 rounded-2xl cursor-pointer text-center space-y-2 transition-all ${
                    shippingMethod === 'stripe' ? 'border-amber-400 bg-amber-400/5' : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  <h4 className="text-xs font-black">STRIPE</h4>
                  <p className="text-[10px] text-gray-400">International Debit/Credit Cards</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery Provider:</span>
                  <span className="font-bold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    BlueDart Express Tracked
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total payable:</span>
                  <span className="text-sm font-black text-amber-400">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-gradient-to-r from-amber-400 to-rose-500 text-black font-black tracking-widest text-xs uppercase hover:scale-[1.02] transition-all rounded-xl shadow-2xl flex items-center justify-center gap-2">
                Place Order Now
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[10px] text-gray-400 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Payments fully secured via SSL encryption
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
