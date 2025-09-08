import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Workist Blogs</b> Explore insights
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>

        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Latest in AI for Manufacturing: Efficiency, Innovation, Success
          </h1>
          <p className={styles.postDesc}>
            Read expert-written blogs designed for professionals in
            manufacturing, wholesale, and SMEs. Discover actionable strategies,
            the latest industry trends, and expert analysis that drive business
            transformation—straight from Workist's thought leaders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
