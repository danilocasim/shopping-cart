import { useEffect, useState } from "react";

function useProductsWithQuantity(productsData) {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const productsWithQuantity = productsData.map((product) => ({
      ...product,
      quantity: (product.quantity = 1),
    }));

    setAllProducts(productsWithQuantity);
  }, [productsData]);

  return [allProducts, setAllProducts];
}

export { useProductsWithQuantity };
