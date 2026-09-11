"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { JERSEYS } from "./Jersey";

const BRAND_RED = '#D54f1b';

const formatPrice = (amount: any) => {
  if (!amount || amount <= 0) return 'Coming Soon !';
  return `KSh ${amount.toLocaleString('en-KE')}`;
};

const getCategories = () => {
  const cats = JERSEYS.map(j => (j.category || 'UNCATEGORIZED').toUpperCase());
  return ['ALL', ...Array.from(new Set(cats))];
};

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = getCategories();

  const filteredProducts = activeCategory === 'ALL' 
    ? JERSEYS 
    : JERSEYS.filter((p) => (p.category || 'UNCATEGORIZED').toUpperCase() === activeCategory);

  return (
    <div className="min-h-screen bodyfont" style={{ backgroundColor: '#ffffff' }}>
      <div className="relative overflow-hidden" style={{ backgroundColor: BRAND_RED }}>
        <div className="absolute inset-0 pointer-events-none bg-diagonal-dots" style={{ zIndex: 0 }}>
          
        </div>
        <div className="relative flex flex-col items-center text-center px-4" style={{ zIndex: 10, paddingTop: '150px', paddingBottom: '20px' }}>
          <h1 className="text-white uppercase font-medium text-4xl md:text-4xl" style={{ letterSpacing: '0.06em' }}>
            SHOP
          </h1>
        </div>
      </div>

      <div className="border-b" style={{ borderColor: '#eee' }}>
        <div className="no-scrollbar flex gap-6 md:gap-10 overflow-x-auto whitespace-nowrap px-6 md:justify-center py-5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs md:text-sm font-bold uppercase pb-1 transition-colors cursor-pointer"
                style={{
                  letterSpacing: '0.1em',
                  color: isActive ? BRAND_RED : '#8a8a8a',
                  borderBottom: isActive ? `2px solid ${BRAND_RED}` : '2px solid transparent',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="product-grid">
          {filteredProducts.map((product: any) => (
            <Link
              href={`/shop/${product.id}`}
              key={product.id}
              className="product-card group block"
            >
              <div className="product-image-wrap relative">
                {product.badge && (
                  <span className="product-badge" style={{ backgroundColor: product.badge === 'SALE' ? '#1a1a1a' : BRAND_RED }}>
                    {product.badge}
                  </span>
                )}
                
                <div className="product-art relative w-full h-full">
                  <Image 
                    src={product.image || "/placeholder.svg"} 
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                <button
                  className="quick-add-btn"
                  aria-label={`View ${product.name}`}
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <div className="product-name group-hover:text-[#D4121E] transition-colors">{product.name}</div>
                <div className="product-price-row">
                  {product.originalPrice && <span className="product-price-original">{formatPrice(product.originalPrice)}</span>}
                  <span className="product-price" style={{ color: product.originalPrice ? BRAND_RED : '#1a1a1a' }}>
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 640px) {
          .product-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
        }
        @media (min-width: 1024px) {
          .product-grid { grid-template-columns: repeat(4, 1fr); gap: 28px; }
        }

        .product-card { cursor: pointer; }
        .product-image-wrap {
          position: relative;
          background: #F0EDE9;
          border-radius: 12px;
          aspect-ratio: 1 / 1.05;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.25s ease;
        }
        .product-card:hover .product-image-wrap { box-shadow: 0 14px 30px rgba(0,0,0,0.12); }
        .product-art { width: 100%; height: 100%; overflow: hidden; }

        .product-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 4px 8px;
          border-radius: 4px;
          z-index: 2;
          text-transform: uppercase;
        }
        .quick-add-btn {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: #fff;
          border: none;
          border-radius: 999px;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          cursor: pointer;
          color: #1a1a1a;
          transition: transform 0.2s ease;
          z-index: 2;
        }
        .quick-add-btn:hover { transform: scale(1.1); }

        .product-info { padding: 12px 2px 0; }
        .product-category { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: #9a9a9a; text-transform: uppercase; margin-bottom: 4px; }
        .product-name { font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; line-height: 1.3; }
        .product-price-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .product-price { font-size: 14px; font-weight: 700; }
        .product-price-original { font-size: 13px; color: #9a9a9a; text-decoration: line-through; }
      `}</style>
    </div>
  );
}