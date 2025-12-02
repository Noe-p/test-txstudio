'use client';
import { HeaderType } from '@/types/strapi/singleTypes/header';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Col, Row } from '../utils/Flex';
import { Col1, Grid2 } from '../utils/Grid';
import { P14, Title } from '../utils/Texts';

interface HeaderProps {
  data: HeaderType | null;
}

export function Header({ data: header }: HeaderProps): React.JSX.Element {
  const tCommons = useTranslations('common');

  const imageUrl = header?.header?.data?.url || '/header.webP';

  return (
    <header className="w-full h-screen relative overflow-hidden">
      <Grid2 className="h-full gap-0">
        {/* Partie gauche - Textes et boutons */}
        <Col1 className="flex items-center justify-center px-6 md:px-12 py-12">
          <Col className="gap-20 max-w-100">
            {/* Textes */}
            <Col className="gap-4">
              <P14 className="text-primary font-bold uppercase tracking-wide">
                {header?.upTitle || tCommons('header.upTitle')}
              </P14>
              <Title>{header?.title || tCommons('header.title')}</Title>
              <P14 className="text-muted-foreground">
                {header?.subtitle || tCommons('header.subtitle')}
              </P14>
            </Col>

            {/* Boutons */}
            <Row className="gap-4">
              <Button size="lg">{tCommons('navbar.login')}</Button>
              <Button variant="ghost" size="lg" className="px-0 mx-6">
                {tCommons('navbar.signup')}
              </Button>
            </Row>
          </Col>
        </Col1>

        {/* Partie droite - Image */}
        <Col1 className="relative h-full flex items-center">
          <div className="relative w-full h-2/3">
            <Image
              src={imageUrl}
              alt={header?.header?.data?.alternativeText || 'Header'}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </Col1>
      </Grid2>
    </header>
  );
}
