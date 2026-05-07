"use client";
// import Stripe from "stripe";
import type Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAdditem  = () => {
    addItem({
        id:product.id,
        name:product.name,
        price: price.unit_amount as number,
        imageUrl: product.images ? product.images[0] : null,
        quantity : 1
    })
  }

  

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            alt={product.name}
            src={product.images[0]}
            objectFit="cover"
            fill
            className="hover:opacity-90 transition duration-300 ease-in-out"
          />
        </div>
      )}

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}
        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-900">
            {" "}
            Rp {(price.unit_amount / 100).toLocaleString("id-ID")}
          </p>
        )}

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => removeItem(product.id)}
          >
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button onClick={onAdditem}>
            +
          </Button>
          {/* <Button onClick={clearCart}>Clear</Button> */}
        </div>
      </div>
    </div>
  );
};
