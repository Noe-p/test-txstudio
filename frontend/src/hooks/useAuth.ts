import { strapiApi } from '@/services/strapi/api';
import { HttpService } from '@/services/strapi/httpService';
import { LoginCredentials, LoginResponse, User } from '@/types/strapi/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials) => {
      return await strapiApi.auth.login(credentials);
    },
    onSuccess: (data) => {
      // Stocker le JWT
      if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Configurer le token dans le service HTTP
      HttpService.setToken(data.jwt);

      // Rediriger vers la page utilisateur
      router.push(`/users/${data.user.username}`);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
    }
    HttpService.setToken('');
    router.push('/login');
  };
};

// Hook pour récupérer l'utilisateur depuis le localStorage
export const useUser = () => {
  if (typeof window === 'undefined') return null;

  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};

// Hook pour vérifier si l'utilisateur est authentifié
export const useIsAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('jwt');
};
