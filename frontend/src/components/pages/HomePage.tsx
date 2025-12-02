import { AdvantageType } from '@/types/strapi/collectionTypes/advantage';
import { HeaderType } from '@/types/strapi/singleTypes/header';
import React from 'react';
import { Advantages } from '../Homepage/Advantages';
import { Header } from '../Homepage/Header';
import { Loans } from '../Homepage/Loans';
import { Layout } from '../utils/Layout';

interface HomePageProps {
  headerData: HeaderType | null;
  advantagesData: AdvantageType[] | null;
}

export function HomePage({ headerData, advantagesData }: HomePageProps): React.JSX.Element {
  return (
    <Layout>
      <Header data={headerData} />
      <Loans />
      <Advantages data={advantagesData} />
    </Layout>
  );
}
