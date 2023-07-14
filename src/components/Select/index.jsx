import React from "react";

const Select = ({
  options,
  label,
  required,
  value,
  defaultValue,
  error,
  onChange,
  className,
  ...selectProps
}) => {
  return (
    <div className={className}>
      <label className="label" htmlFor="select">
        {label} {required && <span>*</span>}
        <div className="select-custom">
          <select
            name="select"
            id="select"
            className={`form-control`}
            value={value}
            onChange={onChange}
            {...selectProps}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {!!error && <p className="error">{error}</p>}
        </div>
      </label>
    </div>
  );
};

export default Select;
