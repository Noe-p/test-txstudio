import { AdvantageType } from '@/types/strapi/componentTypes/advantage';
import { HeaderType } from '@/types/strapi/componentTypes/header';
import { ServiceType } from '@/types/strapi/componentTypes/service';
import { ConfigurationType } from '@/types/strapi/singleTypes/configuration';
import React from 'react';
import { Advantages } from '../Homepage/Advantages';
import { Header } from '../Homepage/Header';
import { Services } from '../Homepage/Services';
import { Layout } from '../utils/Layout';

interface HomePageProps {
  headerData: HeaderType | null;
  advantagesData: AdvantageType[] | null;
  servicesData: ServiceType[] | null;
  configurationData?: ConfigurationType | null;
}

export function HomePage({
  headerData,
  advantagesData,
  servicesData,
  configurationData,
}: HomePageProps): React.JSX.Element {
  return (
    <Layout configurationData={configurationData ?? null}>
      <Header data={headerData} />
      <Services data={servicesData} />
      <Advantages data={advantagesData} />
    </Layout>
  );
}
