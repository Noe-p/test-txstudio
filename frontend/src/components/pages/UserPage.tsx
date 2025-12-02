/* eslint-disable indent */
'use client';
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
    <Layout>
      <H1>Loading</H1>
    </Layout>
  );
}
