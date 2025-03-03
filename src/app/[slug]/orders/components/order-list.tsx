"use client";

import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStatusColors, getStatusLabel } from "@/consts/order-status-style";
import { formatCurrency } from "@/utils/format-currency";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="space-y-5 p-4">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBack}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-2">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map((order) => {
        return (
          <Card key={order.id}>
            <CardContent className="space-y-4 p-5">
              <div
                className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${getStatusColors(order.status)}`}
              >
                {getStatusLabel(order.status)}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative h-5 w-5">
                  <Image
                    fill
                    src={order.restaurant.avatarImageUrl}
                    alt={order.restaurant.name}
                    className="rounded-sm"
                  />
                </div>
                <p className="text-sm font-semibold">{order.restaurant.name}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                {order.orderProducts.map((orderProduct) => (
                  <div
                    key={orderProduct.id}
                    className="flex items-center gap-1"
                  >
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                      {orderProduct.quantity}
                    </div>
                    <p className="text-xs">{orderProduct.product.name}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <p className="text-sm font-medium">
                {formatCurrency(order.total)}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OrderList;
