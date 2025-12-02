'use client';

import React from 'react';
import { Header } from '../Homepage/Header';
import { Loans } from '../Homepage/Loans';
import { Layout } from '../utils/Layout';

export function HomePage(): React.JSX.Element {
  return (
    <Layout>
      <Header />
      <Loans />
    </Layout>
  );
}
