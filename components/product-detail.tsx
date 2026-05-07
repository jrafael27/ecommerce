"use client";

import type Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();

  // 🛡️ SAFE PRICE HANDLING
  const price =
    typeof product.default_price === "object"
      ? product.default_price
      : null;

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const onAddItem = () => {
    if (!price?.unit_amount) return;

    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount,
      imageUrl: product.images?.[0] ?? null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">

      {/* IMAGE */}
      {product.images?.[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            alt={product.name || "Product"}
            src={product.images[0]}
            fill
            className="object-cover hover:opacity-90 transition duration-300 ease-in-out"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}

        {price?.unit_amount && (
          <p className="text-lg font-semibold text-gray-900 mb-4">
            Rp {(price.unit_amount / 100).toLocaleString("id-ID")}
          </p>
        )}

        {/* CART CONTROLS */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => removeItem(product.id)}
            disabled={quantity === 0}
          >
            -
          </Button>

          <span className="text-lg font-semibold">{quantity}</span>

          <Button onClick={onAddItem}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};