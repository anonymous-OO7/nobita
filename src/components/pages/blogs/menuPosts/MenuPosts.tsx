// src/components/menuPosts/MenuPosts.jsx

import React from "react";
import styles from "./menuPosts.module.css";
import MenuPostItem from "./MenuPostItem"; // <-- Import the new component

interface Post {
  slug: string;
  title: string;
  cat: {
    slug: string;
  };
  user: {
    Name: string;
  };
  CreatedAt: string;
  img?: string | null;
}

interface MenuPostsProps {
  withImage: boolean;
  posts: Post[];
}

const MenuPosts: React.FC<MenuPostsProps> = ({ withImage, posts }) => {
  return (
    <div className={styles.items}>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <MenuPostItem key={post.slug} post={post} withImage={withImage} />
        ))
      )}
    </div>
  );
};

export default MenuPosts;
