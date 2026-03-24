import type { QuizResult, QuizAnswer } from '../data/types';
import { questions } from '../data/questions';
import { heresies } from '../data/heresies';
import { councils } from '../data/councils';

export function calculateResults(answers: Record<number, string>): QuizResult {
  const triggeredHeresies = new Set<string>();
  const triggeredCouncils = new Set<string>();

  for (const [questionId, answerId] of Object.entries(answers)) {
    const question = questions.find((q) => q.id === Number(questionId));
    if (!question) continue;

    const answer = question.answers.find((a) => a.id === answerId);
    if (!answer) continue;

    triggeredHeresies.add(answer.heresyTriggered);

    if (answer.councilIds) {
      for (const cId of answer.councilIds) {
        triggeredCouncils.add(cId);
      }
    }
  }

  const heresyList = Array.from(triggeredHeresies);
  const allCouncilIds = Array.from(triggeredCouncils);

  const ecumenicalCouncils = allCouncilIds.filter((cId) => {
    const council = councils.find((c) => c.id === cId);
    return council?.type === 'ecumenical';
  });

  const antiNiceneCouncils = allCouncilIds.filter((cId) => {
    const council = councils.find((c) => c.id === cId);
    return council?.type === 'anti-nicene';
  });

  const regionalCouncils = allCouncilIds.filter((cId) => {
    const council = councils.find((c) => c.id === cId);
    return council?.type === 'regional';
  });

  const confessions = allCouncilIds.filter((cId) => {
    const council = councils.find((c) => c.id === cId);
    return council?.type === 'confession' || council?.type === 'synod' || council?.type === 'denominational';
  });

  return {
    answers,
    heresies: heresyList,
    totalCouncilsAgainst: allCouncilIds.length,
    ecumenicalCouncilsAgainst: ecumenicalCouncils.length,
    antiNiceneCouncilsAgainst: antiNiceneCouncils.length,
    regionalCouncilsAgainst: regionalCouncils.length,
    confessionsAgainst: confessions.length,
    estimatedCondemnors: estimateCondemnors(heresyList),
  };
}

function estimateCondemnors(heresyIds: string[]): string {
  const hasTrinitarianHeresy = heresyIds.some((id) =>
    ['arianism', 'modalism', 'adoptionism', 'subordinationism', 'homoianism', 'anomoeanism'].includes(id)
  );
  const hasNiceneCondemnation = heresyIds.includes('nicene-trinitarianism');
  const hasChristologicalHeresy = heresyIds.some((id) =>
    ['nestorianism', 'docetism', 'eutychianism', 'monothelitism'].includes(id)
  );

  if (hasTrinitarianHeresy && hasChristologicalHeresy) {
    return '~2.4 billion Christians';
  } else if (hasTrinitarianHeresy) {
    return '~2.2 billion Christians';
  } else if (hasNiceneCondemnation) {
    // The anti-Nicene councils no longer exist as institutions,
    // but the Nicene position is condemned by modern Biblical Unitarians, JWs, etc.
    return '~2.4 billion Christians (today) — but the 4th-century majority would have agreed with them';
  } else if (hasChristologicalHeresy) {
    return '~1.8 billion Christians';
  }
  return '~1 billion Christians';
}

export function getAnswerForQuestion(
  questionId: number,
  answerId: string
): QuizAnswer | undefined {
  const question = questions.find((q) => q.id === questionId);
  return question?.answers.find((a) => a.id === answerId);
}

export function getCouncilsForAnswer(answer: QuizAnswer) {
  if (!answer.councilIds) return [];
  return answer.councilIds
    .map((cId) => councils.find((c) => c.id === cId))
    .filter(Boolean);
}
