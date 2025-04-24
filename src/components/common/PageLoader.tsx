import { Skeleton } from "@heroui/react";

export default function PageLoader() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full flex items-center gap-3 p-4 bg-white rounded-lg shadow-lg">
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-[10vh] w-4/5 rounded-lg" />
          <Skeleton className="h-[10vh] w-4/5 rounded-lg" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-[10vh] w-3/5 rounded-lg" />
          <Skeleton className="h-[10vh] w-4/5 rounded-lg" />
        </div>
      </div>
      <div className="w-full flex items-center gap-3 p-4 bg-white rounded-lg shadow-lg">
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-[10vh] w-4/5 rounded-lg" />
          <Skeleton className="h-[10vh] w-4/5 rounded-lg" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-[10vh] w-3/5 rounded-lg" />
          <Skeleton className="h-[10vh] w-4/5 rounded-lg" />
        </div>
      </div>
      <div className="w-full flex items-center gap-3 p-4 bg-white rounded-lg shadow-lg">
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-[10vh] w-4/5 rounded-lg" />
          <Skeleton className="h-[10vh] w-4/5 rounded-lg" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-[10vh] w-3/5 rounded-lg" />
          <Skeleton className="h-[10vh] w-4/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
