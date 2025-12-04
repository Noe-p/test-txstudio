'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useAuthContext } from '@/contexts/AuthContext';
import { ROUTES } from '@/services/routes';
import { cn } from '@/services/utils';
import { IMAGE_FALLBACK } from '@/static/constants';
import { ConfigurationType } from '@/types/strapi/singleTypes/configuration';
import { ArrowLeftRight, Bell, Home, LifeBuoy, LogOut, Settings, Users } from 'lucide-react';
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
  const { currentUser: user, isAuthenticated, removeToken } = useAuthContext();
  const router = useRouter();
  const { setLogoUrl } = useAppContext();
  const t = useTranslations('common');

  const handleLogout = async () => {
    await removeToken();
    router.push('/');
  };

  interface MenuItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href?: string;
    disabled: boolean;
    action?: () => Promise<void>;
    badge?: number;
  }

  useEffect(() => {
    const logoUrl = configurationData?.logo?.url
      ? `${process.env.NEXT_PUBLIC_API_URL}${configurationData.logo.url}`
      : IMAGE_FALLBACK;
    setLogoUrl(logoUrl);
  }, [configurationData, setLogoUrl]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    }
  }, [router, isAuthenticated]);

  const logoUrl = configurationData?.logo?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${configurationData.logo.url}`
    : IMAGE_FALLBACK;

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        icon: Home,
        label: t('dashboard.sidebar.dashboard'),
        href: ROUTES.user.dashboard,
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
    [t],
  );

  const bottomMenuItems: MenuItem[] = useMemo(
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
      {
        icon: LogOut,
        label: t('dashboard.sidebar.logout'),
        href: '#',
        disabled: false,
        action: handleLogout,
      },
    ],
    [t, handleLogout],
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="px-6 py-4 mb-6 ">
            <Link href={ROUTES.home} className="flex justify-center">
              <Image
                src={logoUrl}
                alt="Logo"
                width={150}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item, index) => {
                    const href = item.href || '#';
                    return (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton asChild isActive={index === 0}>
                          <Link
                            href={href}
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
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
              <SidebarGroupContent className="mt-20">
                <SidebarMenu>
                  {bottomMenuItems.map((item) => {
                    const isActionItem = item.action !== undefined;
                    const href = item.href || '#';
                    const badge = item.badge;
                    const Icon = item.icon;
                    const label = item.label;
                    return (
                      <SidebarMenuItem key={label}>
                        <SidebarMenuButton asChild>
                          {isActionItem ? (
                            <button
                              onClick={() => {
                                if (item.action) {
                                  void item.action();
                                }
                              }}
                              className={cn(
                                'flex items-center justify-center gap-3 w-full text-left rounded-md px-3 py-2 transition-colors',
                                !item.disabled && 'hover:bg-secondary hover:text-primary',
                                item.disabled && 'cursor-not-allowed opacity-60',
                              )}
                            >
                              <Icon className="h-8 w-8" />
                              <RowCenter className="gap-2 flex-1 justify-between">
                                <span className="flex-1">{label}</span>
                                {badge && (
                                  <Badge
                                    variant="default"
                                    className="bg-secondary text-secondary-foreground rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs"
                                  >
                                    {badge}
                                  </Badge>
                                )}
                              </RowCenter>
                            </button>
                          ) : (
                            <Link
                              href={href}
                              className={cn(
                                'flex items-center justify-center gap-3 rounded-md px-3 py-2 transition-colors',
                                !item.disabled && 'hover:bg-secondary hover:text-primary',
                                item.disabled && 'cursor-not-allowed opacity-60',
                              )}
                              onClick={(e) => item.disabled && e.preventDefault()}
                            >
                              <Icon className="h-8 w-8" />
                              <RowCenter className="gap-2 flex-1 justify-between">
                                <span className="flex-1">{label}</span>
                                {badge && (
                                  <Badge
                                    variant="default"
                                    className="bg-secondary text-secondary-foreground rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs"
                                  >
                                    {badge}
                                  </Badge>
                                )}
                              </RowCenter>
                            </Link>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="px-6 py-4">
            <Row className="gap-3 items-center">
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
              <Col className=" flex-1 min-w-0">
                <P14 className="font-bold truncate" suppressHydrationWarning>
                  {`${user?.username ?? t('user.loading')} ${user?.lastName ?? ''}`}
                </P14>
                <Row className="gap-2 items-center">
                  <P10 className="text-muted-foreground truncate">
                    {t('dashboard.sidebar.kycStatus')}
                    {':'}
                  </P10>
                  <Badge
                    variant={user?.confirmed ? 'default' : 'destructive'}
                    className="text-xs px-2 py-0"
                    suppressHydrationWarning
                  >
                    {user?.confirmed
                      ? t('dashboard.sidebar.kycValid')
                      : t('dashboard.sidebar.kycInvalid')}
                  </Badge>
                </Row>
              </Col>
            </Row>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col bg-secondary min-w-0">
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
          <main className={cn('flex-1 overflow-auto p-4 md:p-8 pb-20 md:pb-30', className)}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
