"use client";

import { useState } from "react";
import Button from "@/components/ui/button";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  };

  return (
    <Button type="button" variant="ghost" className="text-xs" onClick={handleCopy}>
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
