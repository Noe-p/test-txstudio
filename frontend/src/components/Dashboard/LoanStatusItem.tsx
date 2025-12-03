import type { LoanStatus } from '@/types/strapi/componentTypes/loan';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Col, Row } from '../utils/Flex';
import { P12 } from '../utils/Texts';

interface LoanStatusItemProps {
  title: string;
  status: LoanStatus;
}

export function LoanStatusItem({ title, status }: LoanStatusItemProps): React.JSX.Element {
  const { colorClass, bgClass, Icon, progress } = getStatusMeta(status);

  return (
    <Col className="gap-3 w-full">
      <Row className="items-center justify-between w-full">
        <P12 className="text-muted-foreground font-semibold">{title}</P12>
        <Row className="items-center gap-2">
          <P12 className={colorClass}>{status}</P12>
          <Icon className={`h-5 w-5 ${colorClass}`} aria-hidden />
        </Row>
      </Row>
      <div className={`h-3 w-full rounded-full ${bgClass}`}>
        <div
          className={`h-3 rounded-full ${colorClass.replace('text-', 'bg-')}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </Col>
  );
}

export function getStatusMeta(status: LoanStatus): {
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
