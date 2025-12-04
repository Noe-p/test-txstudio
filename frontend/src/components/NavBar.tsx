'use client';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { RowBetween, RowCenter } from '@/components/utils/Flex';
import { P16 } from '@/components/utils/Texts';
import { useAuthContext } from '@/contexts/AuthContext';
import { ROUTES } from '@/services/routes';
import { cn } from '@/services/utils';
import { IMAGE_FALLBACK } from '@/static/constants';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface NavBarProps {
  className?: string;
  logoUrl?: string | null;
}

export function NavBar({ className, logoUrl }: NavBarProps): React.JSX.Element {
  const t = useTranslations('common');
  const { currentUser: user } = useAuthContext();

  return (
    <>
      {/* Version desktop / tablette */}
      <nav
        className={cn(
          'hidden md:block w-full py-4 px-12 md:px-24 fixed top-0 z-50 bg-background h-18',
          className,
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <RowBetween className="w-full">
          <RowCenter className="gap-18">
            <Link href="/" className="flex items-center">
              <Image
                src={logoUrl || IMAGE_FALLBACK}
                alt={t('navbar.logo')}
                width={150}
                height={50}
                priority
                className="max-h-10 object-contain"
              />
            </Link>
            <RowCenter className="gap-10">
              <Link href="#">
                <P16 className="hover:text-primary transition-colors cursor-pointer">
                  {t('navbar.loan')}
                </P16>
              </Link>
              <Link href="#">
                <P16 className="hover:text-primary transition-colors cursor-pointer">
                  {t('navbar.factoring')}
                </P16>
              </Link>
            </RowCenter>
          </RowCenter>

          <RowCenter className="gap-18">
            <RowCenter className="gap-10 hidden lg:flex">
              <Link href="#">
                <P16 className="hover:text-primary transition-colors cursor-pointer">
                  {t('navbar.simulator')}
                </P16>
              </Link>
              <Link href="#">
                <P16 className="hover:text-primary transition-colors cursor-pointer">
                  {t('navbar.contact')}
                </P16>
              </Link>
              <Link href="#">
                <P16 className="hover:text-primary transition-colors cursor-pointer">
                  {t('navbar.publications')}
                </P16>
              </Link>
            </RowCenter>
            <RowCenter className="gap-3">
              {user ? (
                <Link href={ROUTES.user.dashboard}>
                  <Button variant="default" size="default">
                    {t('navbar.dashboard')}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="#">
                    <Button variant="outline" size="default" className="cursor-not-allowed">
                      {t('generics.signup')}
                    </Button>
                  </Link>
                  <Link href={ROUTES.login}>
                    <Button variant="default" size="default">
                      {t('generics.login')}
                    </Button>
                  </Link>
                </>
              )}
            </RowCenter>
          </RowCenter>
        </RowBetween>
      </nav>

      {/* Version mobile avec Sidebar */}
      <SidebarProvider fullHeight={false} className="md:hidden">
        <nav
          className={cn(
            'w-full py-3 px-4 fixed top-0 z-50 bg-background h-16 flex items-center',
            className,
          )}
          role="navigation"
          aria-label="Main navigation mobile"
        >
          <RowBetween className="w-full">
            <Link href="/" className="flex items-center">
              <Image
                src={logoUrl || IMAGE_FALLBACK}
                alt={t('navbar.logo')}
                width={130}
                height={40}
                priority
                className="h-8 w-auto object-contain"
              />
            </Link>
            <SidebarTrigger />
          </RowBetween>
        </nav>

        <Sidebar side="right" collapsible="offcanvas" className="border-l">
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="#">
                        <span>{t('navbar.loan')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="#">
                        <span>{t('navbar.factoring')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="#">
                        <span>{t('navbar.simulator')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="#">
                        <span>{t('navbar.contact')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="#">
                        <span>{t('navbar.publications')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <div className="flex flex-col gap-3 w-full h-full">
                        {user ? (
                          <Link href={ROUTES.user.dashboard} className="w-full">
                            <Button
                              variant="default"
                              size="default"
                              className="w-full justify-center"
                            >
                              {t('navbar.dashboard')}
                            </Button>
                          </Link>
                        ) : (
                          <>
                            <Link href="#" className="w-full">
                              <Button
                                variant="outline"
                                size="default"
                                className="w-full cursor-not-allowed"
                              >
                                {t('generics.signup')}
                              </Button>
                            </Link>
                            <Link href={ROUTES.login} className="w-full">
                              <Button
                                variant="default"
                                size="default"
                                className="w-full justify-center"
                              >
                                {t('generics.login')}
                              </Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  );
}
