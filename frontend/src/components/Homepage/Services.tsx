'use client';
import { BlocksRenderer } from '@/components/Strapi/BlocksRenderer';
import { Button } from '@/components/ui/button';
import { Col } from '@/components/utils/Flex';
import { Grid2 } from '@/components/utils/Grid';
import { P24 } from '@/components/utils/Texts';
import { cn } from '@/services/utils';
import { ServiceType } from '@/types/strapi/componentTypes/service';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ServicesProps {
  data: ServiceType[] | null;
}

export function Services({ data }: ServicesProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(0);

  if (!data || data.length === 0) {
    return <></>;
  }

  const activeService = data[activeTab];

  return (
    <div className="bg-secondary py-16 px-6 md:px-12 lg:px-24">
      <Grid2 className=" gap-8 md:gap-12">
        {/* Navigation gauche */}
        <Col className="gap-4 items-center">
          {data.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setActiveTab(index)}
              className={cn(
                'flex items-center justify-start w-1/2 cursor-pointer transition-colors gap-2',
                activeTab === index ? 'text-success' : 'text-muted-foreground hover:text-success',
              )}
            >
              <P24 className="font-semibold">{service.nav}</P24>
              <MoveRight className="h-5 w-5" />
            </div>
          ))}
        </Col>

        {/* Contenu droite */}
        <Col className="gap-4">
          <div className="text-muted-foreground text-sm md:text-[14px]">
            <BlocksRenderer content={activeService.description} />
          </div>

          {activeService.button && (
            <Link href={activeService.button.url} target="_blank" rel="noopener noreferrer">
              <Button className="mt-6 w-fit bg-foreground hover:bg-foreground/90">
                {activeService.button.title}
              </Button>
            </Link>
          )}
        </Col>
      </Grid2>
    </div>
  );
}
