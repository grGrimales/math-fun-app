"use client";

import { cn } from "@/libs/utils";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "icon" | "sm" | "md" | "lg"; // ✅ Agregamos soporte para `size`
}

export const Button = ({ variant = "default", size = "md", className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md transition",
        variant === "default" && "bg-primary text-white hover:bg-accent",
        variant === "ghost" && "bg-transparent text-foreground hover:bg-secondary",
        variant === "outline" && "border border-border text-primary hover:bg-muted",
        size === "icon" && "p-2 w-10 h-10 flex items-center justify-center", // ✅ Soporte para botones de iconos
        size === "sm" && "px-2 py-1 text-sm",
        size === "lg" && "px-6 py-3 text-lg",
        className
      )}
      {...props}
    />
  );
};
