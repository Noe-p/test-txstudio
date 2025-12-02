'use client';
import { Image } from '@/components/Medias/Image';
import { Card, CardContent } from '@/components/ui/card';
import { Col } from '@/components/utils/Flex';
import { Grid2 } from '@/components/utils/Grid';
import { P14 } from '@/components/utils/Texts';
import { useTranslations } from 'next-intl';

export function Cards(): React.JSX.Element {
  const tCommons = useTranslations('common');

  const cards = [
    {
      icon: '/icons/check.webP',
      title: tCommons('cards.check.title'),
      description: tCommons('cards.check.description'),
    },
    {
      icon: '/icons/money.webP',
      title: tCommons('cards.money.title'),
      description: tCommons('cards.money.description'),
    },
    {
      icon: '/icons/time.webP',
      title: tCommons('cards.time.title'),
      description: tCommons('cards.time.description'),
    },
    {
      icon: '/icons/question.webP',
      title: tCommons('cards.question.title'),
      description: tCommons('cards.question.description'),
    },
  ];

  return (
    <Grid2 className="max-w-7xl mx-auto gap-8 md:gap-6 px-6 md:px-12 lg:px-24 my-16">
      {cards.map((card, index) => (
        <Card key={index} className="p-6 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <Col className="gap-4">
              <Image
                src={card.icon}
                alt={card.title}
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
              <P14 className="font-bold">{card.title}</P14>
              <P14 className="text-muted-foreground">{card.description}</P14>
            </Col>
          </CardContent>
        </Card>
      ))}
    </Grid2>
  );
}
