import { cn } from '@/services/utils';
import { RowBetween } from '../utils/Flex';
import { P10 } from '../utils/Texts';

interface RiskScoreGradientProps {
  score: 'A' | 'B' | 'C';
}

export function RiskScoreGradient({ score }: RiskScoreGradientProps) {
  // Calcul de la position du point en fonction du score
  const getPosition = () => {
    switch (score) {
      case 'A':
        return '5%';
      case 'B':
        return '50%';
      case 'C':
        return '95%';
      default:
        return '50%';
    }
  };

  return (
    <div className="w-full">
      {/* Labels A et C */}
      <RowBetween className="mb-2">
        <P10 className="text-success font-semibold">{'A'}</P10>
        <P10 className="text-destructive font-semibold">{'C'}</P10>
      </RowBetween>

      {/* Barre de gradient avec point */}
      <div className="relative w-full h-5 rounded bg-gradient-to-r from-success to-destructive">
        {/* Point blanc positionné */}
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-background rounded-full shadow-lg',
          )}
          style={{ left: getPosition() }}
        />
      </div>
    </div>
  );
}
