"use client";
import React, { useEffect, useState } from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import useApi from "@/hooks/useApi";
import { GetBlogPost } from "@/apis";
import Menu from "@/components/pages/blogs/Menu/Menu";
import { File } from "megajs";

const SinglePage = ({ params }) => {
  const { makeApiCall } = useApi();
  const { slug } = params;

  // State for the post data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // New state specifically for the Mega.nz image URL
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // useEffect for fetching the main post data
  useEffect(() => {
    setLoading(true);
    setError(null);
    makeApiCall(GetBlogPost(slug))
      .then((response) => {
        if (response?.data) {
          setData(response.data);
          setError(null);
        } else {
          setError("No data returned");
        }
      })
      .catch((err) => {
        setError("Error fetching post");
        console.error("Error fetching post", err);
      })
      .finally(() => setLoading(false));
  }, [makeApiCall, slug]);

  // New useEffect to handle downloading the image from Mega.nz
  // This runs only when the main post data has been successfully fetched
  useEffect(() => {
    // Ensure we have data and a mega URL to process
    if (!data || !data.img || !data.img.includes("mega.nz")) {
      return;
    }

    let objectUrl; // To hold the URL for cleanup

    const loadImageFromMega = async () => {
      setImageLoading(true);
      try {
        const file = File.fromURL(data.img);
        const buffer = await file.downloadBuffer(); // Download file data
        const blob = new Blob([buffer]); // Create a blob
        objectUrl = URL.createObjectURL(blob); // Create a temporary local URL
        setImageUrl(objectUrl);
      } catch (err) {
        console.error("Failed to load image from Mega.nz", err);
        // You could set an error state for the image here if needed
      } finally {
        setImageLoading(false);
      }
    };

    loadImageFromMega();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [data]); // Dependency array: runs when 'data' changes

  const getImageSrc = (img) => {
    if (!img) return null;
    if (img.startsWith("data:image")) return img;
    return `data:image/png;base64,${img}`;
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  const formattedDate = data.created_at
    ? new Date(data.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.user}>
            {data.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={getImageSrc(data.user.image)}
                  alt={data.user.name || "User avatar"}
                  fill
                  className={styles.avatar}
                  sizes="80px"
                  unoptimized
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data.user?.name}</span>
              <span className={styles.date}>{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className={styles.imageContainer}>
          {imageLoading && <p>Loading image...</p>}
          {imageUrl && !imageLoading && (
            <Image
              src={imageUrl}
              alt={data.title || ""}
              fill
              className={styles.image}
              unoptimized
              sizes="(max-width: 768px) 100vw, 600px"
            />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data.desc }}
          />
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
