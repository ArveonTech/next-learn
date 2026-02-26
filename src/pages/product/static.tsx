import ProductView from "@/views/Products";
import { type ProductType } from "../../types/product.type";

const ProductPage = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <ProductView products={products} />
    </div>
  );
};

export default ProductPage;

// This gets called at build time
export const getStaticProps = async () => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/product`);

  const response = await res.json();

  return {
    props: {
      products: response.data,
    },
    // revalidate: 10,
  };
};
