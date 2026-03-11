import { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-lg bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
