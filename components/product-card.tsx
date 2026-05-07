import Image from "next/image";
import type Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  // 🛡️ safety guard (IMPORTANT for SSR/Prerender)
  if (!product) return null;

  const price =
    typeof product.default_price === "object"
      ? product.default_price
      : null;

  return (
    <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col">
      
      {/* IMAGE */}
      <Link href={`/products/${product.id}`} className="block">
        {product.images?.[0] && (
          <div className="relative h-60 w-full">
            <Image
              alt={product.name || "Product"}
              src={product.images[0]}
              fill
              className="object-cover group-hover:opacity-90 transition-opacity duration-300 ease-in-out"
            />
          </div>
        )}
      </Link>

      {/* TITLE */}
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold text-gray-800 uppercase">
          {product.name}
        </CardTitle>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="p-4 flex flex-col flex-grow justify-between">
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-2">
            {product.description}
          </p>
        )}

        {price?.unit_amount && (
          <p className="text-lg font-semibold text-gray-900 pb-4">
            Rp {(price.unit_amount / 100).toLocaleString("id-ID")}
          </p>
        )}

        {/* BUTTON */}
        <Button asChild className="mt-auto bg-black text-white hover:bg-neutral-600">
          <Link href={`/products/${product.id}`}>
            Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};