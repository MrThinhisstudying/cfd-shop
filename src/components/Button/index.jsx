import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const Button = ({
  variant = "primary",
  link = "",
  className,
  children,
  disabled,
  ...rest
}) => {
  const variantClassName = useMemo(() => {
    if (disabled) {
      return "btn btn--light";
    }

    switch (variant) {
      case "primary":
        return "btn btn--primary";
      case "outline":
        return "btn btn-outline-primary-2";
      default:
        return "";
    }
  }, [variant, disabled]);
  if (!link) {
    return (
      <button className={`${variantClassName} ${className ?? ""}`} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <Link
      to={link}
      className={`${variantClassName} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default Button;
