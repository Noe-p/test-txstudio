import { EuriborData } from '@/types/strapi/singleTypes/euribor';
import { useTranslations } from 'next-intl';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Col } from '../utils/Flex';
import { P12 } from '../utils/Texts';

interface EuriborTableProps {
  data?:
    | {
        euribor1w?: EuriborData[];
        euribor2w?: EuriborData[];
        euribor3w?: EuriborData[];
        average?: EuriborData[];
      }
    | null
    | undefined;
}

export function EuriborTable({ data }: EuriborTableProps): React.JSX.Element {
  const t = useTranslations('common');
  const euriborData = data ?? {};
  return (
    <Col className="gap-4 bg-card rounded-lg p-6">
      <Tabs defaultValue="euribor1w" className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-4 bg-secondary">
          <TabsTrigger value="euribor1w" className="text-xs bg-secondary h-10 px-0">
            {t('euriborTable.euribor1w')}
          </TabsTrigger>
          <TabsTrigger value="euribor2w" className="text-xs bg-secondary h-10 px-0">
            {t('euriborTable.euribor2w')}
          </TabsTrigger>
          <TabsTrigger value="euribor3w" className="text-xs bg-secondary  h-10 px-0">
            {t('euriborTable.euribor3w')}
          </TabsTrigger>
          <TabsTrigger value="average" className="text-xs bg-secondary  h-10 px-0">
            {t('euriborTable.average')}
          </TabsTrigger>
        </TabsList>

        {(['euribor1w', 'euribor2w', 'euribor3w', 'average'] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            {euriborData[tab] && euriborData[tab].length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left px-0">{t('euriborTable.tenor')}</TableHead>
                    <TableHead className="text-left px-0">
                      {t('euriborTable.marketPlace')}
                    </TableHead>
                    <TableHead className="text-left px-0">
                      {t('euriborTable.marketRiskFreePremium')}
                    </TableHead>
                    <TableHead className="text-left px-0">
                      {t('euriborTable.marketRiskFreePremium')}
                    </TableHead>
                    <TableHead className="text-left px-0">{t('euriborTable.change')}</TableHead>
                    <TableHead className="text-left px-0">{t('euriborTable.variation')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {euriborData[tab].map((row) => (
                    <TableRow key={row.tenor}>
                      <TableCell className="w-20">{row.tenor}</TableCell>
                      <TableCell className="w-20">{row.marketPlace}</TableCell>
                      <TableCell className="w-20">{row.marketRiskFreeDate}</TableCell>
                      <TableCell className="w-20">{row.marketRiskFreePremium}</TableCell>
                      <TableCell className="w-20">{row.change}</TableCell>
                      <TableCell className="w-20">{row.variation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <P12 className="text-muted-foreground">{t('euriborTable.noData')}</P12>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Col>
  );
}
