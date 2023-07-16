import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      required,
      error,
      renderInput = undefined,
      type = "normal",
      ...inputProps
    },
    ref
  ) => {
    if (type === "inputContact") {
      return (
        <>
          <label className="sr-only" htmlFor={inputProps?.name || ""}>
            {label}
          </label>

          {renderInput?.(inputProps) || (
            <input
              ref={ref}
              className={`form-control ${!!error ? "input-error" : ""}`}
              placeholder={`${label} ${!!required ? "*" : ""}`}
              {...inputProps}
            />
          )}
          <p className="form-error">{error || ""}</p>
        </>
      );
    }
    return (
      <div className="form-group">
        <label className="label" htmlFor={inputProps?.name || ""}>
          {label} {required && <span>*</span>}
        </label>
        {renderInput?.(inputProps) || (
          <input
            ref={ref}
            className={`form-control ${!!error ? "input-error" : ""}`}
            {...inputProps}
          />
        )}
        <p className="form-error">{error || ""}</p>
      </div>
    );
  }
);

export default Input;
