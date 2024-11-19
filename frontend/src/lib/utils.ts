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

export function generatePageLink(pathname: string, prevPage?: number, page?: number, _id?: string, lastTransactionId?: string) {
  const searchParams = new URLSearchParams({
    ...(_id && { _id }),
    ...(lastTransactionId && { lastTransactionId: lastTransactionId }),
    ...(pathname == "/transactions" && prevPage && { prevPage: prevPage.toString() }),
    ...(page && { page: page.toString() })
  });

  return `${pathname}?${searchParams.toString()}`;
}