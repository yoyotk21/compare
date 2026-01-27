"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-canvas font-semibold shadow-card hover:bg-accent-soft/90 focus-visible:outline-accent",
        secondary:
          "border border-white/20 bg-transparent text-ink hover:border-ink focus-visible:outline-ink-muted",
        ghost: "text-ink-muted hover:text-ink",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, isLoading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={clsx(
          buttonStyles({ variant }),
          className,
          isLoading && "pointer-events-none opacity-80"
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <span className="text-xs uppercase tracking-widest">Working…</span> : children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
