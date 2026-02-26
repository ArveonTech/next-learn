import { fetcher } from "@/lib/swr/fetcher";
import ProductView from "@/views/Products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const ProductPage = () => {
  // const [products, setProducts] = useState([]);
  const { push } = useRouter();

  // useEffect(() => {
  //   push("/");
  // }, []);

  // useEffect(() => {
  //   fetch("/api/product")
  //     .then((res) => res.json())
  //     .then((response) => setProducts(response.data));
  // }, []);

  const { data, error, isLoading } = useSWR(`/api/product`, fetcher);

  return (
    <div>
      <ProductView products={isLoading ? [] : data.data} />
    </div>
  );
};

export default ProductPage;
