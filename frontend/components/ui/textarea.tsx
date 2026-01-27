"use client";

import clsx from "clsx";
import { forwardRef } from "react";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={clsx(
        "w-full resize-none rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-base text-ink shadow-card outline-none transition focus:border-accent focus:bg-white/10",
        className
      )}
      {...props}
    />
  )
);

TextArea.displayName = "TextArea";

export default TextArea;
