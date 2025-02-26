'use client'

import { Prisma } from "@prisma/client";
import { ChefHatIcon, InfoIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/format-currency";

import { CartContext } from "../../contexts/cart";
import CartSheet from "./cart-sheet";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{include: {restaurant: {select: {name: true, avatarImageUrl: true}}}}>;
}

const ProductDetails = ({product}: ProductDetailsProps) => {
    const {toggleCart} = useContext(CartContext)
    const [quantity, setQuantity] = useState(0);

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if(prev === 1){
                return 1
            }
            return prev - 1
        })
    }
    const handleIncreaseQuantity = () => {
        setQuantity(prev => prev + 1)
    }

    const handleAddToCart = () => {
        toggleCart()
    }
    
    return (
        <>
            <div className="relative z-50 rounded-t-3xl p-5 mt-[-1rem] flex-auto flex flex-col overflow-hidden">
                <div className="flex-auto overflow-hidden">
                    <div className="items-center flex gap-1.5">
                        <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full" />
                        <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
                    </div>

                    <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>

                    <div className="flex items-center justify-between mt-1">
                        <h3 className="text-lg font-semibold">{formatCurrency(product.price)}</h3>
                        <div className="flex items-center gap-3 text-center">
                            <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}><MinusIcon /></Button>
                            
                            <p className="w-4">{quantity}</p>
                            <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}><PlusIcon /></Button>
                        </div>
                    </div>

                    <ScrollArea className="w-full max-h-64 overflow-auto mt-2">
                        <div className="mt-5 space-y-2">
                            <div className="flex items-center gap-1">
                                <InfoIcon size={18} />
                                <h4 className="font-semibold">Sobre</h4>
                            </div>
                            <p className="text-xs text-muted-foreground text-justify">{product.description}</p>
                        </div>

                        <div className="mt-5 space-y-2">
                            <div className="flex items-center gap-1">
                                <ChefHatIcon size={18} />
                                <h4 className="font-semibold">Ingredientes</h4>
                            </div>
                            <ul className="list-disc px-5 text-xs text-muted-foreground text-justify">
                                {product.ingredients.map((ingredient) => (
                                    <li key={ingredient}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </ScrollArea>
                </div>

                <Button className="rounded-ful w-full mt-6" onClick={handleAddToCart}>Adicionar à sacola</Button>
            </div>
            <CartSheet />
        </>
    );
}

export default ProductDetails;