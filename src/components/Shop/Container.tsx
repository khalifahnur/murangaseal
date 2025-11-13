"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import Header from "../Home/HeaderSection";
import { Footer } from "../Home/Footer";
import Image from "next/image";
import { JERSEYS } from "./Jersey";

export default function JerseyShop() {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground mozillaheadline">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* <div className="flex flex-col-3 md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold">{JERSEYS.length}</span>{" "}
                products
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition">
                Newest
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition">
                Price: Low to High
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition">
                Top Rated
              </button>
            </div>
          </div> */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {JERSEYS.map((jersey) => (
              <Link
                key={jersey.id}
                href={`/shop/${jersey.id}`}
                className="group h-full"
              >
                <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition h-full flex flex-col">
                  <div className="relative overflow-hidden  aspect-square">
                    <Image
                      src={jersey.image || "/placeholder.svg"}
                      alt={jersey.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      width={1000}
                      height={800}
                    />
                  </div>

                  <div className="flex flex-col grow p-4 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {jersey.category}
                      </p>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition line-clamp-2">
                        {jersey.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-yellow-400 text-accent"
                            
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({jersey.reviews})
                      </span>
                    </div>

                    {/* <div className="flex gap-1">
                      {jersey.colors.slice(0, 3).map((color) => (
                        <div
                          key={color}
                          className="w-3 h-3 rounded-full border border-border"
                          title={color}
                        />
                      ))}
                    </div> */}

                    <div className="flex items-end gap-2 mt-auto pt-2 border-t border-border">
                      <div className="text-xl font-bold text-foreground">
                        {jersey.price > 0 ? `Ksh.${jersey.price}` : 'Coming Soon !'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
