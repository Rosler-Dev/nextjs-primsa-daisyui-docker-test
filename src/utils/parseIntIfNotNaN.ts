export default function parseIntIfNotNaN(str: string | undefined | null) {
  const number = str === null ? NaN : Number(str)
  return isNaN(number) ? undefined : number
}
