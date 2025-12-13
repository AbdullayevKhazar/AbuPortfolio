import { Skeleton } from "./ui/skeleton";

const MyWorksBoxSkeleton = () => {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl transition-all duration-300 
                 border border-gray-200 bg-white/90 dark:bg-white/5 
                 shadow-md dark:border-white/10 dark:backdrop-blur-lg"
    >
      {/* Image Skeleton */}
      <Skeleton className="w-full aspect-video" />

      <div className="flex flex-1 flex-col py-6 px-3 gap-4">
        {/* Title */}
        <Skeleton className="h-6 w-40" />

        {/* Description (3 lines) */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>

        {/* Technologies Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Bottom Buttons / Links */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWorksBoxSkeleton;
