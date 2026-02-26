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
  const res = await fetch(`http://localhost:3000/api/product`);

  const response = await res.json();

  console.info(response);

  return {
    props: {
      products: response.data,
    },
  };
};
