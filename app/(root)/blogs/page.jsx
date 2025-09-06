"use client";

import Link from "next/link";
import styles from "./homepage.module.css";
import CategoryList from "../../../src/components/pages/blogs/categoryList/CategoryList.tsx";
import Featured from "../../../src/components/pages/blogs/featured/Featured";
import CardList from "../../../src/components/pages/blogs/cardList/CardList";
import Menu from "../../../src/components/pages/blogs/Menu/Menu";

export default function Home() {
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList />
        <Menu />
      </div>
    </div>
  );
}
