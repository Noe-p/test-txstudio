import { AdvantageType } from '@/types/strapi/collectionTypes/advantage';
import { ServiceType } from '@/types/strapi/collectionTypes/service';
import { HeaderType } from '@/types/strapi/singleTypes/header';
import React from 'react';
import { Advantages } from '../Homepage/Advantages';
import { Header } from '../Homepage/Header';
import { Services } from '../Homepage/Services';
import { Layout } from '../utils/Layout';

interface HomePageProps {
  headerData: HeaderType | null;
  advantagesData: AdvantageType[] | null;
  servicesData: ServiceType[] | null;
}

export function HomePage({
  headerData,
  advantagesData,
  servicesData,
}: HomePageProps): React.JSX.Element {
  return (
    <Layout>
      <Header data={headerData} />
      <Services data={servicesData} />
      <Advantages data={advantagesData} />
    </Layout>
  );
}
