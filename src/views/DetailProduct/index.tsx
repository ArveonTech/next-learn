import { ProductType } from "@/types/product.type";
import styles from "@/views/DetailProduct/DetailProduct.module.scss";

const detailProduct = ({ product }: { product: ProductType }) => {
  return (
    <>
      <h1 className={styles.title}>Detail Product</h1>
      <div>
        <div className={styles.productDetail}>
          <div className={styles.productDetail__image}>
            <img src={product.image && product.image} alt={product.name} className="h-50" />
          </div>

          <h4 className={styles.productDetail__name}>{product.name}</h4>

          <p className={styles.productDetail__price}>
            {product.price &&
              product.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
          </p>

          <p className={styles.productDetail__category}>{product.category}</p>
        </div>
      </div>
    </>
  );
};

export default detailProduct;
