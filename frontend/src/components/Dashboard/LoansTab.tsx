import { useAuthUser } from '@/hooks/useAuth';
import { getRiskData } from '@/services/utils';
import { DashboardType } from '@/types/strapi/singleTypes/dashboard';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FinancialGraph } from '../Charts/FinancialGraph';
import { Col, Row } from '../utils/Flex';
import { H2, H3, P10, P16 } from '../utils/Texts';
import { DashboardCard } from './DashboardCard';
import { RiskScoreGradient } from './RiskScoreGradient';

interface LoansTabProps {
  dashboardData?: DashboardType | null;
}

export function LoansTab({ dashboardData }: LoansTabProps): React.JSX.Element {
  const t = useTranslations('common');
  const { data: user } = useAuthUser();

  const riskData = getRiskData(dashboardData?.risk);

  return (
    <Col className=" mt-10 gap-10">
      <Col className="gap-3 w-full">
        <H3>{t('dashboard.myAccount')}</H3>
        <Row className="gap-3 w-full">
          {/* Card 1 - Profil */}
          <DashboardCard>
            <div className="absolute top-4 right-4">
              <Pencil className="h-5 w-5 text-background bg-foreground p-1 rounded cursor-pointer" />
            </div>
            <Col className="h-full justify-end">
              <P16 className="font-bold text-foreground">{`${user?.username ?? '-'} ${
                user?.lastName ?? ''
              }`}</P16>
              <P10 className="text-muted-foreground max-w-22">{user?.address ?? '-'}</P10>
            </Col>
          </DashboardCard>

          {/* Card 2 - Segment */}
          <DashboardCard>
            <Col className="gap-2 h-full justify-between">
              <P10 className="text-muted-foreground">{t('dashboard.cards.segment')}</P10>
              <Row className="w-full justify-end">
                <H2 className="text-primary">{dashboardData?.segment ?? '-'}</H2>
              </Row>
            </Col>
          </DashboardCard>

          {/* Card 3 - Évaluation des risques */}
          <DashboardCard>
            <Col className="gap-2  h-full justify-between">
              <Col>
                <P10 className="text-muted-foreground">{t('dashboard.cards.riskAssessment')}</P10>
                <P10 className="text-success font-bold">{riskData.text}</P10>
              </Col>
              <Row className="w-full justify-end">
                <H2 className="text-success">{riskData.letter}</H2>
              </Row>
            </Col>
          </DashboardCard>

          {/* Card 4 - Score risque */}
          <DashboardCard>
            <Col className="gap-4 h-full justify-between">
              <Col>
                <P10 className="text-muted-foreground">{t('dashboard.cards.riskScore')}</P10>
                <P10 className="font-bold">{'Lorem Ipsum'}</P10>
              </Col>
              <RiskScoreGradient score={riskData.letter} />
            </Col>
          </DashboardCard>

          {/* Card 5 - Montant dernière transaction */}
          <DashboardCard>
            <Col className="gap-2 h-full justify-between">
              <Col>
                <P10 className="text-muted-foreground">{t('dashboard.cards.lastTransaction')}</P10>
                <H3 className="text-primary font-bold">{dashboardData?.lastTransaction ?? '-'}</H3>
              </Col>
              <Image
                src="/icons/money-icon.webP"
                alt="Money Icon"
                width={40}
                height={40}
                className="object-contain self-end"
              />
            </Col>
          </DashboardCard>
        </Row>
      </Col>

      {/* Informations */}
      <Col className="gap-3 w-full">
        <H3>{t('dashboard.infos')}</H3>
        {dashboardData?.financialGraphData && (
          <FinancialGraph
            data={dashboardData?.financialGraphData?.chartData}
            seriesNames={dashboardData?.financialGraphData?.seriesNames}
          />
        )}
      </Col>
    </Col>
  );
}
