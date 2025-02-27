import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/utils/format-currency";

import CartProductItem from "../../components/cart-product-items";
import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
    const {isOpen, toggleCart, products, total} = useContext(CartContext)
    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[85%] p-3">
                <SheetHeader>
                    <SheetTitle className="text-left mb-4">Sacola</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-[92%] space-y-3">
                    <div className="flex-auto">
                        {products.map(product => (
                            <CartProductItem product={product} key={product.id} />
                        ))}
                    </div>
                    <Card className="mb-6">
                        <CardContent className="p-3">
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Button className="w-full rounded-full">Finalizar pedido</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
 
export default CartSheet;