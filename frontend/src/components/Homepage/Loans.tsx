'use client';
import { Button } from '@/components/ui/button';
import { Col } from '@/components/utils/Flex';
import { Grid2 } from '@/components/utils/Grid';
import { P14, P24 } from '@/components/utils/Texts';
import { cn } from '@/services/utils';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function Loans(): React.JSX.Element {
  const tCommons = useTranslations('common');
  const [activeTab, setActiveTab] = useState<'item1' | 'item2'>('item1');

  const navItems = [
    { key: 'item1' as const, label: tCommons('loans.nav.item1') },
    { key: 'item2' as const, label: tCommons('loans.nav.item2') },
  ];

  const listItems = [
    tCommons('loans.list.items.item1'),
    tCommons('loans.list.items.item2'),
    tCommons('loans.list.items.item3'),
    tCommons('loans.list.items.item4'),
    tCommons('loans.list.items.item5'),
    tCommons('loans.list.items.item6'),
    tCommons('loans.list.items.item7'),
    tCommons('loans.list.items.item8'),
  ];

  return (
    <div className="bg-secondary py-16 px-6 md:px-12 lg:px-24">
      <Grid2 className=" gap-8 md:gap-12">
        {/* Navigation gauche */}
        <Col className="gap-4 items-center">
          {navItems.map((item) => (
            <div
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={cn(
                'flex items-center justify-start w-1/2 cursor-pointer transition-colors gap-2',
                activeTab === item.key
                  ? 'text-success'
                  : 'text-muted-foreground hover:text-success',
              )}
            >
              <P24 className="font-semibold">{item.label}</P24>
              <MoveRight className="h-5 w-5" />
            </div>
          ))}
        </Col>

        {/* Contenu droite */}
        <Col className="gap-4">
          <P14>
            {tCommons.rich('loans.description', {
              br: () => <br />,
            })}
          </P14>

          <Col className="gap-4 mt-4">
            <P14 className="text-foreground">{tCommons('loans.list.title')}</P14>
            <ul className="">
              {listItems.map((item, index) => (
                <li key={index} className="text-muted-foreground  md:text-[14px]">
                  {`• ${item}`}
                </li>
              ))}
            </ul>
          </Col>

          <Button className="mt-6 w-fit bg-foreground hover:bg-foreground/90">
            {tCommons('loans.list.cta')}
          </Button>
        </Col>
      </Grid2>
    </div>
  );
}
