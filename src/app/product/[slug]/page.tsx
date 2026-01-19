import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { FaStar, FaRegStar } from "react-icons/fa";
import QuantitySelector from "@/components/QuantitySelector";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div data-aos="fade-right">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto rounded-lg border border-zinc-200 object-cover"
          />
        </div>
        <div className="flex flex-col gap-4" data-aos="fade-left">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <div className="flex items-center gap-2 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.round(product.rating) ? (
                <FaStar key={i} />
              ) : (
                <FaRegStar key={i} />
              )
            )}
            <span className="text-sm text-zinc-600 ml-2">
              {product.rating.toFixed(1)} / 5
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-sm">
              {product.category}
            </span>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm ${
                product.isVeg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {product.isVeg ? "Veg" : "Non-Veg"}
            </span>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm ${
                product.available ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-700"
              }`}
            >
              {product.available ? "Available" : "Unavailable"}
            </span>
          </div>
          <p className="text-zinc-600">{product.description}</p>
          <p className="text-xl font-medium">Rs {product.price.toLocaleString()}</p>
          <QuantitySelector product={product} />
        </div>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
