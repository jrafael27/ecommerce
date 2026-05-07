"use client";

import type Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!products?.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products?.length]);

  if (!products || products.length === 0) return null;

  const currentProduct = products[current];

  const price =
    typeof currentProduct.default_price === "object"
      ? (currentProduct.default_price as Stripe.Price)
      : null;

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct?.images?.[0] && (
        <div className="relative h-80 w-full">
          <Image
            alt={currentProduct.name}
            src={currentProduct.images[0]}
            fill
            className="object-cover transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}

      <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          {currentProduct.name}
        </CardTitle>

        {price?.unit_amount && (
          <p className="text-xl text-white">
            Rp {(price.unit_amount / 100).toLocaleString("id-ID")}
          </p>
        )}
      </CardContent>
    </Card>
  );
};