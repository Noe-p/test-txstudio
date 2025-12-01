/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserPage } from '@/components/pages/UserPage';
import { PageBaseProps } from '@/types/next/PageBaseProps';

export async function generateStaticParams() {
  return [];
}

export default async function Detail({ params }: PageBaseProps) {
  const { slug } = await params;
  if (!slug) {
    throw new Error('Slug is required');
  } else return <UserPage slug={slug} />;
}
