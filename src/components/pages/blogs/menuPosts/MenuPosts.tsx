import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css";

interface Post {
  slug: string;
  title: string;
  cat: {
    slug: string;
  };
  user: {
    name: string;
  };
  createdAt: string;
  img?: string | null;
}

interface MenuPostsProps {
  withImage: boolean;
  posts: Post[];
}

const MenuPosts: React.FC<MenuPostsProps> = ({ withImage, posts }) => {
  // Helper to format date from ISO string to something like "dd.mm.yyyy"
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getImageSrc = (img: string) => {
    if (img.startsWith("data:image")) return img; // full base64 URI
    return `data:image/png;base64,${img}`; // wrap base64 string
  };

  return (
    <div className={styles.items}>
      {posts.length === 0 && <p>No posts available</p>}
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blogs/posts/${post.slug}`}
          className={styles.item}
        >
          {withImage && post.img && (
            <div className={styles.imageContainer}>
              <Image
                src={getImageSrc(post?.img)}
                alt={post.title}
                fill
                className={styles.image}
                priority={true}
              />
            </div>
          )}
          <div className={styles.textContainer}>
            <span
              className={`${styles.category} ${styles[post.cat.slug] || ""}`}
            >
              {post.cat.slug}
            </span>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <div className={styles.detail}>
              <span className={styles.username}>
                {post.user?.name || "Unknown"}
              </span>
              <span className={styles.date}>
                {" "}
                - {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
