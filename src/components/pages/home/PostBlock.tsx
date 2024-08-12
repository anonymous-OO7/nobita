import Link from "next/link";
import { multiFormatDateString } from "@/lib/utils";
import PostStats from "@/components/shared/PostStats";
import Image from "next/image";
import { PostBlockProps } from "@/types";

const PostBlock = ({ post }: PostBlockProps) => {
  const user = { id: 1 }; // Assuming user ID is stored somewhere
  return (
    <div className="flex justify-center mb-5">
      <div className="bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm bg-neutral-50">
        <div className="flex-between">
          <div className="flex items-center gap-3 ">
            <Link href={`/profile/${post.user.id}`}>
              <img
                src="/assets/icons/profile-placeholder.svg"
                alt="creator"
                className="w-12 lg:h-12 rounded-full"
              />
            </Link>

            <div className="flex flex-col">
              <p className="text-[16px] text-black font-poppins font-medium leading-[140%] lg:body-bold text-light-1">
                {post.user.name}
              </p>
              <div className="flex justify-center items-center gap-2 text-light-3">
                <p className="text-[12px] text-black font-semibold font-poppins leading-[140%] lg:text-[14px] lg:font-normal lg:leading-[140%] ">
                  {multiFormatDateString(post.createdDate)}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/update-post/${post.id}`}
            className={`${user.id !== post.user.id && "hidden"}`}
          >
            <Image
              width={20}
              height={20}
              src="/assets/icons/edit.svg"
              alt="edit"
            />
          </Link>
        </div>

        <Link href={`/posts/${post.id}`}>
          <div className="text-[14px] font-poppins font-medium leading-[140%] lg:text-[16px] lg:font-medium lg:leading-[140%] py-5">
            <p className="text-black font-semibold font-poppins">
              {post.title}
            </p>
            <ul className="flex font-semibold  text-sm font-poppins gap-1 mt-2">
              {post.tags.split(",").map((tag, index) => (
                <li
                  key={`${tag}${index}`}
                  className="text-light-3 small-regular"
                >
                  {tag.trim()}
                </li>
              ))}
            </ul>
          </div>

          {/* <img
            src={post.mediaUrl}
            alt="post image"
            className="h-64 xs:h-[350px] lg:h-[400px] w-full rounded-[24px] object-cover mb-5"
          /> */}
          <Image
            width={100}
            height={100}
            className="h-64 xs:h-[350px] lg:h-[400px] w-full rounded-[24px] object-cover mb-5"
            src={post.mediaUrl}
            // src={
            //   "https://kinsta.com/wp-content/uploads/2019/08/jpg-vs-jpeg.jpg"
            // }
            alt="File"
            unoptimized={true} //remove in production
          />
        </Link>

        <PostStats post={{ post: post }} />
      </div>
    </div>
  );
};

export default PostBlock;
