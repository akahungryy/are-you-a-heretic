export type Council = {
  id: string;
  name: string;
  year: number;
  yearEnd?: number;
  location: string;
  type: 'ecumenical' | 'regional' | 'denominational' | 'synod' | 'confession' | 'anti-nicene';
  description: string;
  slug: string;
  imperialBacking?: string;
  theologicalPosition?: string;
  coerced?: boolean;
};

export type Heresy = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  condemnedBy: string[];
  condemnedFigures: string[];
  modernHolders: string[];
  yearCondemned: number;
  plainLanguage: string;
  whyYouMightAgree: string;
  ntPerspective: string;
};

export type QuizQuestion = {
  id: number;
  category: string;
  question: string;
  tone: 'playful' | 'substantive' | 'provocative';
  answers: QuizAnswer[];
  option5Reveal: {
    title: string;
    text: string;
  };
};

export type QuizAnswer = {
  id: string;
  text: string;
  heresyTriggered: string;
  revealTitle: string;
  revealText: string;
  severity: 'condemned' | 'debated';
  councilIds?: string[];
  condemnedByCount?: number;
  unityNote?: string;
};

export type QuizResult = {
  answers: Record<number, string>;
  heresies: string[];
  option5Questions: number[];
  totalCouncilsAgainst: number;
  ecumenicalCouncilsAgainst: number;
  antiNiceneCouncilsAgainst: number;
  regionalCouncilsAgainst: number;
  confessionsAgainst: number;
  estimatedCondemnors: string;
};
