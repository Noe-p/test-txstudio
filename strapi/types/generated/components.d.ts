import type { Schema, Struct } from '@strapi/strapi';

export interface CtaLinkButton extends Struct.ComponentSchema {
  collectionName: 'components_cta_link_buttons';
  info: {
    displayName: 'link button';
    icon: 'link';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface HomepageAdvantage extends Struct.ComponentSchema {
  collectionName: 'components_homepage_advantages';
  info: {
    displayName: 'Advantage';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageHeader extends Struct.ComponentSchema {
  collectionName: 'components_homepage_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    headerImage: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    subTitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    upTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageService extends Struct.ComponentSchema {
  collectionName: 'components_homepage_services';
  info: {
    displayName: 'Service';
  };
  attributes: {
    button: Schema.Attribute.Component<'cta.link-button', false>;
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    nav: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LoanBorrowerInfo extends Struct.ComponentSchema {
  collectionName: 'components_loan_borrower_infos';
  info: {
    displayName: 'Borrower Info';
  };
  attributes: {
    borrowerId: Schema.Attribute.String;
    contractNumber: Schema.Attribute.String;
    currentLoanAmount: Schema.Attribute.Decimal;
    durationMonths: Schema.Attribute.Integer;
    monthlyPayment: Schema.Attribute.Decimal;
    requestedAmount: Schema.Attribute.Decimal;
  };
}

export interface LoanFinancialInfo extends Struct.ComponentSchema {
  collectionName: 'components_loan_financial_infos';
  info: {
    displayName: 'Financial Info';
  };
  attributes: {
    commission: Schema.Attribute.String;
    interestRate: Schema.Attribute.String;
    lastDueDate: Schema.Attribute.Date;
    requestDate: Schema.Attribute.Date;
    requestStatus: Schema.Attribute.Enumeration<['Valid\u00E9', 'En attente']> &
      Schema.Attribute.DefaultTo<'En attente'>;
    taeg: Schema.Attribute.Decimal;
  };
}

export interface LoanStateInfo extends Struct.ComponentSchema {
  collectionName: 'components_loan_state_infos';
  info: {
    displayName: 'State Info';
  };
  attributes: {
    currentAmount: Schema.Attribute.Decimal;
    statusGroup: Schema.Attribute.Enumeration<
      ['Pr\u00EAt valid\u00E9', 'En attente', 'Cl\u00F4tur\u00E9']
    >;
    subtitle: Schema.Attribute.String;
  };
}

export interface LoanTimeline extends Struct.ComponentSchema {
  collectionName: 'components_loan_timelines';
  info: {
    displayName: 'Timeline';
  };
  attributes: {
    expectedClosureDate: Schema.Attribute.Date;
  };
}

export interface LoanValidationStep extends Struct.ComponentSchema {
  collectionName: 'components_loan_validation_steps';
  info: {
    displayName: 'Validation Step';
  };
  attributes: {
    description: Schema.Attribute.String;
    isCompleted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    requirements: Schema.Attribute.Text;
  };
}

export interface TableEuribor extends Struct.ComponentSchema {
  collectionName: 'components_table_euribors';
  info: {
    displayName: 'euribor';
    icon: 'apps';
  };
  attributes: {
    change: Schema.Attribute.Decimal;
    marketPlace: Schema.Attribute.Decimal;
    marketRiskFreeDate: Schema.Attribute.Decimal;
    marketRiskFreePremium: Schema.Attribute.Decimal;
    tenor: Schema.Attribute.String;
    variation: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cta.link-button': CtaLinkButton;
      'homepage.advantage': HomepageAdvantage;
      'homepage.header': HomepageHeader;
      'homepage.service': HomepageService;
      'loan.borrower-info': LoanBorrowerInfo;
      'loan.financial-info': LoanFinancialInfo;
      'loan.state-info': LoanStateInfo;
      'loan.timeline': LoanTimeline;
      'loan.validation-step': LoanValidationStep;
      'table.euribor': TableEuribor;
    }
  }
}
