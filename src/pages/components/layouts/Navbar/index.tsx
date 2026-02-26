import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { data }: any = useSession();

  console.log(data);

  return (
    <div className={styles.navbar}>
      <div className="big">Navbar</div>
      <div className="flex gap-4 items-center">
        {data && data.user.full_name ? <p>Welcome, {data.user.full_name}!</p> : null}
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
