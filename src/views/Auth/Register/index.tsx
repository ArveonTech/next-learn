import styles from "./Register.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const RegisterView = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.status === 200) {
      setLoading(false);
      push("/auth/login");
    } else {
      setLoading(false);
      setError(result.status === 400 ? result.message : "Something went wrong");
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register Page</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="email" className={styles.register__form__item__label}>
              Email
            </label>
            <input className={styles.register__form__item__input} type="email" id="email" name="email" placeholder="email" />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="full_name" className={styles.register__form__item__label}>
              Full Name
            </label>
            <input className={styles.register__form__item__input} type="text" id="full_name" name="full_name" placeholder="Full Name" />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="password" className={styles.register__form__item__label}>
              Password
            </label>
            <input className={styles.register__form__item__input} type="password" id="password" name="password" placeholder="Password" />
          </div>
          <button type="submit" className={styles.register__form__item__button}>
            {loading ? "...Loading" : "Register"}
          </button>
        </form>
      </div>
      <p>
        Already have an account?{" "}
        <Link href="/auth/login" className={styles.register__form__item}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterView;
