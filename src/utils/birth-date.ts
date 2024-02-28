export const MILLIS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365.2425;

export function ageFrom(birthDate: Date) {
  const dif = Date.now() - birthDate.getTime();
  
  return Math.trunc(dif / MILLIS_IN_A_YEAR);
}