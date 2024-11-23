import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function abbreviateNumber(num: number) {
    const formattedNum = new Intl.NumberFormat('en-GB', {
        notation: "compact",
        compactDisplay: "short"
    }).format(num)
    return formattedNum;
}