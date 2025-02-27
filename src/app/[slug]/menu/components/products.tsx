import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { formatCurrency } from "@/utils/format-currency";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");

  return (
    <div className="space-y-3 px-5 py-1">
      {products.map((product) => (
        <Link
          href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          className="flex items-center justify-between gap-10 border-b py-3"
          key={product.id}
        >
          <div className="space-y-1">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <p className="txt-sm pt-3 font-semibold">
                  {formatCurrency(product.price)}
                </p>
              </div>

              <div className="relative min-h-[80px] min-w-[100px]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
