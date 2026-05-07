import { ProductDetail } from "@/components/product-detail";
import { getStripe  } from "@/lib/stripe";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const {id} = await params;
    // console.log("PARAMS:", params);
    const stripe = getStripe();
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product={plainProduct} />;
}
