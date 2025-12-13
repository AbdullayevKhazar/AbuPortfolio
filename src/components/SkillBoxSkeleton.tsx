import { Skeleton } from "./ui/skeleton";

const SkillsBoxSkeleton = () => {
  return (
    <div
      className="flex items-start gap-4 p-4 w-full rounded-xl border
                 backdrop-blur-lg border-gray-200 bg-white/90 dark:bg-white/5
                 dark:border-white/10 shadow-md"
    >
      <Skeleton className="h-12 w-12 rounded-md" />

      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
  );
};

export default SkillsBoxSkeleton;
