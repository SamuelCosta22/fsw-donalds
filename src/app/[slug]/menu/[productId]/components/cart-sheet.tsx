import { useContext } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import CartProductItem from "../../components/cart-product-items";
import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
    const {isOpen, toggleCart, products} = useContext(CartContext)
    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[85%] p-3">
                <SheetHeader>
                    <SheetTitle className="text-left mb-4">Sacola</SheetTitle>
                </SheetHeader>
                <div className="py-5">
                    {products.map(product => (
                        <CartProductItem product={product} key={product.id} />
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
 
export default CartSheet;