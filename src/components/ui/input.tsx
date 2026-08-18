import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FieldWrapperProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, required, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="text-error"> *</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-foreground placeholder:text-[#a3a3a3]",
            "outline-none transition-all focus:border-foreground focus:ring-2 focus:ring-accent/40",
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          {...props}
        />
        {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    FieldWrapperProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, required, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="text-error"> *</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-foreground placeholder:text-[#a3a3a3]",
            "outline-none transition-all focus:border-foreground focus:ring-2 focus:ring-accent/40 resize-none",
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          {...props}
        />
        {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
