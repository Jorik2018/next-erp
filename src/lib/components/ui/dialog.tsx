"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

/* -------------------------------------------------------------------------- */
/*                                   Overlay                                  */
/* -------------------------------------------------------------------------- */

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "dialog-overlay",
      className
    )}
    {...props}
  />
));

DialogOverlay.displayName =
  DialogPrimitive.Overlay.displayName;

/* -------------------------------------------------------------------------- */
/*                                   Content                                  */
/* -------------------------------------------------------------------------- */

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "dialog-content",
          className
        )}
        {...props}
      >
        {children}

        <DialogPrimitive.Close
          className={cn(
            "absolute right-4 top-4",
            "flex h-8 w-8 items-center justify-center",
            "rounded-lg",
            "text-slate-400",
            "transition-colors",
            "hover:bg-slate-100",
            "hover:text-slate-700",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-emerald-500/30"
          )}
        >
          <X className="h-4 w-4" />

          <span className="sr-only">
            Close
          </span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);

DialogContent.displayName =
  DialogPrimitive.Content.displayName;

/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 pr-8",
      className
    )}
    {...props}
  />
);

DialogHeader.displayName =
  "DialogHeader";

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2",
      "sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
);

DialogFooter.displayName =
  "DialogFooter";

/* -------------------------------------------------------------------------- */
/*                                    Title                                   */
/* -------------------------------------------------------------------------- */

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl font-semibold tracking-tight text-slate-900",
      className
    )}
    {...props}
  />
));

DialogTitle.displayName =
  DialogPrimitive.Title.displayName;

/* -------------------------------------------------------------------------- */
/*                                Description                                 */
/* -------------------------------------------------------------------------- */

const DialogDescription = React.forwardRef<
  React.ElementRef<
    typeof DialogPrimitive.Description
  >,
  React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Description
  >
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm leading-6 text-slate-500",
      className
    )}
    {...props}
  />
));

DialogDescription.displayName =
  DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};