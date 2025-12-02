import { Col } from '@/components/utils/Flex';
import { cn } from '@/services/utils';
import React, { ReactNode } from 'react';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';

interface LayoutProps {
  children?: ReactNode;
  className?: string;
}

export function Layout(props: LayoutProps): React.JSX.Element {
  const { children, className } = props;

  return (
    <Col className="bg-background text-foreground m-0 p-0">
      <NavBar />
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
