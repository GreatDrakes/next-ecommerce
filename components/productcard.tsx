"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col items-center">
      <Image
        src={product.image}
        alt={product.title}
        width={160} 
        height={160}
        className="h-40 object-contain mb-4"
        priority 
      />
      <h2 className="font-semibold text-center text-sm mb-2 line-clamp-2">
        {product.title}
      </h2>
      <p className="text-blue-600 font-bold mb-2">${product.price}</p>
      <button
        onClick={() =>
          dispatch(addToCart({ ...product, quantity: 1 }))
        }
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
