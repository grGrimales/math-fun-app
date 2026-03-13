import { cn } from "@/libs/utils";
import React from "react";

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = ({ className, children, ...props }: CardDescriptionProps) => {
  return (
    <p className={cn("text-center text-gray-600", className)} {...props}>
      {children}
    </p>
  );
};