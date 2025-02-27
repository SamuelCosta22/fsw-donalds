import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartProductItemProps {
    product: CartProduct
}

const CartProductItem = ({ product }: CartProductItemProps) => {
    const { decreaseProductQuantity, increaseProductQuantity } = useContext(CartContext)
    
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 bg-gray-200 rounded-xl">
                    <Image src={product.imageUrl} alt={product.name} fill />
                </div>
                <div className="space-y-1">
                    <p className="text-xs max-w-[70%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                    <div className="flex items-center gap-1 justify-between w-[80%]">
                        <div className="flex items-center gap-1">
                            <Button variant="outline" className="h-7 w-7 rounded-xl" onClick={() => decreaseProductQuantity(product.id)}><MinusIcon /></Button>
                            <p className="w-4 text-center">{product.quantity}</p>
                            <Button variant="destructive" className="h-7 w-7 rounded-xl" onClick={() => increaseProductQuantity(product.id)}><PlusIcon /></Button>
                        </div>
                        <Button variant="outline" className="h-7 w-7 rounded-xl"><TrashIcon /></Button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default CartProductItem;