import type { StatusGroup, TimelineType } from '@/types/strapi/componentTypes/loan';
import Image from 'next/image';
import { Col } from '../utils/Flex';
import { P10, P12 } from '../utils/Texts';

interface ClosureCardProps {
  timeline?: TimelineType | undefined;
  loanTitle?: string;
  status?: StatusGroup | undefined;
}

export function ClosureCard({ timeline, loanTitle, status }: ClosureCardProps): React.JSX.Element {
  const closureDate = timeline?.expectedClosureDate
    ? new Date(timeline.expectedClosureDate).toLocaleDateString('fr-FR')
    : 'N/A';

  return (
    <>
      <P12>{status}</P12>
      <Col className="h-full items-center">
        {/* Cup Icon */}
        <div className="relative w-30 h-30">
          <Image
            src="/icons/cup-icon.webP"
            alt="Clôture"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Content */}
        <Col className="">
          <P12 className=" font-semibold">{loanTitle}</P12>
          <P12 className="text-muted-foreground">{'Estimation de clôture du dossier au :'}</P12>
          <P10 className="text-foreground font-medium">{closureDate}</P10>
        </Col>
      </Col>
    </>
  );
}
