"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { ChekoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  // console.log("total :" + total);
  if (items.length === 0) {
    return (
      <div>
        <h1>Your Cart is Empty.</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold pb-4">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {items.map((item, key) => (
              <li key={key} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  {/* <Image
                    alt={item.name}
                    src={item.imageUrl[0]}
                    objectFit="cover"
                    fill
                    className="hover:opacity-90 transition duration-300 ease-in-out"
                  /> */}
                  <span className="md:text-lg font-medium">{item.name}</span>
                  <span className="md:text-lg font-semibold "> Rp. {((item.price * item.quantity) / 100).toLocaleString("id-ID")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="cursor-pointer"
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold ">{item.quantity}</span>
                  <Button size="sm" className="cursor-pointer" onClick={() => addItem({...item, quantity : 1})}>+</Button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 border-t pt-2 text-lg font-semibold text-right">
            Total : Rp. {((total) / 100).toLocaleString("id-ID")}
          </div>
        </CardContent>
      </Card>
      <form action={ChekoutAction} className="max-w-md mx-auto pt-5">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" variant="default" className="w-full hover:bg-neutral-700 cursor-pointer">Proceed To Payment</Button>

        {/* <Button onClick={()=> clearCart} variant="default" className="w-full hover:bg-neutral-700 cursor-pointer">Clear Cart</Button> */}
      </form>
    </div>
  );
}
