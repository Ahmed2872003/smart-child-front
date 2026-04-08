import React, { forwardRef } from "react";

const InputField = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      icon: Icon,
      value,
      onChange,
      name,
      actionLabel,
      onAction,
      disabled,
      required,
      error, // Added error prop
      ...other
    },
    ref,
  ) => (
    <div className="mb-4 text-left relative">
      {/* label could go here if you decide to add one */}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon
              className={`h-5 w-5 ${error ? "text-red-400" : "text-gray-400"}`}
            />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          required={required}
          disabled={disabled}
          className={`w-full rounded-full border bg-transparent px-5 py-3.5 text-sm transition-all outline-none
          ${Icon ? "pl-11" : ""} 
          ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...other}
        />
      </div>

      {/* Error Message & Action Label Row */}
      <div className="flex justify-between items-start mt-1.5 px-2">
        <div className="flex-1">
          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>

        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            disabled={disabled}
            className="text-xs font-semibold text-gray-600 hover:text-black underline decoration-gray-300 underline-offset-2 disabled:opacity-50"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  ),
);

InputField.displayName = "InputField";

export default InputField;
