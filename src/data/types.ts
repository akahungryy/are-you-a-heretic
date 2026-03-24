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
};

export type QuizAnswer = {
  id: string;
  text: string;
  heresyTriggered: string;
  revealTitle: string;
  revealText: string;
  severity: 'condemned' | 'suspicious' | 'technically-orthodox-but';
  councilIds?: string[];
  condemnedByCount?: number;
};

export type QuizResult = {
  answers: Record<number, string>;
  heresies: string[];
  totalCouncilsAgainst: number;
  ecumenicalCouncilsAgainst: number;
  antiNiceneCouncilsAgainst: number;
  regionalCouncilsAgainst: number;
  confessionsAgainst: number;
  estimatedCondemnors: string;
};
