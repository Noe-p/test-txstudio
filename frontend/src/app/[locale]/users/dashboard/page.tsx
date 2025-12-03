/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardPage } from '@/components/pages/User/DashboardPage';
import { strapiApi } from '@/services/strapi/api';

export async function generateStaticParams() {
  return [];
}

export default async function Detail() {
  let configurationData = null;

  try {
    configurationData = await strapiApi.configuration.get();
  } catch (error) {
    console.error('Failed to fetch configuration data:', error);
  }

  return <DashboardPage configurationData={configurationData} />;
}
