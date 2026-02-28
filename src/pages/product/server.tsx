import ProductView from "@/views/Products";
import { ProductType } from "../../types/product.type";

const ProductPage = (props: { products: ProductType[] }) => {
  const { products } = props;

  return (
    <div>
      <ProductView products={products} />
    </div>
  );
};

export default ProductPage;

// This gets called on every request
export const getServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`);

  const response = await res.json();

  return {
    props: {
      products: response.data,
    },
  };
};
