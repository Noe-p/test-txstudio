'use client';

import { cn } from '@/services/utils';

import React from 'react';

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps): React.JSX.Element {
  return <nav className={cn(className)} role="navigation" aria-label="Main navigation"></nav>;
}
