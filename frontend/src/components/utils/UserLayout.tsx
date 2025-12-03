'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAppContext } from '@/contexts';
import { useIsAuthenticated, useUser } from '@/hooks/useAuth';
import { ROUTES } from '@/services/routes';
import { cn } from '@/services/utils';
import { IMAGE_FALLBACK } from '@/static/constants';
import { ConfigurationType } from '@/types/strapi/singleTypes/configuration';
import { ArrowLeftRight, Bell, Home, LifeBuoy, Settings, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { Col, Row, RowCenter } from './Flex';
import { P10, P14 } from './Texts';

interface UserLayoutProps {
  children?: ReactNode;
  className?: string;
  configurationData?: ConfigurationType | null;
}

export function UserLayout(props: UserLayoutProps): React.JSX.Element {
  const { children, className, configurationData } = props;
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const { setLogoUrl } = useAppContext();
  const user = useUser();
  const t = useTranslations('common');

  useEffect(() => {
    const logoUrl = configurationData?.logo?.url
      ? `${process.env.NEXT_PUBLIC_API_URL}${configurationData.logo.url}`
      : IMAGE_FALLBACK;
    setLogoUrl(logoUrl);
  }, [configurationData, setLogoUrl]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const logoUrl = configurationData?.logo?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${configurationData.logo.url}`
    : IMAGE_FALLBACK;

  const menuItems = useMemo(
    () => [
      {
        icon: Home,
        label: t('dashboard.sidebar.dashboard'),
        href: user ? ROUTES.user.dashboard : '#',
        disabled: false,
      },
      {
        icon: ArrowLeftRight,
        label: t('dashboard.sidebar.transactions'),
        href: '#',
        disabled: true,
      },
      {
        icon: Users,
        label: t('dashboard.sidebar.clients'),
        href: '#',
        disabled: true,
      },
      {
        icon: LifeBuoy,
        label: t('dashboard.sidebar.support'),
        href: '#',
        disabled: true,
      },
    ],
    [user, t],
  );

  const bottomMenuItems = useMemo(
    () => [
      {
        icon: Bell,
        label: t('dashboard.sidebar.notifications'),
        badge: 1,
        href: '#',
        disabled: true,
      },
      {
        icon: Settings,
        label: t('dashboard.sidebar.settings'),
        href: '#',
        disabled: true,
      },
    ],
    [t],
  );

  const getUserInitials = (username?: string) => {
    if (!username) return 'U';
    return username
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="px-6 py-4 mb-6">
            <Image
              src={logoUrl}
              alt="Logo"
              width={150}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item, index) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={index === 0}>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-center gap-3',
                            item.disabled && 'cursor-not-allowed opacity-60',
                          )}
                          onClick={(e) => item.disabled && e.preventDefault()}
                        >
                          <item.icon className="h-8 w-8" />
                          <span className="flex-1">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              <SidebarGroupContent className="mt-20">
                <SidebarMenu>
                  {bottomMenuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-center gap-3',
                            item.disabled && 'cursor-not-allowed opacity-60',
                          )}
                          onClick={(e) => item.disabled && e.preventDefault()}
                        >
                          <item.icon className="h-8 w-8" />
                          <RowCenter className="gap-2 flex-1 justify-between">
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                              <Badge
                                variant="default"
                                className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </RowCenter>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="px-6 py-4">
            <Row className="gap-3 items-center">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getUserInitials(user?.username)}
                </AvatarFallback>
              </Avatar>
              <Col className=" flex-1 min-w-0">
                <P14 className="font-bold truncate">{user?.username || t('user.loading')}</P14>
                <Row className="gap-2 items-center">
                  <P10 className="text-muted-foreground truncate">
                    {t('dashboard.sidebar.kycStatus')}
                    {':'}
                  </P10>
                  {user && (
                    <Badge
                      variant={user.confirmed ? 'default' : 'destructive'}
                      className="text-xs px-2 py-0"
                    >
                      {user.confirmed
                        ? t('dashboard.sidebar.kycValid')
                        : t('dashboard.sidebar.kycInvalid')}
                    </Badge>
                  )}
                </Row>
              </Col>
            </Row>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col bg-secondary">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
            <SidebarTrigger />
            <Image
              src={logoUrl}
              alt="Logo"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </header>
          <main className={cn('flex-1 overflow-auto', className)}>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
