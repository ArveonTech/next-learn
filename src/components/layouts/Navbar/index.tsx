import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Script from "next/script";

const Navbar = () => {
  const { data }: any = useSession();

  return (
    <div className={styles.navbar}>
      <Script id="onClick_title" strategy="afterInteractive">
        {"document.getElementById('title').addEventListener('click', function() { alert('You clicked the title!'); });"}
      </Script>
      <div className="big" id="title">
        Navbar
      </div>
      <div className="flex gap-4 items-center">
        {data && data.user.full_name ? <p>Welcome, {data.user.full_name}!</p> : null}
        {data && data.user && data.user.image && <Image src={data.user.image} alt="Profile" className={styles.avatar} width={40} height={40} />}
        {data ? (
          <button className={styles.button} onClick={() => signOut()}>
            Sign out
          </button>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
