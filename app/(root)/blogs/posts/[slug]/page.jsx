"use client";
import React, { useEffect, useState } from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
// import Comments from "../../../../../src/components/pages/blogs/comments/Comments";

import useApi from "@/hooks/useApi";
import { GetBlogPost } from "@/apis";
import Menu from "@/components/pages/blogs/Menu/Menu";

const SinglePage = ({ params }) => {
  const { makeApiCall } = useApi();
  const { slug } = params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const isBase64Image = (src) =>
    typeof src === "string" && src.startsWith("data:image");

  // prep image src: if just raw base64 string, wrap with data URI prefix
  const getImageSrc = (img) => {
    if (!img) return null;
    if (img.startsWith("data:image")) return img;
    return `data:image/png;base64,${img}`;
  };

  if (loading) return <p>Loading...</p>;
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
                  unoptimized={isBase64Image(data.user.image)}
                  sizes="80px"
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data.user?.name}</span>
              <span className={styles.date}>{formattedDate}</span>
            </div>
          </div>
        </div>
        {data.img && (
          <div className={styles.imageContainer}>
            <Image
              src={data.img}
              alt={data.title || ""}
              fill
              className={styles.image}
              unoptimized={isBase64Image(data.img)}
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data.desc }}
          />
          {/* <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div> */}
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
