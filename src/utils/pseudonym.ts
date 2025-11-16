import { Env } from "../types";
import { ADJECTIVES, ANIMALS } from "../config/pseudonyms";

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generatePseudonym(): string {
  const adjective = getRandomElement(ADJECTIVES);
  const animal = getRandomElement(ANIMALS);
  return `${adjective} ${animal}`;
}

export async function getOrCreatePseudonym(env: Env, magicCode: string): Promise<string> {
  // Check if pseudonym already exists
  const existing = await env.LIVESTOCK_DB.prepare(
    "SELECT pseudonym FROM pseudonyms WHERE magic_code = ?"
  ).bind(magicCode).first<{ pseudonym: string }>();

  if (existing) {
    return existing.pseudonym;
  }

  // Create new pseudonym
  const newPseudonym = generatePseudonym();
  await env.LIVESTOCK_DB.prepare(
    "INSERT INTO pseudonyms (magic_code, pseudonym) VALUES (?, ?)"
  ).bind(magicCode, newPseudonym).run();

  return newPseudonym;
}
