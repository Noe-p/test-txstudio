'use client';
import { Image } from '@/components/Medias/Image';
import { Card, CardContent } from '@/components/ui/card';
import { Col } from '@/components/utils/Flex';
import { Grid2 } from '@/components/utils/Grid';
import { P14 } from '@/components/utils/Texts';
import { AdvantageType } from '@/types/strapi/collectionTypes/advantage';

interface AdvantagesProps {
  data: AdvantageType[] | null;
}

export function Advantages({ data }: AdvantagesProps): React.JSX.Element {
  if (!data || data.length === 0) {
    return <></>;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  return (
    <Grid2 className="max-w-7xl mx-auto gap-8 md:gap-6 px-6 md:px-12 lg:px-24 my-16">
      {data.map((advantage, index) => {
        const iconUrl = advantage.icon?.url ? `${apiUrl}${advantage.icon.url}` : null;
        if (!iconUrl) return null;

        return (
          <Card key={index} className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Col className="gap-4">
                <Image
                  src={iconUrl}
                  alt={advantage.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
                <P14 className="font-bold">{advantage.title}</P14>
                <P14 className="text-muted-foreground">{advantage.description}</P14>
              </Col>
            </CardContent>
          </Card>
        );
      })}
    </Grid2>
  );
}
