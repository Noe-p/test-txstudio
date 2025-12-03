'use client';
import { LoansTab } from '@/components/Dashboard/LoansTab';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthUser } from '@/hooks/useAuth';
import { strapiApi } from '@/services/strapi/api';
import { ConfigurationType } from '@/types/strapi/singleTypes/configuration';
import { DashboardType } from '@/types/strapi/singleTypes/dashboard';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Col, RowBetween } from '../../utils/Flex';
import { H1 } from '../../utils/Texts';
import { UserLayout } from '../../utils/UserLayout';

interface DashboardPageProps {
  configurationData?: ConfigurationType | null;
}

export function DashboardPage({ configurationData }: DashboardPageProps) {
  const [mounted, setMounted] = useState(false);
  const { data: user } = useAuthUser();
  const t = useTranslations('common');

  const { data: dashboardData } = useQuery<DashboardType>({
    queryKey: ['dashboard'],
    queryFn: () => strapiApi.dashboard.get(),
    enabled: mounted && !!user,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <UserLayout configurationData={configurationData ?? null}>
      <Col className="gap-6">
        {!mounted ? (
          <H1>{t('user.loading')}</H1>
        ) : user ? (
          <Col className="gap-10">
            {/*  Header */}
            <RowBetween>
              <H1>{t('user.welcome', { username: user.username })}</H1>
              <Avatar className="h-10 w-10">
                {user?.profilePicture?.url && (
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_URL}${user.profilePicture.url}`}
                    alt={user.username}
                  />
                )}
                <AvatarFallback
                  className="bg-primary text-primary-foreground"
                  username={user?.username}
                >
                  {'?'}
                </AvatarFallback>
              </Avatar>
            </RowBetween>

            {/* Tabs */}
            <Col className="gap-4 w-full">
              <RowBetween className="items-center w-full">
                <Tabs defaultValue="loans" className="w-full">
                  <RowBetween className="items-center">
                    <TabsList>
                      <TabsTrigger value="loans">{t('dashboard.tabs.loans')}</TabsTrigger>
                      <TabsTrigger value="invoices">{t('dashboard.tabs.invoices')}</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto">
                      <Button
                        variant="default"
                        className="bg-primary text-primary-foreground rounded-md"
                      >
                        {t('dashboard.requestFunding')}
                      </Button>
                    </div>
                  </RowBetween>
                  <TabsContent value="loans">
                    <LoansTab dashboardData={dashboardData ?? null} />
                  </TabsContent>
                  <TabsContent value="invoices">
                    <div className="p-4 text-muted-foreground">
                      {"Contenu de l'onglet Mes factures"}
                    </div>
                  </TabsContent>
                </Tabs>
              </RowBetween>
            </Col>
          </Col>
        ) : (
          <H1>{t('user.loading')}</H1>
        )}
      </Col>
    </UserLayout>
  );
}
