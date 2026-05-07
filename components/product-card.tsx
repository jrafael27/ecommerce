import Image from "next/image";
// import Stripe from "stripe";
import type Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";


interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col">
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full">
            <Image
              alt={product.name}
              src={product.images[0]}
              objectFit="cover"
              layout="fill"
              className="group-hover:opacity-90 transition-opacity duration-300 ease-in-out"
            />
          </div>
        )}

        <CardHeader className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-xl font-bold text-gray-800 uppercase px-4">{product.name}</CardTitle>
          <CardContent className="p-4 flex flex-grow flex-col justify-between">
            {product.description && (
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
            )}
            {price && price.unit_amount && (
              <p className="text-lg font-semibold text-gray-900 pb-4">
                {" "}
                Rp {(price.unit_amount / 100).toLocaleString("id-ID")}
              </p>
            )}
            <Button className="mt-auto bg-black text-white hover:bg-neutral-600"> Details</Button>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
};
