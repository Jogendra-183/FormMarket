import { cn } from "./utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden bg-muted rounded-md",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:animate-[shimmer_2s_infinite]",
        className
      )}
      {...props}
    />
  );
}

// Product card skeleton
function ProductSkeleton({ className }) {
  return (
    <div className={cn("rounded-2xl border bg-card p-4 space-y-4", className)}>
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
    </div>
  );
}

// Table row skeleton
function TableRowSkeleton({ columns = 4 }) {
  return (
    <tr className="border-b">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

// Stats card skeleton
function StatsSkeleton({ className }) {
  return (
    <div className={cn("rounded-2xl border bg-card p-6 space-y-4", className)}>
      <div className="flex justify-between items-start">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

// Avatar skeleton
function AvatarSkeleton({ size = "md" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };
  return <Skeleton className={cn("rounded-full", sizeClasses[size])} />;
}

export {
  Skeleton,
  ProductSkeleton,
  TableRowSkeleton,
  StatsSkeleton,
  AvatarSkeleton
};
