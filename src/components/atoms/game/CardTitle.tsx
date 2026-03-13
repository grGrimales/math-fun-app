import { cn } from "@/libs/utils";
import React from "react";

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
  return (
    <h2 className={cn("text-xl font-bold text-center mt-4", className)} {...props}>
      {children}
    </h2>
  );
};
