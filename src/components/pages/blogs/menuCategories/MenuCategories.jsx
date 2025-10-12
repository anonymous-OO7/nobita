import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      {/* <Link
        href="/blog?cat=style"
        className={`${styles.categoryItem} ${styles.style}`}
      >
        Style
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.fashion}`}>
        Fashion
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.food}`}>
        Food
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.travel}`}>
        Travel
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.culture}`}>
        Culture
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.coding}`}>
        Coding
      </Link> */}
      <p
        href="/blog?cat=style"
        className={`${styles.categoryItem} ${styles.style}`}
      >
        Style
      </p>
      <p className={`${styles.categoryItem} ${styles.fashion}`}>Fashion</p>
      <p className={`${styles.categoryItem} ${styles.food}`}>Food</p>
      <p className={`${styles.categoryItem} ${styles.travel}`}>Travel</p>
      <p className={`${styles.categoryItem} ${styles.culture}`}>Culture</p>
      <p className={`${styles.categoryItem} ${styles.coding}`}>Coding</p>
      <p className={`${styles.categoryItem} ${styles.news}`}>Coding</p>
    </div>
  );
};

export default MenuCategories;
