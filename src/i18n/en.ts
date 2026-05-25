export const en = {
  nav: {
    services: "Services",
    about: "About",
    approach: "Approach",
    work: "Work",
    contact: "Contact",
    langSwitch: "ET",
    langSwitchLabel: "Eesti keel",
  },
  hero: {
    eyebrow: "Marketing strategist · Tallinn",
    primaryCta: "Email Alexander",
    secondaryCta: "How I work",
  },
  services: {
    heading: "What I help with",
    intro:
      "Three focused engagements. Each one starts with a single email and a 30-minute call to see if there's a fit.",
    ctaLabel: "Discuss this",
  },
  about: {
    heading: "About",
    metaLabel: "Based in Tallinn, working globally.",
  },
  approach: {
    heading: "How I work",
  },
  work: {
    heading: "Selected work",
    intro: "A sample of clients and the outcomes we measured.",
  },
  cta: {
    primary: "Email Alexander",
    or: "or",
    linkedIn: "Connect on LinkedIn",
    subject: "Project inquiry via alexandermaasik.com",
  },
  footer: {
    rights: "All rights reserved.",
    builtOn: "Site built on Yext Pages.",
  },
} as const;

export type Strings = typeof en;
