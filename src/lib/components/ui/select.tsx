"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

/* -------------------------------------------------------------------------- */
/*                                   Trigger                                  */
/* -------------------------------------------------------------------------- */

const SelectTrigger = React.forwardRef<
  React.ElementRef<
    typeof SelectPrimitive.Trigger
  >,
  React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.Trigger
  >
>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-11 w-full items-center justify-between",
        "rounded-lg border border-slate-300",
        "bg-white px-3 py-2",
        "text-sm text-slate-900",
        "shadow-sm",
        "outline-none",
        "transition-colors",
        "hover:border-slate-400",
        "focus:border-emerald-500",
        "focus:ring-2 focus:ring-emerald-500/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);

SelectTrigger.displayName =
  SelectPrimitive.Trigger.displayName;

/* -------------------------------------------------------------------------- */
/*                                   Content                                  */
/* -------------------------------------------------------------------------- */

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(
  (
    {
      className,
      children,
      position = "popper",
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={6}
        collisionPadding={12}
        className={cn(
          "select-content",
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />

        <SelectPrimitive.Viewport className="select-viewport">
          {children}
        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);


SelectContent.displayName =
  SelectPrimitive.Content.displayName;

/* -------------------------------------------------------------------------- */
/*                                    Item                                    */
/* -------------------------------------------------------------------------- */

const SelectItem = React.forwardRef<
  React.ElementRef<
    typeof SelectPrimitive.Item
  >,
  React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.Item
  >
>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full",
        "cursor-pointer select-none",
        "items-center",
        "rounded-md",
        "py-2.5 pl-9 pr-3",
        "text-sm text-slate-700",
        "outline-none",
        "transition-colors",
        "focus:bg-emerald-50",
        "focus:text-emerald-900",
        "data-[disabled]:pointer-events-none",
        "data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-emerald-600" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);

SelectItem.displayName =
  SelectPrimitive.Item.displayName;

/* -------------------------------------------------------------------------- */
/*                                    Label                                   */
/* -------------------------------------------------------------------------- */

const SelectLabel = React.forwardRef<
  React.ElementRef<
    typeof SelectPrimitive.Label
  >,
  React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.Label
  >
>(
  (
    {
      className,
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        "px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
        className
      )}
      {...props}
    />
  )
);

SelectLabel.displayName =
  SelectPrimitive.Label.displayName;

/* -------------------------------------------------------------------------- */
/*                                  Separator                                 */
/* -------------------------------------------------------------------------- */

const SelectSeparator =
  React.forwardRef<
    React.ElementRef<
      typeof SelectPrimitive.Separator
    >,
    React.ComponentPropsWithoutRef<
      typeof SelectPrimitive.Separator
    >
  >(
    (
      {
        className,
        ...props
      },
      ref
    ) => (
      <SelectPrimitive.Separator
        ref={ref}
        className={cn(
          "my-1 h-px bg-slate-100",
          className
        )}
        {...props}
      />
    )
  );

SelectSeparator.displayName =
  SelectPrimitive.Separator.displayName;

/* -------------------------------------------------------------------------- */
/*                                Scroll buttons                              */
/* -------------------------------------------------------------------------- */

const SelectScrollUpButton =
  React.forwardRef<
    React.ElementRef<
      typeof SelectPrimitive.ScrollUpButton
    >,
    React.ComponentPropsWithoutRef<
      typeof SelectPrimitive.ScrollUpButton
    >
  >(
    (
      {
        className,
        ...props
      },
      ref
    ) => (
      <SelectPrimitive.ScrollUpButton
        ref={ref}
        className={cn(
          "flex cursor-default items-center justify-center bg-white py-1",
          className
        )}
        {...props}
      >
        <ChevronUp className="h-4 w-4 text-slate-500" />
      </SelectPrimitive.ScrollUpButton>
    )
  );

SelectScrollUpButton.displayName =
  SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton =
  React.forwardRef<
    React.ElementRef<
      typeof SelectPrimitive.ScrollDownButton
    >,
    React.ComponentPropsWithoutRef<
      typeof SelectPrimitive.ScrollDownButton
    >
  >(
    (
      {
        className,
        ...props
      },
      ref
    ) => (
      <SelectPrimitive.ScrollDownButton
        ref={ref}
        className={cn(
          "flex cursor-default items-center justify-center bg-white py-1",
          className
        )}
        {...props}
      >
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </SelectPrimitive.ScrollDownButton>
    )
  );

SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};