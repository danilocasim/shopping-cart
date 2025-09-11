import { useEffect, useState } from "react";

function useStoreAPI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const storeData = await (
          await fetch("https://fakestoreapi.com/products", {
            signal: controller.signal,
          })
        ).json();

        setData(storeData);
        setError(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return [data, loading, error];
}

export { useStoreAPI };
