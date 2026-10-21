import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "text-sm font-medium",
    "transition-all duration-150",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-slate-950",
    "focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "dark:focus-visible:ring-slate-300",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white hover:bg-slate-800",

        primary:
          "bg-slate-900 text-white hover:bg-slate-800",

        info:
          "bg-blue-500 text-white hover:bg-blue-600",

        destructive:
          "bg-red-500 text-white hover:bg-red-600",

        warning:
          "bg-amber-500 text-white hover:bg-amber-600",

        success:
          "bg-green-600 text-white hover:bg-green-700",

        light:
          "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100",

        outline:
          "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100",

        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200",

        ghost:
          "bg-transparent text-slate-900 hover:bg-slate-100",

        link:
          "bg-transparent text-slate-900 underline-offset-4 hover:underline",
      },

      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "size-10 p-0",
      },

      width: {
        auto: "w-auto",
        full: "w-full",
      },

      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
      width: "auto",
      rounded: "default",
    },
  }
);

type ButtonVariant = VariantProps<
  typeof buttonVariants
>["variant"];

/* -------------------------------------------------------------------------- */
/*                               Legacy helpers                               */
/* -------------------------------------------------------------------------- */

interface LegacyVariantProps {
  $primary?: boolean;
  $info?: boolean;
  $danger?: boolean;
  $warning?: boolean;
  $success?: boolean;
  $light?: boolean;
}

function resolveLegacyVariant({
  $primary,
  $info,
  $danger,
  $warning,
  $success,
  $light,
}: LegacyVariantProps): ButtonVariant | undefined {
  if ($danger) return "destructive";
  if ($warning) return "warning";
  if ($success) return "success";
  if ($info) return "info";
  if ($light) return "light";
  if ($primary) return "primary";

  return undefined;
}

/* -------------------------------------------------------------------------- */
/*                                   Button                                   */
/* -------------------------------------------------------------------------- */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    LegacyVariantProps {
  asChild?: boolean;

  /*
   * Legacy LEARNSPACE props.
   * These can be removed after the old components have been migrated.
   */

  $fluidWidth?: boolean;
  $fluidHeight?: boolean;

  $textCenter?: boolean;
  $textRight?: boolean;
  $textLeft?: boolean;

  $rounded?: boolean;

  $margin?: string;
  $marginTop?: string;
  $marginBottom?: string;
  $marginLeft?: string;
  $marginRight?: string;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      width,
      rounded,
      asChild = false,

      $fluidWidth,
      $fluidHeight,

      $textCenter,
      $textRight,
      $textLeft,

      $rounded,

      $margin,
      $marginTop,
      $marginBottom,
      $marginLeft,
      $marginRight,

      $primary,
      $info,
      $danger,
      $warning,
      $success,
      $light,

      style,

      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const legacyVariant = resolveLegacyVariant({
      $primary,
      $info,
      $danger,
      $warning,
      $success,
      $light,
    });

    const legacyStyle: React.CSSProperties = {
      ...($fluidHeight && {
        height: "100%",
      }),

      ...($margin && {
        margin: $margin,
      }),

      ...($marginTop && {
        marginTop: $marginTop,
      }),

      ...($marginBottom && {
        marginBottom: $marginBottom,
      }),

      ...($marginLeft && {
        marginLeft: $marginLeft,
      }),

      ...($marginRight && {
        marginRight: $marginRight,
      }),

      ...style,
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({
            variant: variant ?? legacyVariant,
            size,
            width: $fluidWidth ? "full" : width,
            rounded: $rounded ? "full" : rounded,
          }),

          $textCenter && "text-center",
          $textRight && "text-right",
          $textLeft && "text-left",

          className
        )}
        style={legacyStyle}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

/* -------------------------------------------------------------------------- */
/*                               Circle Button                                */
/* -------------------------------------------------------------------------- */

export interface CircleButtonProps extends ButtonProps {
  /*
   * Legacy positioning props.
   */

  $position?: React.CSSProperties["position"];
  $right?: string;
  $left?: string;
  $bottom?: string;
  $top?: string;
  $padding?: string;

  /*
   * Compatibility with the oldest LEARNSPACE components,
   * which used props without the $ prefix.
   */

  position?: React.CSSProperties["position"];
  right?: string;
  left?: string;
  bottom?: string;
  top?: string;
  padding?: string;
}

const CircleButton = React.forwardRef<
  HTMLButtonElement,
  CircleButtonProps
>(
  (
    {
      className,

      $position,
      $right,
      $left,
      $bottom,
      $top,
      $padding,

      position,
      right,
      left,
      bottom,
      top,
      padding,

      style,

      ...props
    },
    ref
  ) => {
    const circleStyle: React.CSSProperties = {
      position: $position ?? position ?? "static",

      right: $right ?? right,
      left: $left ?? left,
      bottom: $bottom ?? bottom,
      top: $top ?? top,

      padding:
        $padding ??
        padding ??
        "0.5em 1em",

      ...style,
    };

    return (
      <Button
        ref={ref}
        rounded="full"
        className={cn(
          "text-[1.1em]",
          "shadow-[0_5px_15px_rgba(0,0,0,0.1)]",
          "transition-all duration-150",
          className
        )}
        style={circleStyle}
        {...props}
      />
    );
  }
);

CircleButton.displayName = "CircleButton";

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export {
  Button,
  CircleButton,
  buttonVariants,
};