"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {

    const {clearCart} = useCartStore();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Payment Successfull!</h1>
            <p className="mb-4">Thankyou for your Process. Your Order is being processed</p>

            <Button variant="default" className="w-md cursor-pointer hover:bg-neutral-700">
                <Link href={"/products"}>
                    Continue Shopping
                </Link>
            </Button>
        </div>
    )
}