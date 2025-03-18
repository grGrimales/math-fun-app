import { cn } from "@/libs/utils";
import React from "react";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = ({ className, children, ...props }: CardContentProps) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};
