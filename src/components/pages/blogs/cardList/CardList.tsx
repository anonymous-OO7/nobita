"use client";

import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import useApi from "@/hooks/useApi";
import { GetAllBlogPostsList } from "@/apis";
import { useSearchParams } from "next/navigation";
interface Category {
  id: string;
  slug: string;
  title: string;
  img?: string | null;
  posts?: any; // can be refined if needed
  created_at: string;
  updated_at: string;
}

interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Name: string;
  Email: string;
  Password: string;
  Role: string;
  Username: string;
  Phone: string;
  Otp: string;
  Uuid: string;
}

interface Post {
  ID: string;
  slug: string;
  title: string;
  desc: string;
  img?: string | null;
  img_name?: string | null;
  views: number;
  cat_slug: string;
  cat: Category;
  user_email: string;
  user: User;
  comments?: any;
  CreatedAt: string;
  UpdatedAt: string;
}

interface PostsResponse {
  current_page: number;
  data: Post[];
  message: string;
  total_items: number;
  total_pages: number;
}

interface CardListProps {
  cat?: string;
}

const POST_PER_PAGE = 4;

const CardList: React.FC<CardListProps> = ({ cat }) => {
  const { makeApiCall } = useApi();
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;

  useEffect(() => {
    setLoading(true);
    makeApiCall(GetAllBlogPostsList(page, POST_PER_PAGE))
      .then((response: PostsResponse) => {
        if (response?.data) {
          setPosts(response.data || []);
          setCount(response.total_items || 0);
          setError(null);
        } else {
          setError("No data returned");
        }
      })
      .catch((err: any) => {
        setError("Error fetching posts");
        console.error("Error fetching posts:", err);
      })
      .finally(() => setLoading(false));
  }, [makeApiCall, page]);

  const hasPrev = page > 1;
  const hasNext = page < Math.ceil(count / POST_PER_PAGE);

  if (loading) return <div className={styles.container}>Loading posts...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts.map((item) => (
          <Card item={item} keyProp={item.ID} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
