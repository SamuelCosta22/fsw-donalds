'use client'

import { Prisma } from "@prisma/client";
import { ChefHatIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currency";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{include: {restaurant: {select: {name: true, avatarImageUrl: true}}}}>;
}

const ProductDetails = ({product}: ProductDetailsProps) => {
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
    
    return (
        <div className="relative z-50 rounded-t-3xl p-5 mt-[-1rem] flex-auto flex flex-col">
            <div className="flex-auto">
                <div className="items-center flex gap-1.5">
                    <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full" />
                    <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
                </div>

                <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>

                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{formatCurrency(product.price)}</h3>
                    <div className="flex items-center gap-3 text-center">
                        <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}><MinusIcon /></Button>
                        
                        <p className="w-4">{quantity}</p>
                        <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}><PlusIcon /></Button>
                    </div>
                </div>

                <div className="mt-5 space-y-2">
                    <h4 className="font-semibold">Sobre</h4>
                    <p className="text-xs text-muted-foreground text-justify">{product.description}</p>
                </div>

                <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-1">
                        <ChefHatIcon size={18} />
                        <h4 className="font-semibold">Ingredientes</h4>
                    </div>
                    <p className="text-xs text-muted-foreground text-justify">{product.ingredients}</p>
                </div>
            </div>

            <Button className="rounded-ful w-full mt-6">Adicionar à sacola</Button>
        </div>
    );
}
 
export default ProductDetails;