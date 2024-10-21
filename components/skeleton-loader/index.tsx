import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-2 pt-3">
      <Skeleton className="h-6 w-1/2 mx-auto mb-2" />{" "}
      {/* You can adjust the number of skeletons based on your design */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-2">
          <Skeleton className="h-5 w-3/4 mb-1" /> {/* Title skeleton */}
          <div className="flex items-start justify-between">
            <Skeleton className="h-4 w-1/2" />{" "}
            {/* Company & location skeleton */}
            <Skeleton className="h-4 w-1/4" /> {/* Date skeleton */}
          </div>
          <Skeleton className="h-3 w-full mt-1" /> {/* Work summary skeleton */}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
