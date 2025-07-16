// src/app/(main)/contact/components/AnimatedField.jsx
"use client";
import React from "react";

export function AnimatedField({ label, children }) {
  return (
    <div className="relative">
      {children}
      <label
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          bg-gray-50 dark:bg-zinc-900 px-1 rounded

          peer-placeholder-shown:top-3
          peer-placeholder-shown:text-base

          peer-focus:-top-4
          peer-focus:text-sm
          peer-focus:text-orange-500 dark:peer-focus:text-orange-400

          peer-valid:-top-4
          peer-valid:text-sm
        `}
      >
        {label}
      </label>
    </div>
  );
}
