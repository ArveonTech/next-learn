import Styles from "@/styles/404.module.scss";
import Image from "next/image";

const Custom404 = () => {
  return (
    <div className={Styles.error}>
      <Image src="/404.png" alt="404" className={Styles.error_image} width={100} height={100}/>
      <div>404 | Halaman tidak ditemukan</div>
    </div>
  );
};
export default Custom404;
