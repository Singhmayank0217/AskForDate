import React from 'react';

export function Input({ type = "text", value, onChange, placeholder, className }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-4 py-2 rounded-md ${className}`}
    />
  );
}
