import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductsProps {
    products: Product[];
}

const Products = ({products}: ProductsProps) => {
    const {slug} = useParams<{slug: string}>()

    return (
        <div className="space-y-3 px-5 py-1 ">
            {products.map((product) => (
                <Link href={`/${slug}/menu/${product.id}`} className="flex items-center justify-between gap-10 py-3 border-b" key={product.id}>
                    <div className="space-y-1">
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                                <p className="pt-3 txt-sm font-semibold">{Intl.NumberFormat("pt-BR", {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(product.price)}</p>
                            </div>

                            <div className="relative min-h-[80px] min-w-[100px]">
                                <Image src={product.imageUrl} alt={product.name} fill className="rounded-lg object-contain" />
                            </div>
                        </div>
                    </div>                    
                </Link>
            ))}
        </div>
    );
}
 
export default Products;