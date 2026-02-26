import Styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={Styles.error}>
      <img src="/404.png" alt="" className={Styles.error_image} />
      <div>404 | Halaman tidak ditemukan</div>
    </div>
  );
};
export default Custom404;
