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
      'table.euribor': TableEuribor;
    }
  }
}
