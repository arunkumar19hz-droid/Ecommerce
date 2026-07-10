// Next.js 15 Shop Collection Page with Horizontal Top Filter Bar
// File: frontend/app/shop/page.tsx

"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Navbar from '../../components/Navbar';
import { useCartStore } from '../../store/useCartStore';
import { Search, SlidersHorizontal, Heart, ShoppingBag, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

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
  category_id?: string;
  slug: string;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const fabricParam = searchParams.get('fabric') || '';
  const tagParam = searchParams.get('tag') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [searchQuery, setSearchQuery] = useState(tagParam || '');

  // Zustand Store
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wishlistItems = useCartStore((state) => state.wishlistItems);

  useEffect(() => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'https://growx-fashion-backend.onrender.com/api/v1';
    fetch(`${apiURL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          // Fallback to our beautiful local flat-lay assets
          const localMapped = fallbackProducts.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            compare_at_price: p.compare_at_price,
            images: [p.live_image],
            brand: p.brand,
            fabric: p.fabric,
            sizes: p.sizes,
            colors: p.colors,
            category_id: p.category,
            slug: p.slug
          }));
          setProducts(localMapped);
          setFilteredProducts(localMapped);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed fetching from DB, loading beautiful flat-lay local catalog:", err);
        const localMapped = fallbackProducts.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          compare_at_price: p.compare_at_price,
          images: [p.live_image],
          brand: p.brand,
          fabric: p.fabric,
          sizes: p.sizes,
          colors: p.colors,
          category_id: p.category,
          slug: p.slug
        }));
        setProducts(localMapped);
        setFilteredProducts(localMapped);
        setLoading(false);
      });
  }, []);

  // Filter application trigger
  useEffect(() => {
    let result = [...products];

    // Category filtering
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category_id === selectedCategory || p.slug.includes(selectedCategory));
    }

    // Size filtering
    if (selectedSize) {
      result = result.filter(p => p.sizes && p.sizes.includes(selectedSize));
    }

    // Color filtering
    if (selectedColor) {
      result = result.filter(p => p.colors && p.colors.includes(selectedColor));
    }

    // Max Price filtering
    result = result.filter(p => p.price <= maxPrice);

    // Search query matching
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.fabric.toLowerCase().includes(q)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedSize, selectedColor, maxPrice, searchQuery, products]);

  const handleQuickAdd = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: 'M',
      color: product.colors[0] || 'Default',
      quantity: 1,
      image: product.images[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop'
    });
    alert(`Added ${product.name} (Size: M) to your bag successfully!`);
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <div className="pt-28 px-4 max-w-7xl mx-auto space-y-8">
        
        {/* Title */}
        <div className="border-b border-white/10 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase">GrowX Luxury Shop</h1>
          <p className="text-xs text-gray-400">Discover premium designer cuts optimized for urban silhouettes.</p>
        </div>

        {/* SLEEK HORIZONTAL TOP FILTER BAR */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-4">
            
            {/* 1. Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase whitespace-nowrap">Folder:</span>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-black border border-white/10 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Folders</option>
                <optgroup label="Men Collections" className="bg-black text-amber-400">
                  <option value="men-shirts" className="text-white">Men Shirts</option>
                  <option value="men-pants" className="text-white">Men Pants</option>
                  <option value="men-baggy" className="text-white">Men Baggy</option>
                </optgroup>
                <optgroup label="Women Collections" className="bg-black text-rose-400">
                  <option value="women-kurties" className="text-white">Women Kurties</option>
                  <option value="women-tops" className="text-white">Women Tops</option>
                  <option value="women-baggy" className="text-white">Women Baggy</option>
                </optgroup>
              </select>
            </div>

            {/* 2. Size Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase whitespace-nowrap">Size:</span>
              <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <button 
                    key={s}
                    onClick={() => setSelectedSize(selectedSize === s ? '' : s)}
                    className={`w-7 h-7 text-[10px] font-bold rounded transition-all uppercase ${
                      selectedSize === s ? 'bg-amber-400 text-black' : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Price Filter */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase whitespace-nowrap">Max Price:</span>
              <input 
                type="range" 
                min="500" 
                max="5000" 
                step="100" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="accent-amber-400 bg-white/10 rounded-lg cursor-pointer h-1 w-24 sm:w-32" 
              />
              <span className="text-[11px] text-amber-400 font-bold whitespace-nowrap">₹{maxPrice}</span>
            </div>

          </div>

          {/* Active Filter Badges */}
          {(selectedSize || selectedCategory !== 'all' || searchQuery) && (
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSize('');
                setSearchQuery('');
              }}
              className="flex items-center gap-1.5 text-[10px] text-rose-500 font-bold hover:underline uppercase self-start md:self-auto"
            >
              Clear Filters <X className="w-3.5 h-3.5" />
            </button>
          )}

        </div>

        {/* SPACIOUS 4-COLUMN PRODUCT GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 h-80 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform relative group flex flex-col justify-between">
                <div className="relative h-64 bg-black/40">
                  <img 
                    src={p.images[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop'} 
                    className="w-full h-full object-cover" 
                    alt={p.name} 
                  />
                  <button 
                    onClick={() => toggleWishlist(p.id)}
                    className="absolute top-3 right-3 p-2 bg-black/60 rounded-full text-white hover:text-rose-500 hover:bg-black transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wishlistItems.includes(p.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-300'}`} />
                  </button>
                </div>
                <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{p.brand} • {p.fabric}</p>
                    <h4 className="text-xs font-bold line-clamp-1">{p.name}</h4>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-sm font-black text-amber-400">₹{p.price.toLocaleString('en-IN')}</span>
                    <button 
                      onClick={() => handleQuickAdd(p)}
                      className="p-2 bg-white text-black hover:bg-amber-400 hover:text-black transition-all rounded-full"
                      title="Quick Add To Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/5 border border-white/5 rounded-3xl space-y-4">
            <Search className="w-12 h-12 text-gray-500 mx-auto" />
            <h3 className="text-sm font-bold">No Collections found matching filters</h3>
            <p className="text-xs text-gray-400">Try broadening your search metrics or category fields.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="text-center pt-32 text-gray-400">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}



// Mapped local flat-lay outfit catalogue as fallback

const fallbackProducts = [
        {
                "id": "prod_men_1",
                "name": "Men's Premium Ribbed Knit Polo & Trouser Outfit (Set 1)",
                "slug": "mens-premium-ribbed-knit-polo-and-trouser-outfit-set-1",
                "price": 1599.0,
                "compare_at_price": 2079,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_10_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_10_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Knit Cotton",
                "brand": "GrowX Knitwear",
                "rating": 4.5,
                "reviewsCount": 10,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": true
        },
        {
                "id": "prod_men_2",
                "name": "Men's Premium Ribbed Knit Polo & Trouser Outfit (Set 2)",
                "slug": "mens-premium-ribbed-knit-polo-and-trouser-outfit-set-2",
                "price": 1599.0,
                "compare_at_price": 2079,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_11_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_11_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Knit Cotton",
                "brand": "GrowX Knitwear",
                "rating": 4.6,
                "reviewsCount": 13,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_3",
                "name": "Men's Premium Ribbed Knit Polo & Trouser Outfit (Set 3)",
                "slug": "mens-premium-ribbed-knit-polo-and-trouser-outfit-set-3",
                "price": 1599.0,
                "compare_at_price": 2079,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_12_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_12_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Knit Cotton",
                "brand": "GrowX Knitwear",
                "rating": 4.7,
                "reviewsCount": 16,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_4",
                "name": "Men's Premium Ribbed Knit Polo & Trouser Outfit (Set 4)",
                "slug": "mens-premium-ribbed-knit-polo-and-trouser-outfit-set-4",
                "price": 1599.0,
                "compare_at_price": 2079,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_13_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_13_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Knit Cotton",
                "brand": "GrowX Knitwear",
                "rating": 4.8,
                "reviewsCount": 19,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_5",
                "name": "Men's Premium Ribbed Knit Polo & Trouser Outfit (Set 5)",
                "slug": "mens-premium-ribbed-knit-polo-and-trouser-outfit-set-5",
                "price": 1599.0,
                "compare_at_price": 2079,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_14_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_14_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Knit Cotton",
                "brand": "GrowX Knitwear",
                "rating": 4.9,
                "reviewsCount": 22,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_6",
                "name": "Men's Oxford Tailored Long-Sleeve Outfit (Set 6)",
                "slug": "mens-oxford-tailored-long-sleeve-outfit-set-6",
                "price": 1799.0,
                "compare_at_price": 2339,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_15_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_15_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Oxford Cotton",
                "brand": "GrowX Tailored",
                "rating": 5.0,
                "reviewsCount": 25,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": false
        },
        {
                "id": "prod_men_7",
                "name": "Men's Oxford Tailored Long-Sleeve Outfit (Set 7)",
                "slug": "mens-oxford-tailored-long-sleeve-outfit-set-7",
                "price": 1799.0,
                "compare_at_price": 2339,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_16_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_16_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Oxford Cotton",
                "brand": "GrowX Tailored",
                "rating": 4.5,
                "reviewsCount": 28,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_8",
                "name": "Men's Oxford Tailored Long-Sleeve Outfit (Set 8)",
                "slug": "mens-oxford-tailored-long-sleeve-outfit-set-8",
                "price": 1799.0,
                "compare_at_price": 2339,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_17_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_17_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Oxford Cotton",
                "brand": "GrowX Tailored",
                "rating": 4.6,
                "reviewsCount": 31,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_9",
                "name": "Men's Oxford Tailored Long-Sleeve Outfit (Set 9)",
                "slug": "mens-oxford-tailored-long-sleeve-outfit-set-9",
                "price": 1799.0,
                "compare_at_price": 2339,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_18_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_18_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Oxford Cotton",
                "brand": "GrowX Tailored",
                "rating": 4.7,
                "reviewsCount": 34,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_10",
                "name": "Men's Oxford Tailored Long-Sleeve Outfit (Set 10)",
                "slug": "mens-oxford-tailored-long-sleeve-outfit-set-10",
                "price": 1799.0,
                "compare_at_price": 2339,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_19_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_19_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Oxford Cotton",
                "brand": "GrowX Tailored",
                "rating": 4.8,
                "reviewsCount": 37,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_11",
                "name": "Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 11)",
                "slug": "mens-luxury-plaid-flannel-shirt-and-chino-combo-set-11",
                "price": 1899.0,
                "compare_at_price": 2469,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_1_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_1_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Premium Flannel",
                "brand": "GrowX Premium",
                "rating": 4.9,
                "reviewsCount": 40,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": false
        },
        {
                "id": "prod_men_12",
                "name": "Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 12)",
                "slug": "mens-luxury-plaid-flannel-shirt-and-chino-combo-set-12",
                "price": 1899.0,
                "compare_at_price": 2469,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_2026-07-10_10-20-11.jpg",
                "live_image": "/images/products/photo_2026-07-10_10-20-11.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Premium Flannel",
                "brand": "GrowX Premium",
                "rating": 5.0,
                "reviewsCount": 43,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_13",
                "name": "Men's Oxford Tailored Long-Sleeve Outfit (Set 13)",
                "slug": "mens-oxford-tailored-long-sleeve-outfit-set-13",
                "price": 1799.0,
                "compare_at_price": 2339,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_20_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_20_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Oxford Cotton",
                "brand": "GrowX Tailored",
                "rating": 4.5,
                "reviewsCount": 46,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_14",
                "name": "Men's Oxford Tailored Long-Sleeve Outfit (Set 14)",
                "slug": "mens-oxford-tailored-long-sleeve-outfit-set-14",
                "price": 1799.0,
                "compare_at_price": 2339,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_21_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_21_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Oxford Cotton",
                "brand": "GrowX Tailored",
                "rating": 4.6,
                "reviewsCount": 49,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_15",
                "name": "Men's Oxford Tailored Long-Sleeve Outfit (Set 15)",
                "slug": "mens-oxford-tailored-long-sleeve-outfit-set-15",
                "price": 1799.0,
                "compare_at_price": 2339,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_22_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_22_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Oxford Cotton",
                "brand": "GrowX Tailored",
                "rating": 4.7,
                "reviewsCount": 52,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_16",
                "name": "Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 16)",
                "slug": "mens-graphic-dragon-and-streetwear-baggy-tee-set-set-16",
                "price": 1299.0,
                "compare_at_price": 1689,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_23_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_23_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Heavyweight Cotton",
                "brand": "GrowX Streetwear",
                "rating": 4.8,
                "reviewsCount": 10,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": true
        },
        {
                "id": "prod_men_17",
                "name": "Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 17)",
                "slug": "mens-graphic-dragon-and-streetwear-baggy-tee-set-set-17",
                "price": 1299.0,
                "compare_at_price": 1689,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_24_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_24_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Heavyweight Cotton",
                "brand": "GrowX Streetwear",
                "rating": 4.9,
                "reviewsCount": 13,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_18",
                "name": "Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 18)",
                "slug": "mens-graphic-dragon-and-streetwear-baggy-tee-set-set-18",
                "price": 1299.0,
                "compare_at_price": 1689,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_25_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_25_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Heavyweight Cotton",
                "brand": "GrowX Streetwear",
                "rating": 5.0,
                "reviewsCount": 16,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_19",
                "name": "Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 19)",
                "slug": "mens-graphic-dragon-and-streetwear-baggy-tee-set-set-19",
                "price": 1299.0,
                "compare_at_price": 1689,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_26_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_26_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Heavyweight Cotton",
                "brand": "GrowX Streetwear",
                "rating": 4.5,
                "reviewsCount": 19,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_20",
                "name": "Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 20)",
                "slug": "mens-graphic-dragon-and-streetwear-baggy-tee-set-set-20",
                "price": 1299.0,
                "compare_at_price": 1689,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_27_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_27_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Heavyweight Cotton",
                "brand": "GrowX Streetwear",
                "rating": 4.6,
                "reviewsCount": 22,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_21",
                "name": "Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 21)",
                "slug": "mens-graphic-dragon-and-streetwear-baggy-tee-set-set-21",
                "price": 1299.0,
                "compare_at_price": 1689,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_28_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_28_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Heavyweight Cotton",
                "brand": "GrowX Streetwear",
                "rating": 4.7,
                "reviewsCount": 25,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": false
        },
        {
                "id": "prod_men_22",
                "name": "Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 22)",
                "slug": "mens-graphic-dragon-and-streetwear-baggy-tee-set-set-22",
                "price": 1299.0,
                "compare_at_price": 1689,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_29_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_29_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Heavyweight Cotton",
                "brand": "GrowX Streetwear",
                "rating": 4.8,
                "reviewsCount": 28,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_23",
                "name": "Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 23)",
                "slug": "mens-luxury-plaid-flannel-shirt-and-chino-combo-set-23",
                "price": 1899.0,
                "compare_at_price": 2469,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_2_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_2_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Premium Flannel",
                "brand": "GrowX Premium",
                "rating": 4.9,
                "reviewsCount": 31,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_24",
                "name": "Men's Graphic Dragon & Streetwear Baggy Tee Set (Set 24)",
                "slug": "mens-graphic-dragon-and-streetwear-baggy-tee-set-set-24",
                "price": 1299.0,
                "compare_at_price": 1689,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_30_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_30_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Heavyweight Cotton",
                "brand": "GrowX Streetwear",
                "rating": 5.0,
                "reviewsCount": 34,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_25",
                "name": "Men's Minimalist Linen Summer Oversized Set (Set 25)",
                "slug": "mens-minimalist-linen-summer-oversized-set-set-25",
                "price": 1499.0,
                "compare_at_price": 1949,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_31_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_31_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Organic Linen",
                "brand": "GrowX Resort",
                "rating": 4.5,
                "reviewsCount": 37,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_26",
                "name": "Men's Minimalist Linen Summer Oversized Set (Set 26)",
                "slug": "mens-minimalist-linen-summer-oversized-set-set-26",
                "price": 1499.0,
                "compare_at_price": 1949,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_32_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_32_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Organic Linen",
                "brand": "GrowX Resort",
                "rating": 4.6,
                "reviewsCount": 40,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": false
        },
        {
                "id": "prod_men_27",
                "name": "Men's Minimalist Linen Summer Oversized Set (Set 27)",
                "slug": "mens-minimalist-linen-summer-oversized-set-set-27",
                "price": 1499.0,
                "compare_at_price": 1949,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_33_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_33_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Organic Linen",
                "brand": "GrowX Resort",
                "rating": 4.7,
                "reviewsCount": 43,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_28",
                "name": "Men's Minimalist Linen Summer Oversized Set (Set 28)",
                "slug": "mens-minimalist-linen-summer-oversized-set-set-28",
                "price": 1499.0,
                "compare_at_price": 1949,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_34_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_34_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Organic Linen",
                "brand": "GrowX Resort",
                "rating": 4.8,
                "reviewsCount": 46,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_29",
                "name": "Men's Minimalist Linen Summer Oversized Set (Set 29)",
                "slug": "mens-minimalist-linen-summer-oversized-set-set-29",
                "price": 1499.0,
                "compare_at_price": 1949,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_35_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_35_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Organic Linen",
                "brand": "GrowX Resort",
                "rating": 4.9,
                "reviewsCount": 49,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_30",
                "name": "Men's Minimalist Linen Summer Oversized Set (Set 30)",
                "slug": "mens-minimalist-linen-summer-oversized-set-set-30",
                "price": 1499.0,
                "compare_at_price": 1949,
                "category": "men-baggy",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_36_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_36_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Organic Linen",
                "brand": "GrowX Resort",
                "rating": 5.0,
                "reviewsCount": 52,
                "tags": [
                        "men-baggy",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_31",
                "name": "Men's Urban Street Classic Plaid Outfit Combo (Set 31)",
                "slug": "mens-urban-street-classic-plaid-outfit-combo-set-31",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "men-pants",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_37_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_37_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Flannel & Denim",
                "brand": "GrowX Originals",
                "rating": 4.5,
                "reviewsCount": 10,
                "tags": [
                        "men-pants",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": true
        },
        {
                "id": "prod_men_32",
                "name": "Men's Urban Street Classic Plaid Outfit Combo (Set 32)",
                "slug": "mens-urban-street-classic-plaid-outfit-combo-set-32",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "men-pants",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_38_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_38_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Flannel & Denim",
                "brand": "GrowX Originals",
                "rating": 4.6,
                "reviewsCount": 13,
                "tags": [
                        "men-pants",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_33",
                "name": "Men's Urban Street Classic Plaid Outfit Combo (Set 33)",
                "slug": "mens-urban-street-classic-plaid-outfit-combo-set-33",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "men-pants",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_39_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_39_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Flannel & Denim",
                "brand": "GrowX Originals",
                "rating": 4.7,
                "reviewsCount": 16,
                "tags": [
                        "men-pants",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_34",
                "name": "Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 34)",
                "slug": "mens-luxury-plaid-flannel-shirt-and-chino-combo-set-34",
                "price": 1899.0,
                "compare_at_price": 2469,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_3_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_3_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Premium Flannel",
                "brand": "GrowX Premium",
                "rating": 4.8,
                "reviewsCount": 19,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_35",
                "name": "Men's Urban Street Classic Plaid Outfit Combo (Set 35)",
                "slug": "mens-urban-street-classic-plaid-outfit-combo-set-35",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "men-pants",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_40_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_40_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Flannel & Denim",
                "brand": "GrowX Originals",
                "rating": 4.9,
                "reviewsCount": 22,
                "tags": [
                        "men-pants",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_36",
                "name": "Men's Urban Street Classic Plaid Outfit Combo (Set 36)",
                "slug": "mens-urban-street-classic-plaid-outfit-combo-set-36",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "men-pants",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_41_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_41_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Flannel & Denim",
                "brand": "GrowX Originals",
                "rating": 5.0,
                "reviewsCount": 25,
                "tags": [
                        "men-pants",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": false
        },
        {
                "id": "prod_men_37",
                "name": "Men's Urban Street Classic Plaid Outfit Combo (Set 37)",
                "slug": "mens-urban-street-classic-plaid-outfit-combo-set-37",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "men-pants",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_42_2026-07-10_10-23-49.jpg",
                "live_image": "/images/products/photo_42_2026-07-10_10-23-49.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Flannel & Denim",
                "brand": "GrowX Originals",
                "rating": 4.5,
                "reviewsCount": 28,
                "tags": [
                        "men-pants",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_38",
                "name": "Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 38)",
                "slug": "mens-luxury-plaid-flannel-shirt-and-chino-combo-set-38",
                "price": 1899.0,
                "compare_at_price": 2469,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_4_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_4_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Premium Flannel",
                "brand": "GrowX Premium",
                "rating": 4.6,
                "reviewsCount": 31,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_39",
                "name": "Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 39)",
                "slug": "mens-luxury-plaid-flannel-shirt-and-chino-combo-set-39",
                "price": 1899.0,
                "compare_at_price": 2469,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_5_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_5_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Premium Flannel",
                "brand": "GrowX Premium",
                "rating": 4.7,
                "reviewsCount": 34,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_40",
                "name": "Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 40)",
                "slug": "mens-luxury-plaid-flannel-shirt-and-chino-combo-set-40",
                "price": 1899.0,
                "compare_at_price": 2469,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_6_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_6_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Premium Flannel",
                "brand": "GrowX Premium",
                "rating": 4.8,
                "reviewsCount": 37,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_men_41",
                "name": "Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 41)",
                "slug": "mens-luxury-plaid-flannel-shirt-and-chino-combo-set-41",
                "price": 1899.0,
                "compare_at_price": 2469,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_7_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_7_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Premium Flannel",
                "brand": "GrowX Premium",
                "rating": 4.9,
                "reviewsCount": 40,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": false
        },
        {
                "id": "prod_men_42",
                "name": "Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 42)",
                "slug": "mens-luxury-plaid-flannel-shirt-and-chino-combo-set-42",
                "price": 1899.0,
                "compare_at_price": 2469,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_8_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_8_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Premium Flannel",
                "brand": "GrowX Premium",
                "rating": 5.0,
                "reviewsCount": 43,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_men_43",
                "name": "Men's Luxury Plaid Flannel Shirt & Chino Combo (Set 43)",
                "slug": "mens-luxury-plaid-flannel-shirt-and-chino-combo-set-43",
                "price": 1899.0,
                "compare_at_price": 2469,
                "category": "men-shirts",
                "gender": "men",
                "image": "./frontend/public/images/products/photo_9_2026-07-10_10-23-48.jpg",
                "live_image": "/images/products/photo_9_2026-07-10_10-23-48.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Black",
                        "White",
                        "Beige",
                        "Blue"
                ],
                "fabric": "Premium Flannel",
                "brand": "GrowX Premium",
                "rating": 4.5,
                "reviewsCount": 46,
                "tags": [
                        "men-shirts",
                        "men",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_women_1",
                "name": "Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 1)",
                "slug": "womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-1",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "women-kurties",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_26_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_26_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Premium Handloom Cotton",
                "brand": "GrowX Ethnic",
                "rating": 4.6,
                "reviewsCount": 15,
                "tags": [
                        "women-kurties",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": true
        },
        {
                "id": "prod_women_2",
                "name": "Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 2)",
                "slug": "womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-2",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "women-kurties",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_27_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_27_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Premium Handloom Cotton",
                "brand": "GrowX Ethnic",
                "rating": 4.7,
                "reviewsCount": 19,
                "tags": [
                        "women-kurties",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_women_3",
                "name": "Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 3)",
                "slug": "womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-3",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "women-kurties",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_28_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_28_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Premium Handloom Cotton",
                "brand": "GrowX Ethnic",
                "rating": 4.8,
                "reviewsCount": 23,
                "tags": [
                        "women-kurties",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_women_4",
                "name": "Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 4)",
                "slug": "womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-4",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "women-kurties",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_30_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_30_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Premium Handloom Cotton",
                "brand": "GrowX Ethnic",
                "rating": 4.9,
                "reviewsCount": 27,
                "tags": [
                        "women-kurties",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_women_5",
                "name": "Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 5)",
                "slug": "womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-5",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "women-kurties",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_32_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_32_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Premium Handloom Cotton",
                "brand": "GrowX Ethnic",
                "rating": 5.0,
                "reviewsCount": 31,
                "tags": [
                        "women-kurties",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": true
        },
        {
                "id": "prod_women_6",
                "name": "Women's Lucknowi Handloom Premium Kurti & Dupatta Set (Set 6)",
                "slug": "womens-lucknowi-handloom-premium-kurti-and-dupatta-set-set-6",
                "price": 1999.0,
                "compare_at_price": 2599,
                "category": "women-kurties",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_33_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_33_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Premium Handloom Cotton",
                "brand": "GrowX Ethnic",
                "rating": 4.6,
                "reviewsCount": 35,
                "tags": [
                        "women-kurties",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_women_7",
                "name": "Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 7)",
                "slug": "womens-classic-linen-minimalist-lounge-co-ord-set-set-7",
                "price": 1699.0,
                "compare_at_price": 2209,
                "category": "women-baggy",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_34_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_34_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Linen Viscose Blend",
                "brand": "GrowX Co-Ords",
                "rating": 4.7,
                "reviewsCount": 39,
                "tags": [
                        "women-baggy",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_women_8",
                "name": "Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 8)",
                "slug": "womens-classic-linen-minimalist-lounge-co-ord-set-set-8",
                "price": 1699.0,
                "compare_at_price": 2209,
                "category": "women-baggy",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_35_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_35_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Linen Viscose Blend",
                "brand": "GrowX Co-Ords",
                "rating": 4.8,
                "reviewsCount": 43,
                "tags": [
                        "women-baggy",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_women_9",
                "name": "Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 9)",
                "slug": "womens-classic-linen-minimalist-lounge-co-ord-set-set-9",
                "price": 1699.0,
                "compare_at_price": 2209,
                "category": "women-baggy",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_36_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_36_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Linen Viscose Blend",
                "brand": "GrowX Co-Ords",
                "rating": 4.9,
                "reviewsCount": 47,
                "tags": [
                        "women-baggy",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": true
        },
        {
                "id": "prod_women_10",
                "name": "Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 10)",
                "slug": "womens-classic-linen-minimalist-lounge-co-ord-set-set-10",
                "price": 1699.0,
                "compare_at_price": 2209,
                "category": "women-baggy",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_37_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_37_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Linen Viscose Blend",
                "brand": "GrowX Co-Ords",
                "rating": 5.0,
                "reviewsCount": 16,
                "tags": [
                        "women-baggy",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_women_11",
                "name": "Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 11)",
                "slug": "womens-classic-linen-minimalist-lounge-co-ord-set-set-11",
                "price": 1699.0,
                "compare_at_price": 2209,
                "category": "women-baggy",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_38_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_38_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Linen Viscose Blend",
                "brand": "GrowX Co-Ords",
                "rating": 4.6,
                "reviewsCount": 20,
                "tags": [
                        "women-baggy",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_women_12",
                "name": "Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 12)",
                "slug": "womens-classic-linen-minimalist-lounge-co-ord-set-set-12",
                "price": 1699.0,
                "compare_at_price": 2209,
                "category": "women-baggy",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_39_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_39_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Linen Viscose Blend",
                "brand": "GrowX Co-Ords",
                "rating": 4.7,
                "reviewsCount": 24,
                "tags": [
                        "women-baggy",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_women_13",
                "name": "Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 13)",
                "slug": "womens-classic-linen-minimalist-lounge-co-ord-set-set-13",
                "price": 1699.0,
                "compare_at_price": 2209,
                "category": "women-baggy",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_40_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_40_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Linen Viscose Blend",
                "brand": "GrowX Co-Ords",
                "rating": 4.8,
                "reviewsCount": 28,
                "tags": [
                        "women-baggy",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": true
        },
        {
                "id": "prod_women_14",
                "name": "Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 14)",
                "slug": "womens-classic-linen-minimalist-lounge-co-ord-set-set-14",
                "price": 1699.0,
                "compare_at_price": 2209,
                "category": "women-baggy",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_41_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_41_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Linen Viscose Blend",
                "brand": "GrowX Co-Ords",
                "rating": 4.9,
                "reviewsCount": 32,
                "tags": [
                        "women-baggy",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_women_15",
                "name": "Women's Classic Linen Minimalist Lounge Co-Ord Set (Set 15)",
                "slug": "womens-classic-linen-minimalist-lounge-co-ord-set-set-15",
                "price": 1699.0,
                "compare_at_price": 2209,
                "category": "women-baggy",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_42_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_42_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Linen Viscose Blend",
                "brand": "GrowX Co-Ords",
                "rating": 5.0,
                "reviewsCount": 36,
                "tags": [
                        "women-baggy",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_women_16",
                "name": "Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 16)",
                "slug": "womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-16",
                "price": 1399.0,
                "compare_at_price": 1819,
                "category": "women-tops",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_43_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_43_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Terry Soft Cotton",
                "brand": "GrowX Activewear",
                "rating": 4.6,
                "reviewsCount": 40,
                "tags": [
                        "women-tops",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_women_17",
                "name": "Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 17)",
                "slug": "womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-17",
                "price": 1399.0,
                "compare_at_price": 1819,
                "category": "women-tops",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_44_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_44_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Terry Soft Cotton",
                "brand": "GrowX Activewear",
                "rating": 4.7,
                "reviewsCount": 44,
                "tags": [
                        "women-tops",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": true
        },
        {
                "id": "prod_women_18",
                "name": "Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 18)",
                "slug": "womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-18",
                "price": 1399.0,
                "compare_at_price": 1819,
                "category": "women-tops",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_45_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_45_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Terry Soft Cotton",
                "brand": "GrowX Activewear",
                "rating": 4.8,
                "reviewsCount": 48,
                "tags": [
                        "women-tops",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_women_19",
                "name": "Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 19)",
                "slug": "womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-19",
                "price": 1399.0,
                "compare_at_price": 1819,
                "category": "women-tops",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_46_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_46_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Terry Soft Cotton",
                "brand": "GrowX Activewear",
                "rating": 4.9,
                "reviewsCount": 17,
                "tags": [
                        "women-tops",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": true
        },
        {
                "id": "prod_women_20",
                "name": "Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 20)",
                "slug": "womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-20",
                "price": 1399.0,
                "compare_at_price": 1819,
                "category": "women-tops",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_47_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_47_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Terry Soft Cotton",
                "brand": "GrowX Activewear",
                "rating": 5.0,
                "reviewsCount": 21,
                "tags": [
                        "women-tops",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        },
        {
                "id": "prod_women_21",
                "name": "Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 21)",
                "slug": "womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-21",
                "price": 1399.0,
                "compare_at_price": 1819,
                "category": "women-tops",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_48_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_48_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Terry Soft Cotton",
                "brand": "GrowX Activewear",
                "rating": 4.6,
                "reviewsCount": 25,
                "tags": [
                        "women-tops",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": true,
                "isNewArrival": true
        },
        {
                "id": "prod_women_22",
                "name": "Women's Cozy Athletic Fleece Lounge Crop Tee Combo (Set 22)",
                "slug": "womens-cozy-athletic-fleece-lounge-crop-tee-combo-set-22",
                "price": 1399.0,
                "compare_at_price": 1819,
                "category": "women-tops",
                "gender": "women",
                "image": "./frontend/public/images/products/photo_49_2026-07-10_11-19-21.jpg",
                "live_image": "/images/products/photo_49_2026-07-10_11-19-21.jpg",
                "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                ],
                "colors": [
                        "Lilac",
                        "Beige",
                        "White",
                        "Green",
                        "Burgundy"
                ],
                "fabric": "Terry Soft Cotton",
                "brand": "GrowX Activewear",
                "rating": 4.7,
                "reviewsCount": 29,
                "tags": [
                        "women-tops",
                        "women",
                        "new-arrivals"
                ],
                "isFeatured": false,
                "isNewArrival": false
        }
];
