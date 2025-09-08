import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ keyProp, item }) => {
  const getImageSrc = (img) => {
    if (!img) return null;
    if (img.startsWith("data:image")) return img; // full base64 URI
    return `data:image/png;base64,${img}`; // wrap base64 string
  };

  const imageSrc = getImageSrc(item.img);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const d = new Date(dateString);
      return d.toISOString().substring(0, 10);
    } catch {
      return "";
    }
  };

  const excerpt = item.desc
    ? item.desc.length > 60
      ? item.desc.substring(0, 50) + "..."
      : item.desc
    : "";

  // Capitalize category for display
  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

  return (
    <div className={styles.container} key={keyProp}>
      {/* {imageSrc && (
        <div className={styles.imageContainer}>
          <Link href={`/blogs/posts/${item.slug}`} passHref legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.titleLink}
            >
              <Image
                src={imageSrc}
                alt={item.title || ""}
                fill
                style={{ objectFit: "cover" }}
                unoptimized={true}
              />
            </a>
          </Link>
        </div>
      )} */}

      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            Published on {formatDate(item?.CreatedAt)} -{" "}
          </span>
          <span className={styles.categoryChip}>
            {capitalize(item.cat_slug)}
          </span>
        </div>
        <Link href={`/blogs/posts/${item.slug}`} passHref legacyBehavior>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={styles.titleLink}
          >
            <h1 className={styles.title}>{item.title}</h1>
          </a>
        </Link>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <Link href={`/blogs/posts/${item.slug}`} passHref legacyBehavior>
          <a target="_blank" rel="noopener noreferrer" className={styles.link}>
            Read More
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
