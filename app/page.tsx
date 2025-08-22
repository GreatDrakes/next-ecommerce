import ProductCard from "../components/productcard";

export default async function HomePage() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store", // ensures fresh data every time
  });
  const products = await res.json();
  const featured = products.slice(0, 4);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

