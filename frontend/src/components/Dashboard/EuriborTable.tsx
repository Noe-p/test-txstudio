import { EuriborData } from '@/types/strapi/singleTypes/dashboard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Col } from '../utils/Flex';
import { P12 } from '../utils/Texts';

interface EuriborTableProps {
  data?: Record<string, EuriborData[]> | null | undefined;
}

export function EuriborTable({ data }: EuriborTableProps): React.JSX.Element {
  const euriborData = data ?? {};
  return (
    <Col className="gap-4 bg-card rounded-lg p-6">
      <Tabs defaultValue="euribor1w" className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-4 bg-secondary">
          <TabsTrigger value="euribor1w" className="text-xs bg-secondary h-10 px-0">
            {'Euribor1w'}
          </TabsTrigger>
          <TabsTrigger value="euribor2w" className="text-xs bg-secondary h-10 px-0">
            {'Euribor2w'}
          </TabsTrigger>
          <TabsTrigger value="euribor3w" className="text-xs bg-secondary  h-10 px-0">
            {'Euribor3w'}
          </TabsTrigger>
          <TabsTrigger value="average" className="text-xs bg-secondary  h-10 px-0">
            {'Average Sector Spread'}
          </TabsTrigger>
        </TabsList>

        {(['euribor1w', 'euribor2w', 'euribor3w', 'average'] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            {euriborData[tab] && euriborData[tab].length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenor</TableHead>
                    <TableHead>Market Place</TableHead>
                    <TableHead>
                      <div className="leading-tight">
                        Market Risk Free
                        <br />
                        <span className="font-normal">Date</span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="leading-tight">
                        Market Risk Free
                        <br />
                        <span className="font-normal">Premium</span>
                      </div>
                    </TableHead>
                    <TableHead>Change %</TableHead>
                    <TableHead>Variation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {euriborData[tab].map((row) => (
                    <TableRow key={row.tenor}>
                      <TableCell>{row.tenor}</TableCell>
                      <TableCell>{row.marketPlace}</TableCell>
                      <TableCell>{row.marketRiskFreeDate}</TableCell>
                      <TableCell>{row.marketRiskFreePremium}</TableCell>
                      <TableCell>{row.change}</TableCell>
                      <TableCell>{row.variation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <P12 className="text-muted-foreground">{'No data available'}</P12>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Col>
  );
}
