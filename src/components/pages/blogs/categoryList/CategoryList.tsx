"use client";
import React, { useEffect, useState } from "react";
import styles from "./categoryList.module.css";
import Image from "next/image";
import { GetAllBlogCategories } from "../../../../../src/apis";
import useApi from "@/hooks/useApi";
import clsx from "clsx";
import { useSearchParams, useRouter } from "next/navigation";

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

  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams?.get("category") ?? "";

  useEffect(() => {
    setLoading(true);
    makeApiCall(GetAllBlogCategories())
      .then((response) => {
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

  const handleCategoryClick = (slug: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("category", slug);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data.map((item) => (
          <div
            key={item.id}
            className={clsx(
              styles.category,
              styles[item.slug],
              category === item.slug && styles.activeCategory
            )}
            onClick={() => handleCategoryClick(item.slug)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCategoryClick(item.slug);
              }
            }}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
