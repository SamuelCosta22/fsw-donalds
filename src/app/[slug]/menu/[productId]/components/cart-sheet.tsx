import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/utils/format-currency";

import CartProductItem from "../../components/cart-product-items";
import FinishOrderDrawer from "../../components/finish-order-drawer";
import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [finishOrderDrawerIsOpen, setFinishOrderDrawerIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[85%] p-3">
        <SheetHeader>
          <SheetTitle className="mb-4 text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-[92%] flex-col space-y-3">
          <div className="flex-auto">
            {products.map((product) => (
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
          <Button
            className="w-full rounded-full"
            onClick={() => setFinishOrderDrawerIsOpen(true)}
          >
            Finalizar pedido
          </Button>
          <FinishOrderDrawer
            open={finishOrderDrawerIsOpen}
            onOpenChange={setFinishOrderDrawerIsOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
