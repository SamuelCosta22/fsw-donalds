"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
  slug?: string;
}

const ProductHeader = ({ product, slug }: ProductHeaderProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  const handleOrderListClick = () => router.push(`/${slug}/orders`);

  return (
    <div className="relative min-h-[222px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={handleOrderListClick}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ProductHeader;
