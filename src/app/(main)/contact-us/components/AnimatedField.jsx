"use client";
// Animated floating label field
export function AnimatedField({ label, children }) {
  return (
    <div className="relative">
      {children}
      <label className="absolute left-4 top-3 text-zinc-500 dark:text-zinc-400 pointer-events-none transition-all duration-200
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
        peer-focus:-top-4 peer-focus:text-sm peer-focus:text-orange-500 dark:peer-focus:text-orange-400
        bg-white dark:bg-zinc-900 px-1 rounded">
        {label}
      </label>
    </div>
  );
}
