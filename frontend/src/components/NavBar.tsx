'use client';

import { Button } from '@/components/ui/button';
import { RowBetween, RowCenter } from '@/components/utils/Flex';
import { P16 } from '@/components/utils/Texts';
import { useUser } from '@/hooks/useAuth';
import { ROUTES } from '@/services/routes';
import { cn } from '@/services/utils';
import { IMAGE_FALLBACK } from '@/static/constants';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface NavBarProps {
  className?: string;
  logoUrl?: string | null;
}

export function NavBar({ className, logoUrl }: NavBarProps): React.JSX.Element {
  const t = useTranslations('common');
  const [mounted, setMounted] = useState(false);
  const user = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      className={cn('w-full py-4 px-12 md:px-24 fixed top-0 z-50 bg-background h-18', className)}
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
          <RowCenter className="gap-10 hidden md:flex">
            <Link href="/pret">
              <P16 className="hover:text-primary transition-colors cursor-pointer">
                {t('navbar.loan')}
              </P16>
            </Link>
            <Link href="/affacturage">
              <P16 className="hover:text-primary transition-colors cursor-pointer">
                {t('navbar.factoring')}
              </P16>
            </Link>
          </RowCenter>
        </RowCenter>

        <RowCenter className="gap-18">
          <RowCenter className="gap-10 hidden lg:flex">
            <Link href="/simulateur">
              <P16 className="hover:text-primary transition-colors cursor-pointer">
                {t('navbar.simulator')}
              </P16>
            </Link>
            <Link href="/contact">
              <P16 className="hover:text-primary transition-colors cursor-pointer">
                {t('navbar.contact')}
              </P16>
            </Link>
            <Link href="/publications">
              <P16 className="hover:text-primary transition-colors cursor-pointer">
                {t('navbar.publications')}
              </P16>
            </Link>
          </RowCenter>
          <RowCenter className="gap-3">
            {!mounted ? (
              // Rendu par défaut pendant l'hydration (identique au SSR)
              <>
                <Link href="#">
                  <Button variant="outline" size="default" className=" cursor-not-allowed">
                    {t('generics.signup')}
                  </Button>
                </Link>
                <Link href={ROUTES.login}>
                  <Button variant="default" size="default">
                    {t('generics.login')}
                  </Button>
                </Link>
              </>
            ) : user ? (
              <Link href={ROUTES.user(user.username)}>
                <Button variant="default" size="default">
                  {t('navbar.dashboard')}
                </Button>
              </Link>
            ) : (
              <>
                <Link href="#">
                  <Button variant="outline" size="default" className=" cursor-not-allowed">
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
  );
}
