"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./singlePage.module.css";
import Image from "next/image";
import useApi from "@/hooks/useApi";
import { GetBlogPost } from "@/apis";
import Menu from "@/components/pages/blogs/Menu/Menu";
import { File } from "megajs";
// Import Link for category navigation
import Link from "next/link";

const SinglePage = ({ params }) => {
  const { makeApiCall } = useApi();
  const { slug } = params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const getExcerpt = (html, length = 150) => {
    if (!html) return "";
    const text = html.replace(/<[^>]*>/g, "").trim();
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    makeApiCall(GetBlogPost(slug))
      .then((response) => {
        if (response?.data) {
          setData(response.data);
          // Changed to 'Workist' as per your new title example
          document.title = `${response.data.title || "Blog Post"} | Workist`;
        } else {
          setError("No data returned");
          document.title = "Blog Post Not Found | Workist";
        }
      })
      .catch((err) => {
        console.error("Error fetching post", err);
        setError("Error fetching post");
        document.title = "Error Loading Post | Workist";
      })
      .finally(() => setLoading(false));
  }, [makeApiCall, slug]);

  useEffect(() => {
    if (!data?.img || !data.img.includes("mega.nz")) return;

    let objectUrl;
    const loadImageFromMega = async () => {
      setImageLoading(true);
      try {
        if (typeof File.fromURL !== "function") {
          console.error("Mega.js File.fromURL not available.");
          return;
        }

        const file = File.fromURL(data.img);
        const buffer = await file.downloadBuffer();
        const blob = new Blob([buffer]);
        objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      } catch (err) {
        console.error("Failed to load image from Mega.nz", err);
      } finally {
        setImageLoading(false);
      }
    };
    loadImageFromMega();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [data]);

  const getImageSrc = (img) => {
    if (!img) return null;
    if (img.startsWith("data:image")) return img;
    return `data:image/png;base64,${img}`;
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  // Use data.CreatedAt for formatting and time tag
  const formattedDate = data.CreatedAt
    ? new Date(data.CreatedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const description = getExcerpt(data.desc);
  const canonicalUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `YOUR_DOMAIN/${slug}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    image:
      imageUrl || (data.img && !data.img.includes("mega.nz") ? data.img : null),
    datePublished: data.CreatedAt,
    dateModified: data.UpdatedAt || data.CreatedAt,
    author: {
      "@type": "Person",
      name: data.user?.Name || "workist",
    },
    publisher: {
      "@type": "Organization",
      name: "Workist",
      logo: {
        "@type": "ImageObject",
        url: "URL_TO_YOUR_BLOG_LOGO",
      },
    },
    description: description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <>
      <Head>
        {/* Title updated in useEffect, but kept here for initial server render */}
        <title>{data.title} | Workist</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={schemaData.image} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <main className={`${styles.container} poppins`}>
        <div className={styles.header}>
          <h1 className={styles.title}>{data.title}</h1>

          <div className={styles.user}>
            {data.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={getImageSrc(data.user.image)}
                  alt={data.user.Name || "User avatar"}
                  fill
                  className={styles.avatar}
                  sizes="80px"
                  unoptimized
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              {/* --- NEW STRUCTURE FOR SINGLE ROW --- */}
              <span className={styles.username}>{data.user?.Name}</span>

              {/* Category Link */}
              {data.cat?.title && (
                <Link
                  href={`/blogs?cat=${data.cat.slug}`}
                  className={styles.categoryBadge}
                >
                  {data.cat.title}
                </Link>
              )}

              <span className={styles.dateSeparator}>|</span>

              {/* Date */}
              <time dateTime={data.CreatedAt} className={styles.date}>
                {formattedDate}
              </time>
              {/* ------------------------------------- */}
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {imageLoading && <p>Loading image...</p>}
          {imageUrl && !imageLoading && (
            <div className={styles.imageContainer}>
              <Image
                src={imageUrl}
                alt={data.title || "Main blog image"}
                fill
                className={styles.image}
                unoptimized
                sizes="100vw"
              />
            </div>
          )}

          <article className={styles.post}>
            <div
              className={`${styles.description} font-poppins font-light text-black`}
              dangerouslySetInnerHTML={{ __html: data.desc }}
            />
          </article>

          <aside className={styles.menuWrapper}>
            <Menu />
          </aside>
        </div>
      </main>
    </>
  );
};

export default SinglePage;
