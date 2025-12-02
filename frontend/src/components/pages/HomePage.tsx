import { HeaderType } from '@/types/strapi/singleTypes/header';
import React from 'react';
import { Cards } from '../Homepage/Cards';
import { Header } from '../Homepage/Header';
import { Loans } from '../Homepage/Loans';
import { Layout } from '../utils/Layout';

interface HomePageProps {
  headerData: HeaderType | null;
}

export function HomePage({ headerData }: HomePageProps): React.JSX.Element {
  return (
    <Layout>
      <Header data={headerData} />
      <Loans />
      <Cards />
    </Layout>
  );
}
