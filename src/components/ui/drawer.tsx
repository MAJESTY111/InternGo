"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: "right" | "bottom";
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const isBottom = side === "bottom";

  return createPortal(
    <div className="fixed inset-0 z-[90] flex" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="animate-fade-in absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className={
          isBottom
            ? "animate-slide-up relative mt-auto max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl"
            : "animate-slide-in-right relative ml-auto h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl sm:max-w-lg"
        }
      >
        {title && (
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white px-6 py-4">
            <h2 className="text-base font-semibold text-foreground">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close panel"
              className="rounded-full p-1.5 text-muted hover:bg-soft-bg hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
