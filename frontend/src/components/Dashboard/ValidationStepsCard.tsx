import type { LoanStatus, ValidationStepType } from '@/types/strapi/componentTypes/loan';
import { Check, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Col, ColCenter, Row, RowBetween } from '../utils/Flex';
import { H2, P10, P12 } from '../utils/Texts';

interface ValidationStepsCardProps {
  steps?: ValidationStepType[] | undefined;
  loanTitle?: string;
  status?: LoanStatus;
}

const COLORS = [
  { bg: 'bg-success', border: 'border-success', stroke: 'hsl(151 62% 56%)' }, // green
  { bg: 'bg-yellow-500', border: 'border-yellow-500', stroke: 'hsl(45 93% 51%)' }, // orange
  { bg: 'bg-accent', border: 'border-accent', stroke: 'hsl(217 92% 65%)' }, // blue
];

export function ValidationStepsCard({
  steps,
  loanTitle,
  status,
}: ValidationStepsCardProps): React.JSX.Element {
  const t = useTranslations('common');
  if (!steps || steps.length === 0) {
    return (
      <Col className="gap-4 w-full">
        <H2 className="text-lg">{loanTitle || t('transactionTab.validationSteps')}</H2>
        <P12 className="text-muted-foreground">{t('validationStepsCard.noSteps')}</P12>
      </Col>
    );
  }

  return (
    <Col className="gap-3 w-full h-full">
      {/* Header */}
      <RowBetween>
        <P12>{status}</P12>
        <P12 className="text-muted-foreground font-semibold">{loanTitle}</P12>
      </RowBetween>

      {/* Main content: Donut + Legend */}
      <Row className="gap-2 items-start">
        {/* Donut Chart */}
        <div className="flex-shrink-0">
          <DonutChart steps={steps} />
        </div>

        {/* Legend */}
        <Col className="gap-3 flex-1">
          {steps.map((step, index) => (
            <ValidationCheckboxItem
              key={step.id}
              step={step}
              colorConfig={COLORS[index % COLORS.length]}
            />
          ))}
        </Col>
      </Row>

      {/* Next step CTA */}
      <ColCenter className="gap-1">
        <P10 className="text-foreground text-center">{t('validationStepsCard.nextStepCTA')}</P10>
        <Row className="items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-base text-muted-foreground">
            <Download className="w-3 h-3" />
          </span>
          <P10 className="text-muted-foreground underline">
            {t('validationStepsCard.downloadFile')}
          </P10>
        </Row>
      </ColCenter>
    </Col>
  );
}

interface DonutChartProps {
  steps: ValidationStepType[];
}

function DonutChart({ steps }: DonutChartProps): React.JSX.Element {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-28 h-28">
      <svg width="112" height="112" viewBox="0 0 112 112" className="transform -rotate-90">
        {/* Background circle */}
        <circle cx="56" cy="56" r="40" fill="none" stroke="hsl(220 20% 96%)" strokeWidth="15" />

        {/* Segments for each step */}
        {steps.map(
          (step, index) =>
            step.isCompleted && (
              <circle
                key={step.id}
                cx="56"
                cy="56"
                r={radius}
                fill="none"
                stroke={COLORS[index % COLORS.length].stroke}
                strokeWidth="15"
                strokeLinecap="butt"
                style={{
                  strokeDasharray: `${circumference / steps.length} ${circumference}`,
                  strokeDashoffset: -circumference * (index / steps.length),
                }}
              />
            ),
        )}
      </svg>
    </div>
  );
}

interface ValidationCheckboxItemProps {
  step: ValidationStepType;
  colorConfig: { bg: string; border: string };
}

function ValidationCheckboxItem({
  step,
  colorConfig,
}: ValidationCheckboxItemProps): React.JSX.Element {
  return (
    <Row className="gap-3 items-center">
      {/* Checkbox */}
      <div
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          step.isCompleted
            ? `${colorConfig.bg} ${colorConfig.border}`
            : 'border-muted-foreground bg-transparent'
        }`}
      >
        {step.isCompleted && (
          <Check className="w-3 h-3 text-white" strokeWidth={3} aria-hidden="true" />
        )}
      </div>

      {/* Label */}
      <P10 className={step.isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}>
        {step.label}
      </P10>
    </Row>
  );
}
