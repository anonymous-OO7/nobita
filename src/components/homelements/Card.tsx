import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";

// Define a props interface in TypeScript
interface InfoCardProps {
  avatarUrl: string;
  fullName: string;
  username: string;
  bio: string;
  hashtags: string;
  emoji: string;
  followingCount: number;
  followersCount: string;
}

export default function InfoCard({
  avatarUrl,
  fullName,
  username,
  bio,
  hashtags,
  emoji,
  followingCount,
  followersCount,
}: InfoCardProps) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="bg-slate-100 w-[100%]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={avatarUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600 font-poppins">
              {fullName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400 font-poppins">
              @{username}
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200 font-poppins"
              : "font-poppins"
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small font-poppins text-default-400">
        <p>{bio}</p>
        <span className="pt-2">
          {hashtags}
          <span className="py-2" aria-label="computer" role="img">
            {emoji}
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small font-poppins">
            {followingCount}
          </p>
          <p className="text-default-400 text-small font-poppins">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small font-poppins">
            {followersCount}
          </p>
          <p className="text-default-400 text-small font-poppins">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
}
