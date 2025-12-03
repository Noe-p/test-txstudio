import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface DashboardCardProps {
  children: ReactNode;
}

export function DashboardCard({ children }: DashboardCardProps) {
  return (
    <Card className="bg-background rounded-lg p-3 flex-1 min-w-[200px] relative">{children}</Card>
  );
}
