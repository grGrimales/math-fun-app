import { cn } from "@/libs/utils";
import React from "react";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: string;
}

export const CardHeader = ({ className, bgColor, children, ...props }: CardHeaderProps) => {
  return (
    <div className={cn(`relative ${bgColor} p-6`, className)} {...props}>
      {children}
    </div>
  );
};
