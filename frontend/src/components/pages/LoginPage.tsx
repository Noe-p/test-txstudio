'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { RowCenter } from '../utils/Flex';
import { Grid2 } from '../utils/Grid';
import { Layout } from '../utils/Layout';
import { H2, P14, P16 } from '../utils/Texts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useAuthContext } from '@/contexts/AuthContext';
import { strapiApi } from '@/services/strapi/api';
import { ConfigurationType } from '@/types/strapi/singleTypes/configuration';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginPageProps {
  configurationData: ConfigurationType | null;
}

export function LoginPage(props: LoginPageProps): React.JSX.Element {
  const { configurationData } = props;
  const t = useTranslations('common');
  const router = useRouter();
  const { setToken } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: async (credentials: { identifier: string; password: string }) => {
      return await strapiApi.auth.login(credentials);
    },
    onSuccess: (data) => {
      setToken(data.jwt);
      router.push('/users/dashboard');
    },
  });

  // Validation
  const isEmailValid = email.length > 0 && email.includes('@');
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    loginMutation.mutate({
      identifier: email,
      password: password,
    });
  };

  return (
    <Layout
      className="flex items-center justify-center"
      configurationData={configurationData ?? null}
    >
      <div className="w-full px-6 md:px-10">
        <div className="mx-auto w-full max-w-4xl md:max-w-5xl">
          <Grid2 className="rounded-lg overflow-hidden shadow-sm bg-background">
            {/* Panneau de gauche (visuel / bénéfices) */}
            <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-primary-foreground">
              <div>
                <H2 className="text-primary-foreground mb-3">{t('login.welcome')}</H2>
                <P16 className="opacity-95">{t('login.welcomeDescription')}</P16>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  t('login.benefits.secure'),
                  t('login.benefits.tracking'),
                  t('login.benefits.support'),
                  t('login.benefits.tools'),
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 mt-0.5" />
                    <P14>{benefit}</P14>
                  </li>
                ))}
              </ul>
            </div>

            {/* Panneau de droite (formulaire) */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('login.title')}</CardTitle>
                <CardDescription>{t('login.description')}</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={onSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t('generics.email')}
                    </label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                      <Input
                        id="email"
                        name="identifier"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder={t('login.emailPlaceholder')}
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={!!loginMutation.error || (email.length > 0 && !isEmailValid)}
                        aria-describedby={loginMutation.error ? 'login-error' : undefined}
                        disabled={loginMutation.isPending}
                      />
                    </div>
                    {email.length > 0 && !isEmailValid && (
                      <P14 className="text-destructive mt-1 text-xs">
                        {t('login.validation.emailInvalid')}
                      </P14>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                      {t('generics.password')}
                    </label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder={t('login.passwordPlaceholder')}
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loginMutation.isPending}
                      />
                    </div>
                    {password.length > 0 && !isPasswordValid && (
                      <P14 className="text-destructive mt-1 text-xs">
                        {t('login.validation.passwordTooShort')}
                      </P14>
                    )}
                  </div>

                  {loginMutation.error && (
                    <P14 id="login-error" className="text-destructive">
                      {loginMutation.error.message}
                    </P14>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={loginMutation.isPending}
                    disabled={!isFormValid || loginMutation.isPending}
                  >
                    {t('generics.login')}
                  </Button>

                  <RowCenter className="justify-between">
                    <Link
                      href="#"
                      className="text-sm text-success hover:opacity-80  cursor-not-allowed"
                    >
                      {t('generics.forgotPassword')}
                    </Link>
                    <Link
                      href="#"
                      className="text-sm text-success hover:opacity-80  cursor-not-allowed"
                    >
                      {t('generics.signup')}
                    </Link>
                  </RowCenter>
                </form>
              </CardContent>

              <CardFooter />
            </Card>
          </Grid2>
        </div>
      </div>
    </Layout>
  );
}
