import { cn } from '@/services/utils';
import React from 'react';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps): React.JSX.Element {
  return <footer className={cn(className)}></footer>;
}
