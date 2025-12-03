/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserPage } from '@/components/pages/UserPage';
import { strapiApi } from '@/services/strapi/api';
import { PageBaseProps } from '@/types/next/PageBaseProps';

export async function generateStaticParams() {
  return [];
}

export default async function Detail({ params }: PageBaseProps) {
  const { slug } = await params;
  if (!slug) {
    throw new Error('Slug is required');
  }

  let configurationData = null;

  try {
    configurationData = await strapiApi.configuration.get();
  } catch (error) {
    console.error('Failed to fetch configuration data:', error);
  }

  return <UserPage slug={slug} configurationData={configurationData} />;
}
