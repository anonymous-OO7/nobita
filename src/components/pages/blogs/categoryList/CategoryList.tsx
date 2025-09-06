"use client";
import React, { useEffect, useState } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import { GetAllBlogCategories } from "../../../../../src/apis";
import useApi from "@/hooks/useApi";

interface Category {
  id: string;
  slug: string;
  title: string;
  img?: string | null;
}

const CategoryList: React.FC = () => {
  const { makeApiCall } = useApi();
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    makeApiCall(GetAllBlogCategories())
      .then((response) => {
        console.log("API response:", response);

        if (Array.isArray(response?.categories)) {
          setData(response.categories);
        }
      })
      .catch((err) => {
        setError("Error fetching categories");
        console.error("Error fetching categories:", err);
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={item.id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt={item.title}
                width={48}
                height={48}
                className={styles.image}
              />
            )}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
