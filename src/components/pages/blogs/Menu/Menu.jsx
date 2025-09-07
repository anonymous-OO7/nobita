"use client";

import React, { useState, useEffect } from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import MenuPosts from "../menuPosts/MenuPosts.tsx";
import MenuCategories from "../menuCategories/MenuCategories";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import { GetAllBlogSpecialPostsList } from "@/apis";

const Menu = () => {
  const { makeApiCall } = useApi();
  const [editorsPickPosts, setEditorsPickPosts] = useState([]);
  const [mostPopularPosts, setMostPopularPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    makeApiCall(GetAllBlogSpecialPostsList())
      .then((response) => {
        // Assuming the API response structure
        // {
        //   editors_pick_posts: [...],
        //   most_popular_posts: [...],
        //   ...
        // }
        if (
          response?.editors_pick_posts &&
          Array.isArray(response.editors_pick_posts)
        ) {
          setEditorsPickPosts(response.editors_pick_posts);
        } else {
          setEditorsPickPosts([]);
        }

        if (
          response?.most_popular_posts &&
          Array.isArray(response.most_popular_posts)
        ) {
          setMostPopularPosts(response.most_popular_posts);
        } else {
          setMostPopularPosts([]);
        }
      })
      .catch((err) => {
        setError("Error fetching special posts");
        console.error("Error fetching special posts:", err);
        setEditorsPickPosts([]);
        setMostPopularPosts([]);
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts posts={mostPopularPosts} withImage={false} />

      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />

      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <MenuPosts posts={editorsPickPosts} withImage={true} />

      <Link href="/blogs/write" onClick={() => router.push("/blogs/write")}>
        <span className={styles.writeButton}>Write a Blog</span>
      </Link>
    </div>
  );
};

export default Menu;
