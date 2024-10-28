import React from 'react';

export function Button({ children, onClick, className, type = "button", style }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
