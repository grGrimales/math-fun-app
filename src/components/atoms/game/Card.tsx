import { cn } from "@/libs/utils";
import Link from "next/link";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string; // Nueva prop para manejar el enlace
}

export const Card = ({ className, children, href, ...props }: CardProps) => {
  return href ? (
    <Link href={href} className="block">
      <div
        className={cn(
          "transition-transform hover:scale-105 rounded-xl border border-gray-200 shadow-md hover:shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Link>
  ) : (
    <div
      className={cn(
        "transition-transform  rounded-xl border border-gray-200 shadow-md ",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
