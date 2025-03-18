"use client";

import { cn } from "@/libs/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content
          className={cn(
            "fixed right-0 top-0 h-full w-64 bg-background p-4 shadow-lg z-50 transition-transform",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          {children}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface SheetTriggerProps {
  onClick?: () => void; // ✅ Hacemos `onClick` opcional
  children: React.ReactNode;
}

export const SheetTrigger = ({ onClick, children }: SheetTriggerProps) => (
  <button onClick={onClick} className="p-2">
    {children}
  </button>
);

export const SheetContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col">{children}</div>;
};
