import Link from "next/link";
import styles from "./Product.module.scss";
import Image from "next/image";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const ProductView = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={styles.product}>
      <div className={styles.product__title}>Product</div>

      {products?.length === 0 ? (
        <div className={styles.product__content}>
          <div className={styles.product__content__skeleton}>
            <div className={styles.product__content__skeleton__image}></div>
            <div className={styles.product__content__skeleton__name}></div>
            <div className={styles.product__content__skeleton__category}></div>
            <div className={styles.product__content__skeleton__price}></div>
          </div>
        </div>
      ) : (
        <div className={styles.product__content}>
          {products?.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className={styles.product__content__item}>
              <div className={styles.product__content__item__image}>
                <Image src={product.image} alt={product.name} className="h-50" width={200} height={200} />
              </div>

              <h4 className={styles.product__content__item__name}>{product.name}</h4>

              <p className={styles.product__content__item__price}>
                {product.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>

              <p className={styles.product__content__item__category}>{product.category}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductView;
