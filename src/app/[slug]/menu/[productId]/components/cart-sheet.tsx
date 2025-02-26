import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
    const {isOpen, toggleCart, products} = useContext(CartContext)
    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, dolorum soluta? Voluptas excepturi impedit labore a natus dolorum quidem minus velit magni modi doloribus dignissimos eveniet, voluptatibus veritatis, quo molestiae.</SheetDescription>
                </SheetHeader>
                {products.map(product => (
                    <h1 key={product.id}>{product.name} - { product.quantity}</h1>
                ))}
            </SheetContent>
        </Sheet>
    );
}
 
export default CartSheet;