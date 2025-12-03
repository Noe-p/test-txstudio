import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRiskData(risk?: string): { letter: 'A' | 'B' | 'C'; text: string } {
  if (!risk) return { letter: 'B', text: 'Risques faible' };

  const parts = risk.split('-');
  const letter = parts[0] as 'A' | 'B' | 'C';

  // Valider que la lettre est bien A, B ou C
  if (!['A', 'B', 'C'].includes(letter)) {
    return { letter: 'B', text: 'Risques faible' };
  }

  return {
    letter,
    text: parts[1] || 'Risques faible',
  };
}
