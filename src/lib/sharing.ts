import type { QuizResult } from '../data/types';
import { heresies } from '../data/heresies';

export function generateShareText(result: QuizResult): string {
  const heresyCount = result.heresies.length;
  const topHeresy = result.heresies[0]
    ? heresies.find((h) => h.id === result.heresies[0])
    : null;

  if (heresyCount === 0) {
    return "I took the 'Are You a Heretic?' quiz and somehow dodged every condemnation. That can't be right.";
  }

  const heresyName = topHeresy?.name ?? 'an ancient heresy';
  return `I took the 'Are You a Heretic?' quiz and got condemned by ${result.totalCouncilsAgainst} council(s). My primary heresy: ${heresyName}. ${result.estimatedCondemnors} would condemn me. 🔥`;
}

export function generateTwitterUrl(text: string, url: string): string {
  const params = new URLSearchParams({ text, url });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function generateShareData(result: QuizResult, url: string) {
  return {
    title: 'Are You a Heretic?',
    text: generateShareText(result),
    url,
  };
}
