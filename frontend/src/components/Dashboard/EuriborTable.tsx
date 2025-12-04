import { EuriborType } from '@/types/strapi/collectionTypes/euribor';
import { useTranslations } from 'next-intl';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Col } from '../utils/Flex';
import { P12 } from '../utils/Texts';

interface EuriborTableProps {
  euribors?: EuriborType[] | null;
}

export function EuriborTable({ euribors }: EuriborTableProps): React.JSX.Element {
  const t = useTranslations('common');
  const euriborsList = euribors ?? [];

  if (euriborsList.length === 0) {
    return (
      <Col className="gap-4 bg-card rounded-lg p-6">
        <P12 className="text-muted-foreground">{t('euriborTable.noData')}</P12>
      </Col>
    );
  }

  const defaultTab = euriborsList[0]?.id?.toString() ?? '0';

  return (
    <Col className="gap-4 bg-card rounded-lg p-6">
      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="mb-6 w-full overflow-x-auto">
          <TabsList className="bg-secondary flex w-max min-w-full">
            {euriborsList.map((euribor) => (
              <TabsTrigger
                key={euribor.id}
                value={euribor.id?.toString() ?? ''}
                className="text-xs bg-secondary h-10 px-4 whitespace-nowrap"
              >
                {euribor.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {euriborsList.map((euribor) => (
          <TabsContent key={euribor.id} value={euribor.id?.toString() ?? ''}>
            {euribor.table && euribor.table.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[640px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left px-0">{t('euriborTable.tenor')}</TableHead>
                      <TableHead className="text-left px-0">
                        {t('euriborTable.marketPlace')}
                      </TableHead>
                      <TableHead className="text-left px-0">
                        {t('euriborTable.marketRiskFreeDate')}
                      </TableHead>
                      <TableHead className="text-left px-0">
                        {t('euriborTable.marketRiskFreePremium')}
                      </TableHead>
                      <TableHead className="text-left px-0">{t('euriborTable.change')}</TableHead>
                      <TableHead className="text-left px-0">
                        {t('euriborTable.variation')}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {euribor.table.map((row, index) => (
                      <TableRow key={row.tenor ?? index}>
                        <TableCell className="whitespace-nowrap">{row.tenor}</TableCell>
                        <TableCell className="whitespace-nowrap">{row.marketPlace}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          {row.marketRiskFreeDate}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {row.marketRiskFreePremium}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{row.change}</TableCell>
                        <TableCell className="whitespace-nowrap">{row.variation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <P12 className="text-muted-foreground">{t('euriborTable.noData')}</P12>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Col>
  );
}
