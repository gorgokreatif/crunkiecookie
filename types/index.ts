export type Lang = 'de' | 'en';

export interface CookieLang {
  desc: string;
  tags: string[];
  mood?: string;
}

export interface Cookie {
  id: string;
  name: string;
  image: string;
  category: string[];
  price: string;
  vegan: boolean;
  de: CookieLang;
  en: CookieLang;
}

export type ContentDict = Record<string, string>;

export interface PageContent {
  de: ContentDict;
  en: ContentDict;
}

export interface SiteContent {
  home: PageContent;
  about: PageContent;
  cookies: PageContent;
  contact: PageContent;
  b2b: PageContent;
  nav: PageContent;
  footer: PageContent;
}
