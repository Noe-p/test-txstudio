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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cta.link-button': CtaLinkButton;
    }
  }
}
