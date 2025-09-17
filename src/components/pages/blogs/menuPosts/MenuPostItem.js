// src/components/menuPosts/MenuPostItem.jsx (Create this new file)

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { File } from "megajs";
import styles from "./menuPosts.module.css";

// Helper to format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const MenuPostItem = ({ post, withImage }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!post.img) return;
    let objectUrl;
    const processImage = async () => {
      if (post.img.includes("mega.nz")) {
        try {
          const file = File.fromURL(post.img);
          const buffer = await file.downloadBuffer();
          const blob = new Blob([buffer]);
          objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
        } catch (error) {
          console.error("Failed to load Mega.nz image for menu:", error);
          setImageUrl(null);
        }
      } else {
        const src = post.img.startsWith("data:image")
          ? post.img
          : `data:image/png;base64,${post.img}`;
        setImageUrl(src);
      }
    };

    processImage();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [post.img]);

  return (
    <Link href={`/blogs/posts/${post.slug}`} className={styles.item}>
      {withImage && imageUrl && (
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className={styles.image}
            unoptimized={true} // Use unoptimized for blobs/base64
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles[post.cat.slug] || ""}`}>
          {post.cat.slug}
        </span>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <div className={styles.detail}>
          <span className={styles.username}>
            {post.user?.Name || "Unknown"}
          </span>
          <span className={styles.date}> - {formatDate(post?.CreatedAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default MenuPostItem;
