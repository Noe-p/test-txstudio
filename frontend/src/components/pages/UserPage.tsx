'use client';
import { useUser } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import { Col } from '../utils/Flex';
import { Layout } from '../utils/Layout';
import { H1, P16 } from '../utils/Texts';

interface UserPageProps {
  slug: string;
}

export function UserPage({}: UserPageProps) {
  const user = useUser();
  const t = useTranslations('common');

  return (
    <Layout className="pt-24" requireAuth={true}>
      <Col className="gap-6 items-center">
        {user ? (
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
