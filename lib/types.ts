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
  earn: {
    badge: string;
    title: string;
    subtitle: string;
    bullets: string[];
    cta: string;
    stats: Array<{ value: string; label: string }>;
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
    earn: string;
    earnLink: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
    sections: {
      introduction: {
        title: string;
        content: string;
      };
      dataCollection: {
        title: string;
        intro: string;
        items: string[];
      };
      dataUse: {
        title: string;
        intro: string;
        items: string[];
      };
      dataProtection: {
        title: string;
        content: string;
      };
      dataSharing: {
        title: string;
        content: string;
      };
      userRights: {
        title: string;
        intro: string;
        items: string[];
      };
      contact: {
        title: string;
        content: string;
      };
    };
  };
  terms: {
    title: string;
    lastUpdated: string;
    sections: {
      acceptance: {
        title: string;
        content: string;
      };
      services: {
        title: string;
        content: string;
      };
      userResponsibilities: {
        title: string;
        intro: string;
        items: string[];
      };
      intellectualProperty: {
        title: string;
        content: string;
      };
      limitation: {
        title: string;
        content: string;
      };
      termination: {
        title: string;
        content: string;
      };
      governing: {
        title: string;
        content: string;
      };
      contact: {
        title: string;
        content: string;
      };
    };
  };
}
