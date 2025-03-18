import { cn } from "@/libs/utils";
import React from "react";

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = ({ className, children, ...props }: CardDescriptionProps) => {
  return (
    <p className={cn("text-center text-gray-600", className)} {...props}>
      {children}
    </p>
  );
};
