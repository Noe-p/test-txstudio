import { HomePage } from '@/components/pages/HomePage';
import { locales } from '@/i18n/config';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Page(): React.JSX.Element {
  return <HomePage />;
}
