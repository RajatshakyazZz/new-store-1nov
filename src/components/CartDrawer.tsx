'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Trash2, ArrowRight, ShieldCheck, Zap, Gift, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ORDER_BUMP } from '@/data/bundles';
import { optimizeImageUrl } from '@/lib/imageOptimized';

export default function CartDrawer() {
  const pathname = usePathname();
  const {
    items,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    total,
    orderBumpAdded,
    toggleOrderBump,
    globalBumpOffer,
    freeBundleOffer,
    freeBundles,
    removeFreeBundle,
    setIsFreeBundleModalOpen,
    isQualifiedForFreeOffer,
  } = useCart();

  const isOfferActive = freeBundleOffer?.enabled !== false;
  const offerMinCart = isOfferActive ? (freeBundleOffer?.minCartValue || 149) : 999999999;
  const offerMaxQuantity = isOfferActive ? (freeBundleOffer?.freeBundleQuantity || 2) : 0;

  const isBumpEnabled = globalBumpOffer ? globalBumpOffer.enabled !== false : true;
  const bumpTitle = globalBumpOffer?.title || ORDER_BUMP.title;
  const bumpThumb = globalBumpOffer?.thumbnail || ORDER_BUMP.thumbnail;
  const bumpPrice = globalBumpOffer?.price != null ? globalBumpOffer.price : ORDER_BUMP.discountPrice;
  const bumpRegPrice = globalBumpOffer?.regularPrice != null ? globalBumpOffer.regularPrice : ORDER_BUMP.originalPrice;
  const bumpDiscount = globalBumpOffer?.discountPercentage != null ? globalBumpOffer.discountPercentage : 80;

  if (pathname?.startsWith('/r/') || pathname === '/r') return null;
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer Card */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#fff8f2]">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-lg text-slate-950">Your Cart</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-950 border border-orange-200">
              {items.length + (orderBumpAdded ? 1 : 0)} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 pb-16 space-y-4">
          {items.length === 0 && !orderBumpAdded ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-600 text-2xl shadow-[0_0_20px_rgba(255,107,0,0.2)]">
                🛒
              </div>
              <h4 className="font-bold text-lg text-slate-950">Your cart is empty</h4>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                Explore our viral reels bundles and level up your social media growth today!
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-black shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:from-orange-500 hover:to-amber-400 transition-all cursor-pointer"
              >
                Browse All Bundles →
              </Link>
            </div>
          ) : (
            <>
              {/* Product Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.license}`}
                    className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex gap-3.5 relative group"
                  >
                    <img
                      src={optimizeImageUrl(item.product.thumbnail, 128, 70)}
                      alt={item.product.title}
                      width={64}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-20 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 leading-tight line-clamp-2">
                          {item.product.title}
                        </h5>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              item.license === 'reseller'
                                ? 'bg-orange-100 text-orange-900 border border-orange-200'
                                : 'bg-slate-100 text-slate-800 border border-slate-200'
                            }`}
                          >
                            {item.license === 'reseller' ? 'Reseller Rights' : 'Personal Use'}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {item.product.reelCount}+ Reels
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-black text-sm text-slate-950">
                          ₹{item.price}.00
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.license)}
                          className="text-slate-400 hover:text-orange-600 p-1 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Free Bundle Offer Status / Claimed Section */}
              {isOfferActive && (
                <>
                  {freeBundles.length > 0 ? (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 space-y-2.5 mt-3">
                      <div className="flex items-center justify-between text-orange-950 text-[11px] font-black uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Gift className="w-3.5 h-3.5 text-orange-600" />
                          Free Bonus Bundles ({freeBundles.length}/{offerMaxQuantity} Claimed)
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsFreeBundleModalOpen(true)}
                          className="text-[10px] font-bold text-orange-700 underline hover:text-orange-900 cursor-pointer"
                        >
                          Change
                        </button>
                      </div>
                      {freeBundles.map((fb) => (
                        <div
                          key={fb.id}
                          className="flex items-center justify-between gap-2.5 bg-white p-2 rounded-xl border border-orange-200/80"
                        >
                          <img
                            src={optimizeImageUrl(fb.thumbnail, 64, 70)}
                            alt={fb.title}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate leading-tight">
                              {fb.title}
                            </p>
                            <span className="text-[10px] font-black text-orange-800 bg-orange-100 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                              FREE BONUS (₹0)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFreeBundle(fb.id)}
                            className="text-slate-400 hover:text-orange-600 p-1 transition-colors cursor-pointer"
                            aria-label="Remove free bundle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : isQualifiedForFreeOffer ? (
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-300/60 flex items-center justify-between gap-2 mt-3 shadow-[0_0_15px_rgba(255,107,0,0.15)]">
                      <div className="flex items-center gap-2 text-xs font-black text-orange-950">
                        <Gift className="w-4 h-4 shrink-0 text-orange-600" />
                        <span>🎉 {offerMaxQuantity} Free Bundles Unlocked!</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsFreeBundleModalOpen(true)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-black hover:opacity-95 shadow-[0_0_12px_rgba(255,107,0,0.4)] cursor-pointer"
                      >
                        Select Now
                      </button>
                    </div>
                  ) : subtotal > 0 ? (
                    <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-200/80 flex items-center justify-between text-xs text-orange-950 font-bold mt-3">
                      <span>Add ₹{Math.max(1, offerMinCart - subtotal)} more to claim {offerMaxQuantity} Free Bundles!</span>
                      <Link
                        href="/claim-offer"
                        onClick={() => setIsCartOpen(false)}
                        className="underline hover:text-orange-700 shrink-0 font-extrabold"
                      >
                        View Offer
                      </Link>
                    </div>
                  ) : null}
                </>
              )}

              {/* Order Bump In-Cart Offer */}
              {isBumpEnabled && (
                <div className="p-3.5 rounded-2xl border-2 border-dashed border-orange-400 bg-orange-50/50 mt-4 relative">
                  <div className="flex items-center gap-1.5 text-orange-950 text-[11px] font-extrabold uppercase tracking-wider mb-1.5">
                    <Zap className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                    Exclusive 1-Click Order Bump
                  </div>
                  <div className="flex gap-3 items-center">
                    <img
                      src={optimizeImageUrl(bumpThumb, 128, 70)}
                      alt={bumpTitle}
                      width={48}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                        {bumpTitle}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-extrabold text-xs text-orange-600">
                          ₹{bumpPrice}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through">
                          ₹{bumpRegPrice}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-orange-100 text-orange-800 rounded">
                          {bumpDiscount}% OFF
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={toggleOrderBump}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        orderBumpAdded
                          ? 'bg-orange-600 text-white shadow-[0_0_12px_rgba(255,107,0,0.4)]'
                          : 'bg-white border border-orange-300 text-orange-950 hover:bg-orange-50'
                      }`}
                    >
                      {orderBumpAdded ? '✓ Added' : `+ Add ₹${bumpPrice}`}
                    </button>
                  </div>
                </div>
              )}

              {/* Pay Now / Instant Checkout Button right below the bump offer */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3.5 shadow-sm">
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-700">₹{subtotal}.00</span>
                  </div>
                  {orderBumpAdded && isBumpEnabled && (
                    <div className="flex justify-between text-orange-600 text-xs font-bold">
                      <span>Bonus Upsell Pack ({bumpDiscount}% Off)</span>
                      <span>+₹{bumpPrice}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-950 pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-xl font-black text-orange-600">₹{total}.00</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(255,107,0,0.6)] hover:shadow-[0_0_38px_rgba(255,149,0,0.85)] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4 fill-white/20" />
                  <span>Pay Now • Instant Checkout (₹{total})</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <div className="flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1 text-orange-800 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    Instant Drive Link
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Zap className="w-3.5 h-3.5 text-orange-500 fill-orange-500 shrink-0" />
                    Zero Delay Access
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
