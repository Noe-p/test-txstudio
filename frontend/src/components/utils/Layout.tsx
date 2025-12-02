'use client';

import { Col } from '@/components/utils/Flex';
import { useIsAuthenticated } from '@/hooks/useAuth';
import { cn } from '@/services/utils';
import { ConfigurationType } from '@/types/strapi/singleTypes/configuration';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';

interface LayoutProps {
  children?: ReactNode;
  className?: string;
  configurationData?: ConfigurationType | null;
  requireAuth?: boolean;
}

export function Layout(props: LayoutProps): React.JSX.Element {
  const { children, className, configurationData, requireAuth = false } = props;
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push('/');
    }
  }, [requireAuth, isAuthenticated, router]);

  const logoUrl = configurationData?.logo?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${configurationData.logo.url}`
    : undefined;

  return (
    <Col className="bg-background text-foreground m-0 p-0">
      <NavBar logoUrl={logoUrl} />
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
