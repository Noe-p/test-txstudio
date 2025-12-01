/* eslint-disable indent */
'use client';
import { FullPageLoader } from '@/components/Loaders/FullPageLoader';
import { Layout } from '../utils/Layout';
import { H1 } from '../utils/Texts';

interface UserPageProps {
  slug: string;
}

export function UserPage({ slug }: UserPageProps) {
  return slug ? (
    <Layout>
      <H1>Project: {slug}</H1>
    </Layout>
  ) : (
    <FullPageLoader />
  );
}
