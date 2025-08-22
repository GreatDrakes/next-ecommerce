// lib/products.ts
export type Product = {
  id: string;
  title: string;
  description: string;
  image: string;   // 
};

const mockProducts: Product[] = [
  { id: "1", title: "Sword of Dawn", description: "A legendary blade of light.", image: "/images/sword.png" },
  { id: "2", title: "Shadow Cloak", description: "Grants invisibility at night." , image: "/images/cloak.png" },
  { id: "3", title: "Iron Gauntlets", description: "Heavy gloves with unmatched strength." , image: "/images/gauntlets.png" },
];

// Fetch all products (could be from DB or API)
export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

// Fetch single product by id
export async function getProduct(id: string): Promise<Product> {
  const product = mockProducts.find((p) => p.id === id);
  if (!product) throw new Error(`Product with id ${id} not found`);
  return product;
}
