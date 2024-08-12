import * as React from "react";
import { ButtonProps, Button as RNButton } from "@nextui-org/react";

interface Props extends ButtonProps {}

const Button: React.FC<Props> = ({
  size,
  type = "submit",
  radius,
  color,
  onClick,
  disabled,
  children,
  ...props
}) => {
  return (
    <RNButton
      size={size}
      type={type}
      radius={radius}
      color={color}
      onClick={onClick}
      disabled={disabled}
      aria-label="Button"
      {...props}
    >
      {children}
    </RNButton>
  );
};

export default Button;
