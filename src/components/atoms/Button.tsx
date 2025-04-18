"use client";

import { cn } from "@/libs/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline"  | "primaryPulse" | "success" | "destructive";
  size?: "icon" | "sm" | "md" | "lg"; // Soporte para tamaños
  fullWidth?: boolean; // Opción para hacer el botón ancho
}

export const Button = ({ 
  variant = "default", 
  size = "md", 
  fullWidth = false, 
  className, 
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center font-medium transition-all duration-200 rounded-lg  cursor-pointer",
        variant === "default" && "bg-primary shadow-md text-white hover:opacity-95",
        variant === "ghost" && "bg-transparent text-foreground hover:bg-secondary",
        variant === "outline" && " text-foreground hover:bg-secondary hover:text-text",
        variant === "primaryPulse",
        variant === "success" && "bg-green-500 text-white hover:bg-green-600",
        variant === "destructive" && "bg-red-500 text-white hover:bg-red-600" &&
        size === "icon" && "p-2 w-10 h-10 flex items-center justify-center",
        size === "sm" && "px-3 py-1.5 text-sm hover:opacity-95",
        size === "md" && "px-5 py-2 text-base hover:opacity-95",
        size === "lg" && "px-6 py-2.5 text-lg hover:opacity-95",
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  );
};
