'use client';
import { useUser } from '@/hooks/useAuth';
import { ConfigurationType } from '@/types/strapi/singleTypes/configuration';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Col } from '../utils/Flex';
import { Layout } from '../utils/Layout';
import { H1, P16 } from '../utils/Texts';

interface UserPageProps {
  slug: string;
  configurationData?: ConfigurationType | null;
}

export function UserPage({ configurationData }: UserPageProps) {
  const [mounted, setMounted] = useState(false);
  const user = useUser();
  const t = useTranslations('common');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout className="pt-24" requireAuth={true} configurationData={configurationData ?? null}>
      <Col className="gap-6 items-center">
        {!mounted ? (
          // Rendu par défaut pendant l'hydration (identique au SSR)
          <H1>{t('user.loading')}</H1>
        ) : user ? (
          <>
            <H1>{t('user.welcome', { username: user.username })}</H1>
            <P16 className="text-muted-foreground">{user.email}</P16>
            <P16 className="text-sm text-muted-foreground">
              {t('user.accountStatus', {
                status: user.confirmed ? t('user.confirmed') : t('user.notConfirmed'),
              })}
            </P16>
          </>
        ) : (
          <H1>{t('user.loading')}</H1>
        )}
      </Col>
    </Layout>
  );
}
