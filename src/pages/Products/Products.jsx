import { useStoreAPI } from "../../components/hooks/useStoreAPI";

import style from "./Products.module.css";

function Products() {
  const [productsData, loading, error] = useStoreAPI();

  console.log(productsData);
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
