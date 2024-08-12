"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Save from "../../assets/icons/save.svg";
import Saved from "../../assets/icons/saved.svg";
import Upvote from "../../assets/icons/upvote.svg";
import ToUpvote from "../../assets/icons/toupvote.svg";
import Comment from "../../assets/reply.svg";
import ThreadCard from "../cards/ThreadCard";
import { PostBlockProps } from "@/types";

interface Props {
  post: PostBlockProps;
}

const PostStats = ({ post }: Props) => {
  const [currentPost, setCurrentPost] = useState<PostBlockProps>(post);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [userLiked, setUserLiked] = useState(false); // Tracks whether the user has liked the post

  const result = {
    posts: [
      {
        _id: "post1",
        parentId: null,
        text: "This is a sample post.",
        author: {
          name: "John Doe",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXtaVmOb4HrB308wM_c3Nk8hHx2ek5XqRpKQ&s",
          id: "author123",
        },
        community: {
          id: "community123",
          name: "Sample Community",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ixVFEPim519RhOyS0gmudwl0LJLGOyaSFA&s",
        },
        createdAt: "2024-03-07T12:00:00Z",
        children: [
          {
            _id: "comment1",
            parentId: "post1",
            text: "This is a comment.",
            author: {
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRopJ_-xFVPkHg66dbAjpMBNHOyIBNbMpF9IA&s",
            },
            community: null,
            createdAt: "2024-03-07T12:30:00Z",
            children: [],
          },
        ],
      },
      // Add more posts as needed
    ],
  };

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    like: boolean,
  ) => {
    e.stopPropagation();

    const updatedPost = { ...currentPost.post };

    if (like && !userLiked) {
      // User is liking the post
      updatedPost.votes += 1;
      setUserLiked(true); // Set that the user has liked the post
    } else if (!like && userLiked) {
      // User is unliking the post
      updatedPost.votes -= 1;
      setUserLiked(false); // Set that the user no longer likes the post
    }

    setCurrentPost({ post: updatedPost });
  };

  return (
    <div>
      <div className={`flex justify-between items-center z-20 w-full`}>
        <div className="flex gap-2 mr-5 bg-gray-200 shadow p-1 rounded-full">
          <Image
            src={userLiked ? Upvote : ToUpvote}
            alt="like"
            width={20}
            height={20}
            onClick={(e) => handleLikePost(e, true)}
            className="cursor-pointer"
          />
          <p className="font-poppins font-light text-black small-medium lg:base-medium">
            {currentPost.post.votes}
          </p>
          <Image
            src={userLiked ? ToUpvote : Upvote}
            alt="unlike"
            width={20}
            height={20}
            onClick={(e) => handleLikePost(e, false)}
            className="cursor-pointer transform rotate-180"
          />
          <div className="flex gap-4 ml-5">
            <Image
              src={Comment}
              alt="share"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => setShowComments(!showComments)}
            />
          </div>
        </div>

        <div className="flex gap-2 shadow bg-slate-100 p-2 rounded-full">
          <Image
            src={isSaved ? Saved : Save}
            alt="save"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleSavePost}
          />
        </div>
      </div>
      {showComments && (
        <section className="mt-9 flex flex-col gap-10">
          {result.posts.map((post) => (
            <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={"abc"}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default PostStats;
