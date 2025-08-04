import { compareSync, genSaltSync, getRounds, hashSync } from "bcrypt";

const saltRounds = 10;
const salt = genSaltSync(saltRounds);

export function generateHash (stringToHash: string) {
  const hash = hashSync(stringToHash, salt);

  return hash;
};

export const compareHash = (passToCompare: string, hashToCompare: string) => {
  return compareSync(passToCompare, hashToCompare);
};

export const isHash = (testHash: string) => {
  const match = /^\$2[ayb]\$.{56}$/;
  return match.test(testHash);
};
