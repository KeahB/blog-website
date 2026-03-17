const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg ${className}`} />
);

const PostSkeleton = () => (
  <div className="mb-12">
    <div className="flex gap-4 mb-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
    <Skeleton className="h-10 w-3/4 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-2/3 mb-6" />
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  </div>
);

export { Skeleton, PostSkeleton };
