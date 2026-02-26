import { fetcher } from "@/lib/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduct from "@/views/DetailProduct";
import { exp } from "firebase/firestore/pipelines";
import { ProductType } from "@/types/product.type";

const DetailProductPage = ({ product }: { product: ProductType }) => {
  const { query } = useRouter();

  /* client-side */
  // const { data, error, isLoading } = useSWR(`/api/product/${query.product}`, fetcher);

  return (
    <div>
      {/* client-side */}
      {/* <DetailProduct product={isLoading ? {} : data.data} /> */}
      {/* server-side & static generation */}
      <DetailProduct product={product} />
    </div>
  );
};

export default DetailProductPage;

export async function getStaticPaths() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/product`);
  const response = await res.json();

  const paths = response.data.map((product: ProductType) => ({
    params: { product: product.id },
  }));

  return { paths, fallback: false };
}

// export async function getServerSideProps({ params }) {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:3000/api/product/${params.product}`);
//   const response = await res.json();

//   return {
//     props: {
//       product: response.data,
//     },
//   };
// }

// This gets called at build time

export const getStaticProps = async ({ params }: { params: { product: string } }) => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/product/${params.product}`);

  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
  };
};
