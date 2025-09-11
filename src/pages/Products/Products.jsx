import { useStoreAPI } from "../../components/hooks/useStoreAPI";
import Product from "../../components/Product/Product";
import { Fragment } from "react";
import style from "./Products.module.css";
import { useOutletContext } from "react-router";
import { useProductsWithQuantity } from "../../components/hooks/productsWithQuantity";

function Products() {
  const [productsData, loading, error] = useStoreAPI();
  const [checkoutItems, setCheckoutItems] = useOutletContext();
  const [allProducts, setAllProducts] = useProductsWithQuantity(productsData);

  function addToCart(data) {
    const copyData = { ...data };
    const newCheckoutItems = [...checkoutItems];

    const isProductExist = newCheckoutItems.some((product) => {
      if (product) return product.id === copyData.id;
    });

    if (isProductExist) {
      const index = newCheckoutItems.findIndex(
        (product) => product.id === copyData.id
      );
      newCheckoutItems.map((product, productIndex) => {
        if (productIndex === index) {
          return (product.quantity += copyData.quantity);
        }
      });

      setCheckoutItems(newCheckoutItems);

      return resetProductsQuantity();
    }

    newCheckoutItems.push(copyData);

    setCheckoutItems(newCheckoutItems);
    resetProductsQuantity();
  }

  function setProductQuantity(value, index) {
    const updatedQuanties = [...allProducts];
    updatedQuanties[index].quantity = value;
    setAllProducts(updatedQuanties);
  }

  function resetProductsQuantity() {
    const resetProductsQuantity = allProducts.map((product) => ({
      ...product,
      quantity: (product.quantity = 1),
    }));

    setAllProducts(resetProductsQuantity);
  }

  function increment(index) {
    const newProductsData = [...allProducts];
    newProductsData[index].quantity += 1;
    setAllProducts(newProductsData);
  }

  function decrement(index) {
    const newProductsData = [...allProducts];
    if (newProductsData[index].quantity >= 2)
      newProductsData[index].quantity -= 1;

    setAllProducts(newProductsData);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div className={style.products}>
      {allProducts &&
        allProducts.map((data, index) => {
          return (
            <Fragment key={data.id}>
              <Product
                onChange={(e) => {
                  setProductQuantity(Number(e.target.value), index);
                }}
                onClick={() => {
                  addToCart(allProducts[index]);
                }}
                data={data}
                increment={() => increment(index)}
                decrement={() => decrement(index)}
              />
            </Fragment>
          );
        })}
    </div>
  );
}

export default Products;
