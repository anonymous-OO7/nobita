// src/components/card/Card.jsx

import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { File } from "megajs";

const Card = ({ keyProp, item }) => {
  // State to hold the temporary image URL
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect to handle image processing
  useEffect(() => {
    // If there's no image URL, do nothing
    if (!item.img) {
      setImageUrl(null);
      return;
    }

    let objectUrl; // Variable to hold the URL for cleanup

    // Function to process the image source
    const processImage = async () => {
      setIsLoading(true);
      // Case 1: It's a Mega.nz URL
      if (item.img.includes("mega.nz")) {
        try {
          const file = File.fromURL(item.img);
          const buffer = await file.downloadBuffer();
          const blob = new Blob([buffer]);
          objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
        } catch (error) {
          console.error("Failed to load Mega.nz image:", error);
          setImageUrl(null); // Fallback to no image on error
        }
      }
      // Case 2: It's a Base64 string
      else {
        // This handles both full data URIs and raw base64 strings
        const src = item.img.startsWith("data:image")
          ? item.img
          : `data:image/png;base64,${item.img}`;
        setImageUrl(src);
      }
      setIsLoading(false);
    };

    processImage();

    // Cleanup function to revoke the object URL and prevent memory leaks
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [item.img]); // Rerun this effect if the item.img URL changes

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().substring(0, 10);
  };

  const excerpt = item.desc
    ? item.desc.length > 60
      ? item.desc.substring(0, 50) + "..."
      : item.desc
    : "";

  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

  return (
    <div className={styles.container} key={keyProp}>
      {imageUrl && (
        <div className={styles.imageContainer}>
          <Link href={`/blogs/posts/${item.slug}`} passHref>
            <Image
              src={imageUrl}
              alt={item.title || ""}
              fill
              style={{ objectFit: "cover" }}
              unoptimized={true}
            />
          </Link>
        </div>
      )}

      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            Published on {formatDate(item?.CreatedAt)} -{" "}
          </span>
          <span className={styles.categoryChip}>
            {capitalize(item.cat_slug)}
          </span>
        </div>
        <Link href={`/blogs/posts/${item.slug}`} passHref>
          <h1 className={styles.title}>{item.title}</h1>
        </Link>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <Link
          href={`/blogs/posts/${item.slug}`}
          passHref
          className={styles.link}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
