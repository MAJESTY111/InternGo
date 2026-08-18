import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover active:scale-[0.98] shadow-sm",
  secondary:
    "bg-foreground text-white hover:bg-black active:scale-[0.98]",
  outline:
    "bg-white text-foreground border border-border hover:border-foreground active:scale-[0.98]",
  ghost: "bg-transparent text-foreground hover:bg-soft-bg active:scale-[0.98]",
  danger:
    "bg-white text-error border border-[#fecaca] hover:bg-error-bg active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap cursor-pointer",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
