import { motion, useReducedMotion } from 'framer-motion';
import type { QuizAnswer } from '../../data/types';
import { getCouncilsForAnswer } from '../../lib/scoring';
import { heresies } from '../../data/heresies';

// Static mapping: heresy ID → related article slug
const heresyArticleMap: Record<string, { slug: string; title: string }> = {
  arianism: { slug: 'what-is-arianism-simple', title: 'What Is Arianism? A Simple Explanation' },
  modalism: { slug: 'trinity-heresy-explained', title: 'Every Way to Be Wrong About the Trinity' },
  subordinationism: { slug: 'when-orthodox-was-heretical', title: 'The 20 Years When Orthodoxy Was Heretical' },
  homoianism: { slug: 'council-of-rimini', title: 'When 400 Bishops Were Bullied Into Heresy' },
  'nicene-trinitarianism': { slug: 'when-orthodox-was-heretical', title: 'The 20 Years When Orthodoxy Was Heretical' },
  universalism: { slug: 'is-universalism-heresy', title: 'Is Universalism a Heresy?' },
  adoptionism: { slug: 'what-did-early-christians-believe', title: 'What Did Early Christians Actually Believe?' },
  docetism: { slug: 'what-did-early-christians-believe', title: 'What Did Early Christians Actually Believe?' },
};

interface Props {
  answer?: QuizAnswer;
  option5Reveal?: { title: string; text: string };
  onNext: () => void;
  isLastQuestion?: boolean;
}

export default function RevealCard({ answer, option5Reveal, onNext, isLastQuestion }: Props) {
  const shouldReduceMotion = useReducedMotion();

  // Option 5 panoramic reveal
  if (option5Reveal) {
    return (
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-xl border-2 border-gold/40 bg-gold/5 p-6"
        role="alert"
        aria-live="polite"
      >
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold text-charcoal">
            The Full Picture
          </span>
        </div>

        <h3 className="text-xl font-bold mb-3 text-charcoal">
          {option5Reveal.title}
        </h3>

        <p className="text-charcoal/80 mb-5 leading-relaxed">
          {option5Reveal.text}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNext}
            className="px-6 py-3 bg-gold text-charcoal rounded-xl font-bold hover:bg-gold-light transition-colors cursor-pointer shadow-sm hover:shadow-md font-display"
          >
            {isLastQuestion ? 'See My Results' : 'Next Question'}
          </button>
        </div>
      </motion.div>
    );
  }

  // Standard answer reveal (Options 1–4)
  if (!answer) return null;

  const severityStyles = {
    condemned: 'border-crimson/40 bg-crimson/5',
    debated: 'border-amber-500/40 bg-amber-50',
  };

  const severityBadge = {
    condemned: 'bg-crimson text-white',
    debated: 'bg-amber-600 text-white',
  };

  const condemningCouncils = getCouncilsForAnswer(answer);
  const heresy = heresies.find((h) => h.id === answer.heresyTriggered);

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={`rounded-xl border-2 p-6 ${severityStyles[answer.severity]}`}
      role="alert"
      aria-live="polite"
    >
      {/* Heresy badge */}
      {heresy && (
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${severityBadge[answer.severity]}`}
          >
            {answer.severity === 'condemned' ? 'Condemned' : 'Debated'}
            {heresy.yearCondemned > 0 && answer.severity === 'condemned' && (
              <span className="opacity-75">({heresy.yearCondemned})</span>
            )}
          </span>
        </div>
      )}

      <h3
        className={`text-xl font-bold mb-3 ${answer.severity === 'condemned' ? 'text-crimson' : 'text-amber-800'}`}
      >
        {answer.revealTitle}
      </h3>

      <p className="text-charcoal/80 mb-5 leading-relaxed">
        {answer.revealText}
      </p>

      {condemningCouncils.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide mb-2">
            {answer.severity === 'condemned' ? 'Condemned by:' : 'Contested at:'}
          </p>
          <div
            className={`flex flex-wrap gap-1.5 ${condemningCouncils.length > 6 ? 'max-h-28 overflow-y-auto pr-1' : ''}`}
            {...(condemningCouncils.length > 6 ? { tabIndex: 0, role: 'region', 'aria-label': 'Condemning councils' } : {})}
          >
            {condemningCouncils.map((council) =>
              council ? (
                <span
                  key={council.id}
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    council.type === 'anti-nicene'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : council.type === 'ecumenical'
                        ? 'bg-crimson/10 text-crimson border border-crimson/20'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {council.name} ({council.year})
                  {council.coerced && (
                    <span
                      className="ml-1 text-rose-500"
                      title="Bishops were coerced by imperial pressure"
                    >
                      *
                    </span>
                  )}
                </span>
              ) : null
            )}
          </div>
          {condemningCouncils.some((c) => c?.coerced) && (
            <p className="text-xs text-charcoal/40 mt-1.5 italic">
              * Bishops coerced by imperial pressure
            </p>
          )}
        </div>
      )}

      {/* Action links */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gold text-charcoal rounded-xl font-bold hover:bg-gold-light transition-colors cursor-pointer shadow-sm hover:shadow-md font-display"
        >
          {isLastQuestion ? 'See My Results' : 'Next Question'}
        </button>

        {heresy && (
          <a
            href={`/explore/${heresy.slug}`}
            className="text-sm text-crimson hover:text-crimson-light underline underline-offset-2"
          >
            Learn more about {heresy.name}
          </a>
        )}

        {answer.heresyTriggered && heresyArticleMap[answer.heresyTriggered] && (
          <a
            href={`/articles/${heresyArticleMap[answer.heresyTriggered].slug}`}
            className="text-sm text-charcoal/50 hover:text-charcoal underline underline-offset-2"
          >
            Read: {heresyArticleMap[answer.heresyTriggered].title}
          </a>
        )}
      </div>
    </motion.div>
  );
}
