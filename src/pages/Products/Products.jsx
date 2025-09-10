import { useStoreAPI } from "../../components/hooks/useStoreAPI";
import Product from "../../components/Product/Product";
import { Fragment } from "react";
import style from "./Products.module.css";
import { useOutletContext } from "react-router";

function Products() {
  const [productsData, setProductsData, loading, error] = useStoreAPI();
  const [checkoutItems, setCheckoutItems] = useOutletContext();

  function addToCart(data) {
    const newCheckoutItems = [...checkoutItems];

    const isProductExist = newCheckoutItems.some((product) => {
      if (product) return product.id === data.id;
    });

    if (isProductExist) {
      const index = newCheckoutItems.findIndex(
        (product) => product.id === data.id
      );
      newCheckoutItems.map((product, productIndex) => {
        if (productIndex === index) {
          return (product.quantity += data.quantity);
        }
      });

      setCheckoutItems(newCheckoutItems);

      return;
    }

    newCheckoutItems.push(data);

    setCheckoutItems(newCheckoutItems);
  }

  function setProductQuantity(value, index) {
    const updatedQuanties = [...productsData];
    updatedQuanties[index].quantity = value;
    setProductsData(updatedQuanties);
  }

  function resetProductsQuantity() {
    const resetProductsQuantity = productsData.map((product) => ({
      ...product,
      quantity: (product.quantity = 1),
    }));

    setProductsData(resetProductsQuantity);
  }

  function increment(index) {
    const newProductsData = [...productsData];
    newProductsData[index].quantity += 1;
    console.log(newProductsData);

    setProductsData(newProductsData);
  }

  function decrement(index) {
    const newProductsData = [...productsData];
    if (newProductsData[index].quantity >= 2)
      newProductsData[index].quantity -= 1;

    setProductsData(newProductsData);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div className={style.products}>
      <h1>Products</h1>
      {productsData &&
        productsData.map((data) => {
          return (
            <div className={style.productWrapper} key={data.id}>
              <img
                className={style.productImage}
                src={data.image}
                alt={data.title}
              />

              <p>{data.title}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Products;
