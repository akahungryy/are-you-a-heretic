import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { QuizResult } from '../../data/types';
import { heresies } from '../../data/heresies';
import AnimatedCounter from './AnimatedCounter';
import ShareButton from './ShareButton';
import HereticTickReact from './HereticTickReact';

export default function HeresyProfileCard() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const stored = sessionStorage.getItem('quizResults');
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-charcoal/60 mb-4">No results found.</p>
        <a
          href="/quiz"
          className="inline-block px-6 py-3 bg-gold text-charcoal font-bold rounded-xl hover:bg-gold-light transition-colors shadow-sm hover:shadow-md font-display"
        >
          Take the Quiz
        </a>
      </div>
    );
  }

  const triggeredHeresies = result.heresies
    .map((id) => heresies.find((h) => h.id === id))
    .filter(Boolean);

  const hasNiceneCondemnation = result.heresies.includes(
    'nicene-trinitarianism'
  );
  const hasSubordinationism = result.heresies.includes('subordinationism');

  const fadeIn = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-4 py-8 space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-semibold text-crimson uppercase tracking-widest mb-3">
          The Councils Have Spoken
        </p>
        <h1
          className="text-3xl md:text-4xl font-black text-charcoal mb-2"
        >
          Your Heresy Profile<HereticTickReact />
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div className="bg-crimson/5 border border-crimson/10 rounded-xl p-4 md:p-5">
          <AnimatedCounter target={result.totalCouncilsAgainst} />
          <p className="text-xs text-charcoal/60 mt-1">
            Councils That Disagree
          </p>
        </div>
        <div className="bg-crimson/5 border border-crimson/10 rounded-xl p-4 md:p-5">
          <AnimatedCounter target={result.ecumenicalCouncilsAgainst} />
          <p className="text-xs text-charcoal/60 mt-1">Ecumenical Councils</p>
        </div>
        <div className="bg-rose-50 border border-rose-200/50 rounded-xl p-4 md:p-5">
          <AnimatedCounter target={result.antiNiceneCouncilsAgainst} />
          <p className="text-xs text-charcoal/60 mt-1">
            Anti-Nicene Councils (341–360)
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 md:p-5">
          <AnimatedCounter target={result.heresies.length} />
          <p className="text-xs text-charcoal/60 mt-1">Heresies Triggered</p>
        </div>
      </div>

      {/* Condemnors estimate */}
      <div className="bg-charcoal text-parchment rounded-xl p-5 text-center">
        <div
          className="text-xl font-bold text-gold font-display"
        >
          {result.estimatedCondemnors}
        </div>
        <p className="text-sm text-parchment/60 mt-1">
          would consider you a heretic
        </p>
      </div>

      {/* Anti-Nicene commentary */}
      {hasNiceneCondemnation && (
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-rose-50 border border-rose-200 rounded-xl p-5"
        >
          <p
            className="text-sm font-bold text-rose-900 mb-2 font-display"
          >
            A note about your Trinitarian beliefs:
          </p>
          <p className="text-sm text-rose-800 leading-relaxed">
            Your Trinitarian beliefs are now considered the standard position —
            but{' '}
            <strong>
              11 councils between 341–360 AD condemned them as heretical
            </strong>
            . For twenty years, the official Christianity of the Roman Empire
            held that the Son is merely "like" the Father, and{' '}
            <em>homoousios</em> was the heresy. Athanasius was exiled five
            times. Pope Liberius was exiled under imperial pressure. Jerome wrote: "The
            whole world groaned and was astonished to find itself Arian."{' '}
            <strong>In that era, you would have been the heretic.</strong>
          </p>
        </motion.div>
      )}

      {hasSubordinationism && (
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-5"
        >
          <p
            className="text-sm font-bold text-amber-900 mb-2 font-display"
          >
            A note about your subordinationist views:
          </p>
          <p className="text-sm text-amber-800 leading-relaxed">
            Your view of the Trinity was the{' '}
            <strong>
              official position of the Roman Empire from 360–380 AD
            </strong>
            . Emperors backed it, bishops enforced it, and the majority of
            churches professed it. Then Constantinople (381) happened, the
            Cappadocian Fathers won the argument, and{' '}
            <strong>the same view was reclassified as heresy</strong>. In 360, you were
            mainstream. By 382, you were on the wrong side of the line.
          </p>
        </motion.div>
      )}

      {/* Council breakdown */}
      {result.totalCouncilsAgainst > 0 && (
        <div className="text-sm text-charcoal/50 text-center">
          <p>
            Breakdown: {result.ecumenicalCouncilsAgainst} ecumenical council
            {result.ecumenicalCouncilsAgainst !== 1 ? 's' : ''}
            {result.antiNiceneCouncilsAgainst > 0 && (
              <>
                , {result.antiNiceneCouncilsAgainst} anti-Nicene council
                {result.antiNiceneCouncilsAgainst !== 1 ? 's' : ''} (341–360 AD)
              </>
            )}
            {result.regionalCouncilsAgainst > 0 && (
              <>
                , {result.regionalCouncilsAgainst} regional council
                {result.regionalCouncilsAgainst !== 1 ? 's' : ''}
              </>
            )}
            {result.confessionsAgainst > 0 && (
              <>
                , {result.confessionsAgainst} confession
                {result.confessionsAgainst !== 1 ? 's' : ''}/synod
                {result.confessionsAgainst !== 1 ? 's' : ''}
              </>
            )}
          </p>
        </div>
      )}

      {/* Heresies list */}
      <div className="space-y-4">
        <h2
          className="text-2xl font-bold text-charcoal"
        >
          Your Heresies
        </h2>
        {triggeredHeresies.map((heresy) =>
          heresy ? (
            <a
              key={heresy.id}
              href={`/explore/${heresy.slug}`}
              className="block border border-charcoal/10 rounded-xl p-4 hover:border-crimson/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-lg text-charcoal group-hover:text-crimson transition-colors">
                    {heresy.name}
                  </h3>
                  <p className="text-charcoal/60 text-sm mt-1">
                    {heresy.shortDescription}
                  </p>
                </div>
                <span className="text-crimson/50 group-hover:text-crimson transition-colors text-sm shrink-0">
                  Learn more →
                </span>
              </div>
            </a>
          ) : null
        )}
      </div>

      {/* THE PAYOFF MESSAGE */}
      <motion.div
        {...fadeIn}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-charcoal text-parchment rounded-xl p-6 md:p-10 border border-gold/10"
      >
        <div
          className="max-w-lg mx-auto space-y-4 text-base leading-relaxed font-content"
        >
          <p className="text-gold font-bold text-lg">
            Everyone who took this quiz got flagged by someone.
          </p>
          <p className="text-parchment/80">
            That's not a bug — it's the point.
          </p>
          <p className="text-parchment/70">
            Every answer on every question has been officially condemned as
            heretical by some council, confession, synod, or authoritative body
            in Christian history. There is no combination of answers that escapes
            scrutiny entirely.
          </p>
          <p className="text-parchment/70">
            The words "heretical" and "orthodox" don't describe fixed truths
            handed down from heaven. They describe the{' '}
            <em>
              consensus of a particular community at a particular time and place
            </em>
            . What's the accepted position in Constantinople in 381 AD is
            heretical in Geneva in 1559. What's heretical in Orange in 529 is
            the default assumption in most churches today.
          </p>
          <p className="text-gold/90 font-semibold">
            The truth has nothing to fear.
          </p>
          <p className="text-parchment/70">
            If these labels shift with the centuries, maybe they were never the
            point. The gospel invites us into a relationship with God — not into
            a system of correct propositions. Doctrines are attempts to describe
            something real, but they are the map, not the territory. We shouldn't
            mistake the means for the end, or hold our version of truth so tightly
            that we lose sight of the truth-maker himself.
          </p>
          <p className="text-parchment/70">
            What the New Testament authors actually cared about most wasn't getting
            the metaphysics exactly right — it was this:
          </p>
          <ul className="text-parchment/70 space-y-2 list-none">
            <li>
              <span className="text-gold mr-2">—</span>
              <strong className="text-gold/80">Love</strong> — the greatest of
              these (1 Cor 13:13)
            </li>
            <li>
              <span className="text-gold mr-2">—</span>
              <strong className="text-gold/80">Justice</strong> — for the
              vulnerable, the oppressed, the forgotten (James 1:27, Matt
              25:31-46)
            </li>
            <li>
              <span className="text-gold mr-2">—</span>
              <strong className="text-gold/80">Unity</strong> — not uniformity
              of doctrine, but unity of purpose and love (John 17:21)
            </li>
            <li>
              <span className="text-gold mr-2">—</span>
              <strong className="text-gold/80">Humility</strong> — including
              intellectual humility about our own certainty (Phil 2:3)
            </li>
            <li>
              <span className="text-gold mr-2">—</span>
              <strong className="text-gold/80">Relationship</strong> — knowing
              God, not just knowing about God (John 17:3)
            </li>
          </ul>
          <p className="text-parchment/50 text-sm italic pt-2">
            The NT authors never used the word "orthodox." They never defined{' '}
            <em>homoousios</em>. They never voted on whether Christ had one will
            or two. They told stories, wrote letters, sang hymns, and urged their
            communities to love each other across the deepest divisions of their
            world. The point of the gospel was always to know God — everything
            else is conversation along the way.
          </p>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <ShareButton result={result} />
        <a
          href="/quiz"
          onClick={() => {
            sessionStorage.removeItem('quizResults');
            sessionStorage.removeItem('quizState');
          }}
          className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-xl font-semibold hover:border-gold hover:text-gold transition-colors"
        >
          Retake Quiz
        </a>
      </div>
    </motion.div>
  );
}
