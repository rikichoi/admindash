export function abbreviateNumber(num: number) {
    const formattedNum = new Intl.NumberFormat('en-GB', {
        notation: "compact",
        compactDisplay: "short"
    }).format(num)
    return formattedNum;
}