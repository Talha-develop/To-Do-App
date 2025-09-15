import React from "react";
import cn from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "ghost" | "danger";
};

const sizeMap = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantMap = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  ghost: "bg-transparent text-white/90 hover:bg-white/10",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, size = "md", variant = "primary", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={cn(
          "rounded-2xl font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
          sizeMap[size],
          variantMap[variant],
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
