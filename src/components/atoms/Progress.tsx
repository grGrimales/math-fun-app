import { cn } from "@/libs/utils";
import React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; 
}

export const Progress = ({ value, className, ...props }: ProgressProps) => {
  return (
    <div
      className={cn(
        "w-full h-2 bg-pink-100 rounded-full overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
