import React from "react";

const InputField = ({
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
}) => (
  <div className="mb-4 text-left relative">
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        name={name}
        required={required}
        disabled={disabled}
        className={`w-full rounded-full border border-gray-300 bg-transparent px-5 py-3.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all ${Icon ? "pl-11" : ""} ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
    {actionLabel && (
      <div className="text-right mt-2">
        <button
          type="button"
          onClick={onAction}
          disabled={disabled}
          className="text-xs font-semibold text-gray-600 hover:text-black underline decoration-gray-300 underline-offset-2 disabled:opacity-50"
        >
          {actionLabel}
        </button>
      </div>
    )}
  </div>
);

export default InputField;
