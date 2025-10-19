export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  lang: string;
  status: string;
  readingTime: string;
  content: string;
}

export interface Translations {
  nav: {
    features: string;
    blog: string;
    tryDemo: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    studio: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
  };
  stats: {
    title: string;
    users: string;
    countries: string;
    growth: string;
    time: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    product: string;
    features: string;
    pricing: string;
    studio: string;
    company: string;
    about: string;
    blog: string;
    contact: string;
    legal: string;
    privacy: string;
    terms: string;
    rights: string;
  };
}
