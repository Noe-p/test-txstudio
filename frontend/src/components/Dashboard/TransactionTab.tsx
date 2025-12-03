import { DashboardType } from '@/types/strapi/singleTypes/dashboard';
import { useTranslations } from 'next-intl';
import { Col } from '../utils/Flex';
import { P10 } from '../utils/Texts';

interface TransactionTabProps {
  dashboardData?: DashboardType | null;
}

export function TransactionTab({ dashboardData }: TransactionTabProps): React.JSX.Element {
  const t = useTranslations('common');

  console.log('TransactionTab dashboardData:', dashboardData);

  return (
    <Col className=" mt-10 gap-10">
      <P10 className="text-muted-foreground">{t('dashboard.transactionsSection.title')}</P10>
    </Col>
  );
}
