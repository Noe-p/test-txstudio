import { strapiApi } from '@/services/strapi/api';
import type { LoanType } from '@/types/strapi/collectionTypes/loan';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Loader } from '../Loaders/Loader';
import { Col, ColCenter, Row } from '../utils/Flex';
import { H1, P12 } from '../utils/Texts';
import { ClosureCard } from './ClosureCard';
import { DashboardCard } from './DashboardCard';
import { LoansTable } from './LoansTable';
import { LoanStatusItem, getStatusMeta } from './LoanStatusItem';
import { ValidationStepsCard } from './ValidationStepsCard';

export function TransactionTab(): React.JSX.Element {
  const t = useTranslations('common');

  const {
    data: loans,
    isLoading,
    isError,
  } = useQuery<LoanType[]>({
    queryKey: ['loans'],
    queryFn: () => strapiApi.loans.getAll(),
  });

  return (
    <Col className=" mt-10 gap-10">
      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader />
        </div>
      )}
      {!isLoading && !isError && loans && (
        <Col>
          <Row className="gap-3 w-full">
            <DashboardCard>
              <Col className="gap-4 w-full">
                <P12>{t('transactionTab.state')}</P12>
                <LoanStatusItem title={loans[0].title} status={loans[0].loanStatus} />
                <LoanStatusItem title={loans[1].title} status={loans[1].loanStatus} />
                <P12 className="mt-2 text-foreground text-center underline underline-offset-2 cursor-pointer">
                  {t('transactionTab.createNewFile')}
                </P12>
              </Col>
            </DashboardCard>

            <DashboardCard>
              <Col className="gap-3 w-full">
                <P12>{loans[0].title}</P12>
                <ColCenter className="h-full gap-3 mt-5">
                  <H1 className="">{loans[0].stateInfo?.currentAmount + '€'}</H1>
                  <P12 className="text-muted-foreground">{loans[0].stateInfo?.subtitle}</P12>
                  {(() => {
                    const { colorClass, Icon } = getStatusMeta(loans[0].loanStatus);
                    return (
                      <Row className="items-center gap-2">
                        <Icon className={`h-4 w-4 ${colorClass}`} aria-hidden />
                        <P12 className={colorClass}>{loans[0].stateInfo?.statusGroup}</P12>
                      </Row>
                    );
                  })()}
                </ColCenter>
              </Col>
            </DashboardCard>

            <DashboardCard>
              <ValidationStepsCard
                steps={loans[1].validationSteps}
                loanTitle={loans[1].title}
                status={loans[1].loanStatus}
              />
            </DashboardCard>

            <DashboardCard>
              <ClosureCard
                status={loans[0].stateInfo?.statusGroup}
                timeline={loans[0].timeline}
                loanTitle={loans[0].title}
              />
            </DashboardCard>
          </Row>
          <Col className="gap-4 w-full mt-6">
            <LoansTable loans={loans} />
          </Col>
        </Col>
      )}
    </Col>
  );
}
