import { motion, useReducedMotion } from 'framer-motion';
import type { QuizAnswer } from '../../data/types';
import { getCouncilsForAnswer } from '../../lib/scoring';
import { heresies } from '../../data/heresies';

interface Props {
  answer: QuizAnswer;
  onNext: () => void;
  isLastQuestion?: boolean;
}

export default function RevealCard({ answer, onNext, isLastQuestion }: Props) {
  const shouldReduceMotion = useReducedMotion();

  const severityStyles = {
    condemned: 'border-crimson/40 bg-crimson/5',
    suspicious: 'border-amber-500/40 bg-amber-50',
    'technically-orthodox-but': 'border-blue-500/40 bg-blue-50',
  };

  const severityBadge = {
    condemned: 'bg-crimson text-white',
    suspicious: 'bg-amber-600 text-white',
    'technically-orthodox-but': 'bg-blue-600 text-white',
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
            {heresy.name}
            {heresy.yearCondemned > 0 && (
              <span className="opacity-75">({heresy.yearCondemned})</span>
            )}
          </span>
        </div>
      )}

      <h3
        className="text-xl font-bold mb-3 text-crimson"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {answer.revealTitle}
      </h3>

      <p className="text-charcoal/80 mb-5 leading-relaxed">
        {answer.revealText}
      </p>

      {condemningCouncils.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide mb-2">
            Condemned by:
          </p>
          <div
            className={`flex flex-wrap gap-1.5 ${condemningCouncils.length > 6 ? 'max-h-28 overflow-y-auto pr-1' : ''}`}
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
          className="px-6 py-3 bg-gold text-charcoal rounded-lg font-bold hover:bg-gold-light transition-colors cursor-pointer shadow-sm"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
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
      </div>
    </motion.div>
  );
}
