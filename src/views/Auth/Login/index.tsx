import { signIn } from "next-auth/react";
import styles from "./Login.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginView = () => {
  const { push, query } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl: any = query.callbackUrl ? query.callbackUrl : "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const res = await signIn("credentials", {
        email: data.email as string,
        password: data.password as string,
        redirect: false,
        callbackUrl,
      });

      if (!res?.error) {
        push(callbackUrl);
      } else {
      setError("Email or password is incorrect");
      }
    } catch (error: any) {
      setError("Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login Page</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label htmlFor="email" className={styles.login__form__item__label}>
              Email
            </label>
            <input className={styles.login__form__item__input} type="email" id="email" name="email" placeholder="email" />
          </div>
          <div className={styles.login__form__item}>
            <label htmlFor="password" className={styles.login__form__item__label}>
              Password
            </label>
            <input className={styles.login__form__item__input} type="password" id="password" name="password" placeholder="Password" />
          </div>
          <button type="submit" className={styles.login__form__item__button}>
            {loading ? "...Loading" : "login"}
          </button>
        </form>
      </div>
      <p>
        Don't have an account?{" "}
        <Link href="/auth/register" className={styles.login__form__item}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
