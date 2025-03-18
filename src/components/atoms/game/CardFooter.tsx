import { cn } from "@/libs/utils";
import React from "react";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = ({ className, children, ...props }: CardFooterProps) => {
  return (
    <div className={cn("pt-2 pb-6 text-center", className)} {...props}>
      {children}
    </div>
  );
};
