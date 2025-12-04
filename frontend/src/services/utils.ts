import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { CheckCircle, Clock, XCircle } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusMeta(status: string): {
  colorClass: string;
  bgClass: string;
  Icon: React.ComponentType<{ className?: string }>;
  progress: number;
} {
  switch (status) {
    case 'Validé':
      return {
        colorClass: 'text-success',
        bgClass: 'bg-success/20',
        Icon: CheckCircle,
        progress: 100,
      };
    case 'En attente':
      return {
        colorClass: 'text-primary',
        bgClass: 'bg-primary/20',
        Icon: Clock,
        progress: 60,
      };
    case 'Clos':
      return {
        colorClass: 'text-destructive',
        bgClass: 'bg-destructive/20',
        Icon: XCircle,
        progress: 100,
      };
    default:
      return {
        colorClass: 'text-muted-foreground',
        bgClass: 'bg-muted',
        Icon: Clock,
        progress: 0,
      };
  }
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
