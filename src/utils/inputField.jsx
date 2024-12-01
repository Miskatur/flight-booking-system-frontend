import React from "react";

const InputField = ({
  label,
  name,
  id,
  placeholder,
  type = "text",
  value,
  onChange,
  classes,
  required = false,
  autocomplete,
  readOnly = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block font-medium text-lg">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className={`py-2 px-2 border mt-2 rounded focus:ring-1 focus-visible:outline-none ${classes}`}
        placeholder={placeholder}
        required={required}
        autoComplete={autocomplete}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;
