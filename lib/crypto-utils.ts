import bcrypt from "bcryptjs";

export const BCRYPT_CONFIG = {
  minRounds: 4,
  maxRounds: 15, // Browser gets very slow after 12-13
  defaultRounds: 10,
};

export async function hashText(text: string, rounds: number): Promise<string> {
  const salt = await bcrypt.genSalt(rounds);
  return bcrypt.hash(text, salt);
}

export async function verifyHash(text: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(text, hash);
  } catch {
    return false;
  }
}
