
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function Loading({ size = "md", className, text }: LoadingProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-budget-gray-300 border-t-primary",
          sizes[size]
        )}
      />
      {text && (
        <p className="text-sm text-budget-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
}

export function LoadingCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border border-budget-gray-200 p-6 bg-white", className)}>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-budget-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-budget-gray-200 rounded"></div>
          <div className="h-3 bg-budget-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

export function LoadingButton() {
  return (
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      <span>Cargando...</span>
    </div>
  );
}
