export const TERMS = {
  '1 month': 1,
  '2 months': 2,
  '3 months': 3,
  '4 months': 4,
  '6 months': 6,
  '1 year': 12,
  '2 years': 24,
  '3 years': 36,
  '5 years': 60,
  '7 years': 84,
  '10 years': 120,
  '20 years': 240,
  '30 years': 360,
}

const TERM_TO_LABEL: Record<string, string> = Object.entries(TERMS).reduce(
  (memo, [key, value]) => {
    return { ...memo, [value]: key }
  },
  {},
)
export function termLabel(term: number): string {
  return TERM_TO_LABEL[term.toString()]
}

export interface CookieType {
  token?: string
}
