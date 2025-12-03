'use client';

import { Col } from '@/components/utils/Flex';
import { useAppContext } from '@/contexts';
import { cn } from '@/services/utils';
import { IMAGE_FALLBACK } from '@/static/constants';
import { ConfigurationType } from '@/types/strapi/singleTypes/configuration';
import React, { ReactNode, useEffect } from 'react';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';

interface LayoutProps {
  children?: ReactNode;
  className?: string;
  configurationData?: ConfigurationType | null;
}

export function Layout(props: LayoutProps): React.JSX.Element {
  const { children, className, configurationData } = props;
  const { setLogoUrl } = useAppContext();

  useEffect(() => {
    const logoUrl = configurationData?.logo?.url
      ? `${process.env.NEXT_PUBLIC_API_URL}${configurationData.logo.url}`
      : IMAGE_FALLBACK;
    setLogoUrl(logoUrl);
  }, [configurationData, setLogoUrl]);

  return (
    <Col className="bg-background text-foreground m-0 p-0">
      <NavBar
        logoUrl={
          configurationData?.logo?.url
            ? `${process.env.NEXT_PUBLIC_API_URL}${configurationData.logo.url}`
            : IMAGE_FALLBACK
        }
      />
      <Page className={className ?? ''}>{children}</Page>
      <Footer />
    </Col>
  );
}

interface PageProps {
  children?: ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => (
  <div className={cn('flex flex-col items-center min-h-screen mb-5 md:mb-20', className)}>
    {children}
  </div>
);
