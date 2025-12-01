'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Layout } from '../utils/Layout';
import { H1 } from '../utils/Texts';

export function HomePage(): React.JSX.Element {
  const tCommons = useTranslations('common');

  return (
    <Layout>
      <H1>{tCommons('home.name')}</H1>
    </Layout>
  );
}
