import React from "react";
import { cn } from "~/lib/utils";

interface EditorToolbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "danger" | "success";
}

export function EditorToolbarButton({
  title,
  icon,
  children,
  isActive = false,
  size = "md",
  variant = "default",
  className,
  ...props
}: EditorToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      className={cn(
        "flex items-center justify-center",
        "transition-colors duration-200",
        "rounded font-medium",
        "hover:bg-slate-100",
        "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-400",
        // Size variants
        size === "sm" && "px-2 py-1 text-xs",
        size === "md" && "px-2.5 py-1 text-sm",
        size === "lg" && "px-3 py-1.5 text-base",
        // Color variants
        variant === "default" && [
          "text-slate-700",
          isActive && "bg-indigo-100 text-indigo-700",
        ],
        variant === "danger" && [
          "text-slate-700",
          "hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200",
        ],
        variant === "success" && [
          "text-slate-700",
          isActive && "bg-green-100 text-green-700",
        ],
        className
      )}
      {...props}
    >
      {icon && <span className="flex items-center gap-1">{icon}</span>}
      {children}
    </button>
  );
}
