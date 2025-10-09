import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { File } from "megajs";

const Card = ({ keyProp, item }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!item.img) {
      setImageUrl(null);
      return;
    }

    let objectUrl;

    const processImage = async () => {
      if (item.img.includes("mega.nz")) {
        try {
          const file = File.fromURL(item.img);
          const buffer = await file.downloadBuffer();
          const blob = new Blob([buffer]);
          objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
        } catch (error) {
          console.error("Failed to load Mega.nz image:", error);
          setImageUrl(null);
        }
      } else {
        const src = item.img.startsWith("data:image")
          ? item.img
          : `data:image/png;base64,${item.img}`;
        setImageUrl(src);
      }
    };

    processImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [item.img]);

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "";

  const excerpt = item.desc
    ? item.desc.replace(/<[^>]*>/g, "").slice(0, 100) + "..."
    : "";

  return (
    <div className={styles.container} key={keyProp}>
      {/* Image Section */}
      {imageUrl && (
        <Link
          href={`/blogs/posts/${item.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageContainer}
        >
          <Image
            src={imageUrl}
            alt={item.title || "Blog Post"}
            fill
            className={styles.image}
            unoptimized
            style={{ objectFit: "cover" }}
          />
        </Link>
      )}

      {/* Content Section */}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{formatDate(item?.CreatedAt)}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.categoryChip}>
            {item.cat_slug?.charAt(0).toUpperCase() + item.cat_slug?.slice(1)}
          </span>
        </div>

        <Link
          href={`/blogs/posts/${item.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.titleLink}
        >
          <h2 className={styles.title}>{item.title}</h2>
        </Link>

        <p className={styles.desc}>{excerpt}</p>

        <Link
          href={`/blogs/posts/${item.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default Card;
