import * as React from "react";

type ButtonColor =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "default";
type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
  radius?: ButtonRadius;
  variant?: ButtonVariant;
  className?: string;
}

const getColorClasses = (
  color: ButtonColor = "default",
  variant: ButtonVariant = "solid"
) => {
  const base: Record<ButtonColor, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    default: "bg-gray-200 text-black hover:bg-gray-300",
  };

  const outline: Record<ButtonColor, string> = {
    primary: "border border-blue-500 text-blue-500 hover:bg-blue-50",
    secondary: "border border-gray-500 text-gray-500 hover:bg-gray-50",
    danger: "border border-red-500 text-red-500 hover:bg-red-50",
    success: "border border-green-500 text-green-500 hover:bg-green-50",
    warning: "border border-yellow-500 text-yellow-500 hover:bg-yellow-50",
    default: "border border-gray-300 text-black hover:bg-gray-100",
  };

  const ghost: Record<ButtonColor, string> = {
    primary: "text-blue-500 hover:bg-blue-50",
    secondary: "text-gray-500 hover:bg-gray-50",
    danger: "text-red-500 hover:bg-red-50",
    success: "text-green-500 hover:bg-green-50",
    warning: "text-yellow-500 hover:bg-yellow-50",
    default: "text-black hover:bg-gray-100",
  };

  const styles = {
    solid: base,
    outline,
    ghost,
  };

  return styles[variant][color];
};

const getRadiusClass = (radius: ButtonRadius = "md"): string => {
  const radiusMap: Record<ButtonRadius, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  return radiusMap[radius];
};

const getSizeClass = (size: ButtonSize = "md"): string => {
  const sizeMap: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };
  return sizeMap[size];
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  size = "md",
  color = "default",
  radius = "md",
  variant = "solid",
  className = "",
  disabled,
  ...props
}) => {
  const classes = `
    ${getSizeClass(size)}
    ${getColorClasses(color, variant)}
    ${getRadiusClass(radius)}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    font-medium z-0 transition-all duration-200
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label="Button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
