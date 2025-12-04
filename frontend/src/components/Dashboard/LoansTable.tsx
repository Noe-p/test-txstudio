import type { LoanType } from '@/types/strapi/collectionTypes/loan';
import { useTranslations } from 'next-intl';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Col } from '../utils/Flex';
import { P12 } from '../utils/Texts';
import { getStatusMeta } from './LoanStatusItem';

interface LoansTableProps {
  loans?: LoanType[];
}

const CenteredTableHead = ({ children }: { children: React.ReactNode }) => (
  <TableHead className="text-center leading-tight px-9">{children}</TableHead>
);

const CenteredCell = ({ children }: { children: React.ReactNode }) => (
  <P12 className="text-center text-muted-foreground text-[12px]">{children}</P12>
);

export function LoansTable({ loans }: LoansTableProps): React.JSX.Element {
  const t = useTranslations('common');

  if (!loans || loans.length === 0) {
    return <P12 className="text-muted-foreground">{t('loansTable.title')}</P12>;
  }

  return (
    <>
      <Col className="bg-background p-5 rounded-lg min-w-0">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-25">{}</TableHead>
                <CenteredTableHead>{t('loansTable.contractNumber')}</CenteredTableHead>
                <CenteredTableHead>{t('loansTable.borrowerId')}</CenteredTableHead>
                <CenteredTableHead>{t('loansTable.requestedAmount')}</CenteredTableHead>
                <CenteredTableHead>{t('loansTable.loanAmount')}</CenteredTableHead>
                <CenteredTableHead>{t('loansTable.monthlyPayment')}</CenteredTableHead>
                <CenteredTableHead>{t('loansTable.duration')}</CenteredTableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-bold text-foreground">{loan.title}</TableCell>

                  <TableCell>
                    <CenteredCell>{loan.borrowerInfo?.contractNumber || '-'}</CenteredCell>
                  </TableCell>

                  <TableCell>
                    <CenteredCell>{loan.borrowerInfo?.borrowerId || '-'}</CenteredCell>
                  </TableCell>

                  <TableCell>
                    <CenteredCell>
                      {loan.borrowerInfo?.requestedAmount
                        ? `${loan.borrowerInfo.requestedAmount}€`
                        : t('loansTable.pending')}
                    </CenteredCell>
                  </TableCell>

                  <TableCell>
                    <CenteredCell>
                      {loan.borrowerInfo?.currentLoanAmount
                        ? `${loan.borrowerInfo.currentLoanAmount}€`
                        : t('loansTable.pending')}
                    </CenteredCell>
                  </TableCell>

                  <TableCell>
                    <CenteredCell>
                      {loan.borrowerInfo?.monthlyPayment
                        ? `${loan.borrowerInfo.monthlyPayment}€`
                        : t('loansTable.pending')}
                    </CenteredCell>
                  </TableCell>

                  <TableCell>
                    <CenteredCell>
                      {loan.borrowerInfo?.durationMonths
                        ? `${loan.borrowerInfo.durationMonths} ${t('loansTable.months')}`
                        : t('loansTable.pending')}
                    </CenteredCell>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Col>

      <Col className="bg-background p-5 rounded-lg overflow-x-auto">
        <Table className="min-w-[640px]">
          <TableHeader className="">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-25">{}</TableHead>
              <CenteredTableHead>{t('financialDetailsTable.interestRate')}</CenteredTableHead>
              <CenteredTableHead>{t('financialDetailsTable.commission')}</CenteredTableHead>
              <CenteredTableHead>{t('financialDetailsTable.effectiveRate')}</CenteredTableHead>
              <CenteredTableHead>{t('financialDetailsTable.requestDate')}</CenteredTableHead>
              <CenteredTableHead>{t('financialDetailsTable.lastDueDate')}</CenteredTableHead>
              <CenteredTableHead>{t('financialDetailsTable.requestStatus')}</CenteredTableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow
                key={`financial-${loan.id}`}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-bold text-foreground">{loan.title}</TableCell>
                <TableCell>
                  <CenteredCell>
                    {loan.financialInfo?.interestRate ? `${loan.financialInfo.interestRate}` : '-'}
                  </CenteredCell>
                </TableCell>
                <TableCell>
                  <CenteredCell>{loan.financialInfo?.commission || '-'}</CenteredCell>
                </TableCell>
                <TableCell>
                  <CenteredCell>{loan.financialInfo?.taeg || '-'}</CenteredCell>
                </TableCell>
                <TableCell>
                  <CenteredCell>
                    {loan.financialInfo?.requestDate
                      ? new Date(loan.financialInfo.requestDate).toLocaleDateString('fr-FR')
                      : '-'}
                  </CenteredCell>
                </TableCell>
                <TableCell>
                  <CenteredCell>
                    {loan.financialInfo?.lastDueDate
                      ? new Date(loan.financialInfo.lastDueDate).toLocaleDateString('fr-FR')
                      : t('financialDetailsTable.pending')}
                  </CenteredCell>
                </TableCell>
                <TableCell>
                  {(() => {
                    const status = loan.financialInfo?.requestStatus;
                    if (!status) return <CenteredCell>{'-'}</CenteredCell>;
                    const { colorClass } = getStatusMeta(status);
                    return (
                      <CenteredCell>
                        <span className={colorClass}>{status}</span>
                      </CenteredCell>
                    );
                  })()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Col>
    </>
  );
}
