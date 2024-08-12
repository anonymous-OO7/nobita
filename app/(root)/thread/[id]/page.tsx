// import { redirect } from "next/navigation";
// import { currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

// import { fetchUser } from "@/lib/actions/user.actions";
// import { fetchThreadById } from "@/lib/actions/thread.actions";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  // // const user = await currentUser();
  // const user = {id:'abc'}

  // if (!user) return null;

  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  // const thread = await fetchThreadById(params.id);

  // Dummy data for user and thread
  const user = {
    id: "abc",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZx_FaDAWBIP660QHI969iWhhiITLJBo4JBA&s",
  };
  const userInfo = { _id: "user123" }; // Dummy user info
  const thread = {
    _id: "thread123",
    parentId: null,
    text: "This is a sample thread.",
    author: {
      name: "John Doe",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXdd4snjw2Ov8sMudL0vUQRKs1rK2itGkhng&s",
      id: "author123",
    },
    community: {
      id: "community123",
      name: "Sample Community",
      image: "/path/to/community/image.jpg",
    },
    createdAt: "2024-03-07T12:00:00Z",
    children: [
      {
        _id: "comment123",
        parentId: "thread123",
        text: "This is a comment.",
        author: {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2dBIJL9WcHzPDQxWMinkNErKRfX2s6zG7w&s",
        },
        community: null,
        createdAt: "2024-03-07T12:30:00Z",
        children: [],
      },
    ],
  };

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map(
          (
            childItem: any, // eslint-disable-line
          ) => (
            <ThreadCard
              key={childItem._id}
              id={childItem._id}
              currentUserId={user.id}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
              community={childItem.community}
              createdAt={childItem.createdAt}
              comments={childItem.children}
              isComment
            />
          ),
        )}
      </div>
    </section>
  );
}

export default page;
