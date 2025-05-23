import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl bg-black px-4 py-2 text-white font-medium hover:bg-gray-900 transition",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
