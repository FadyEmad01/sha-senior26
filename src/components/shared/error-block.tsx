import { cn } from "@/lib/utils";

interface ErrorBlockProps {
  title?: string;
  message: string;
  className?: string;
}

export function ErrorBlock({
  title = "Error",
  message,
  className,
}: ErrorBlockProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive",
        className,
      )}
      role="alert"
    >
      <p className="font-medium">{title}</p>
      <p className="mt-1">{message}</p>
    </div>
  );
}
