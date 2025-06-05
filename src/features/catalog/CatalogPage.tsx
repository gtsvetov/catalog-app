import React, { useEffect, useState } from "react";
import { fetchMockProducts } from "../../utils/fetchMockProducts";
import { Product } from "../../types/common";
import { Spinner } from "../../components/Spinner";

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMockProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded p-4 shadow">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
          <h3 className="font-bold">{product.name}</h3>
          <p>{product.category}</p>
          <p className="text-blue-600 font-semibold">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default CatalogPage;
