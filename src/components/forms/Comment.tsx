"use client";

import { usePathname } from "next/navigation";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ currentUserImg }: Props) {
  const pathname = usePathname(); // eslint-disable-line

  const onSubmit = () => {};

  return <div>HAH</div>;
}

export default Comment;
