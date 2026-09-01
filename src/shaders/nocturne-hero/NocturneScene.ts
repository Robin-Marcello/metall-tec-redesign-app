export const NOCTURNE_TITLES = {
  midnight: "Nocturne",
  eclipse: "Nocturne",
  aurora: "Nocturne",
};

export const NOCTURNE_VARIANTS = ["midnight", "eclipse", "aurora"] as const;

export type NocturneVariant = (typeof NOCTURNE_VARIANTS)[number];

export function buildNocturneDocument(..._args: unknown[]) {
  return "";
}
