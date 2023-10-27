import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function round(num: number, precision = 1) {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}

export function uppercaseFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
