import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { QuizResult } from '../../data/types';
import { heresies } from '../../data/heresies';
import { questions } from '../../data/questions';
import AnimatedCounter from './AnimatedCounter';
import ShareButton from './ShareButton';
import HereticTickReact from './HereticTickReact';

type TriageRating = 'essential' | 'important' | 'secondary' | 'unsure';

export default function HeresyProfileCard() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [triageOpen, setTriageOpen] = useState(false);
  const [triageRatings, setTriageRatings] = useState<Record<string, TriageRating>>({});
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

  const option5Questions = (result.option5Questions || [])
    .map((qId) => questions.find((q) => q.id === qId))
    .filter(Boolean);

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
            <strong>In that era, this belief was the heresy — and its holders, the heretics.</strong>
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

      {/* Option 5 questions — topics the user didn't commit on */}
      {option5Questions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-charcoal">
            Topics You Didn't Commit On
          </h2>
          <p className="text-sm text-charcoal/60">
            You chose "none of these quite fit" for {option5Questions.length === 1 ? 'this question' : 'these questions'}. Here's what the church fought about:
          </p>
          {option5Questions.map((q) =>
            q ? (
              <div
                key={q.id}
                className="block border border-gold/20 bg-gold/5 rounded-xl p-4"
              >
                <h3 className="font-bold text-charcoal mb-1">
                  {q.category}: {q.option5Reveal.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {q.option5Reveal.text.slice(0, 200)}...
                </p>
              </div>
            ) : null
          )}
        </div>
      )}

      {/* REFLECTION SECTION */}
      <motion.div
        {...fadeIn}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-charcoal text-parchment rounded-xl p-6 md:p-10 border border-gold/10"
      >
        <div className="max-w-lg mx-auto space-y-5 text-base leading-relaxed font-content">
          <p className="text-gold font-bold text-lg">
            Everyone who took this quiz got flagged by someone.
          </p>
          <p className="text-parchment/80">
            That's not a bug — it's the point. The labels "heretical" and
            "condemned" don't describe fixed truths handed down from heaven.
            They describe the{' '}
            <em>
              consensus of a particular community at a particular time and place
            </em>
            . What's orthodox in Constantinople in 381 is heretical in Geneva in
            1559. What's condemned at Orange in 529 is the default assumption in
            most churches today. If the line keeps moving, perhaps the line was
            never the point.
          </p>

          {/* Scripture anchors */}
          <div className="space-y-4 py-3">
            <blockquote className="border-l-2 border-gold/40 pl-4">
              <p className="text-parchment/80 italic">
                "I do not ask for these only, but also for those who will believe
                in me through their word, that they may all be one, just as you,
                Father, are in me, and I in you, that they also may be in us, so
                that the world may believe that you have sent me."
              </p>
              <cite className="text-gold/60 text-sm not-italic block mt-1">
                — John 17:20–21
              </cite>
            </blockquote>
            <blockquote className="border-l-2 border-gold/40 pl-4">
              <p className="text-parchment/80 italic">
                "Make every effort to keep the unity of the Spirit through the
                bond of peace. There is one body and one Spirit — just as you
                were called to the one hope that belongs to your call — one Lord,
                one faith, one baptism, one God and Father of all."
              </p>
              <cite className="text-gold/60 text-sm not-italic block mt-1">
                — Ephesians 4:3–6
              </cite>
            </blockquote>
            <blockquote className="border-l-2 border-gold/40 pl-4">
              <p className="text-parchment/80 italic">
                "Do nothing from selfish ambition or conceit, but in humility
                count others more significant than yourselves."
              </p>
              <cite className="text-gold/60 text-sm not-italic block mt-1">
                — Philippians 2:3
              </cite>
            </blockquote>
            <blockquote className="border-l-2 border-gold/40 pl-4">
              <p className="text-parchment/80 italic">
                "Bear with each other and forgive one another... And over all
                these virtues put on love, which binds them all together in
                perfect unity."
              </p>
              <cite className="text-gold/60 text-sm not-italic block mt-1">
                — Colossians 3:13–14
              </cite>
            </blockquote>
          </div>

          {/* The invitation */}
          <p className="text-gold/90 font-semibold">
            Which of your fellow Christians hold the views you were just
            "condemned" for?
          </p>
          <p className="text-parchment/70">
            Could you worship alongside them? Could you call them brother or
            sister? The people sitting next to you in church hold some of these
            same "heresies" — and they love Jesus just as faithfully as you do.
          </p>

          {/* Closing */}
          <p className="text-parchment/70 pt-2">
            If we profess to follow Jesus as our Lord, let us put aside our
            arguments, our arrogance, and our judgment. Let us seek truth with
            gentleness and humility, in love and unity, as fellow followers of
            Christ. The truth has nothing to fear from honest disagreement.
          </p>

          <a
            href="/articles/unity-in-christ"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors mt-2"
          >
            Read: Unity in Christ — Why Your Heresy Doesn't Define You →
          </a>
        </div>
      </motion.div>

      {/* THEOLOGICAL TRIAGE WIDGET */}
      <motion.div
        {...fadeIn}
        transition={{ delay: 1, duration: 0.5 }}
        className="space-y-4"
      >
        <button
          onClick={() => setTriageOpen(!triageOpen)}
          className="w-full text-left p-5 rounded-xl border border-gold/20 bg-gold/5 hover:bg-gold/10 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-charcoal font-display">
                Bonus: Where do your "heresies" actually fall?
              </p>
              <p className="text-sm text-charcoal/50 mt-1">
                Rate each of your condemned positions on the theological triage spectrum
              </p>
            </div>
            <span className="text-charcoal/30 text-xl">
              {triageOpen ? '−' : '+'}
            </span>
          </div>
        </button>

        {triageOpen && (
          <div className="space-y-4 p-5 rounded-xl border border-gold/20 bg-white">
            {triggeredHeresies.map((heresy) =>
              heresy ? (
                <div key={heresy.id} className="space-y-2">
                  <p className="font-semibold text-charcoal text-sm">
                    {heresy.name}
                    <span className="text-charcoal/40 font-normal ml-2">
                      — {heresy.shortDescription}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {([
                      { value: 'essential' as TriageRating, label: 'Essential', desc: 'Core to salvation' },
                      { value: 'important' as TriageRating, label: 'Important', desc: 'Significant but not salvific' },
                      { value: 'secondary' as TriageRating, label: 'Secondary', desc: 'Reasonable Christians disagree' },
                      { value: 'unsure' as TriageRating, label: "I'm not sure", desc: '' },
                    ]).map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          setTriageRatings((prev) => ({
                            ...prev,
                            [heresy.id]: option.value,
                          }))
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          triageRatings[heresy.id] === option.value
                            ? 'bg-gold text-charcoal shadow-sm'
                            : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'
                        }`}
                        title={option.desc}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null
            )}

            {/* Triage summary */}
            {Object.keys(triageRatings).length === triggeredHeresies.length &&
              triggeredHeresies.length > 0 && (
                <div className="mt-4 p-4 rounded-lg bg-gold/8 border border-gold/20">
                  {(() => {
                    const secondaryCount = Object.values(triageRatings).filter(
                      (r) => r === 'secondary' || r === 'unsure'
                    ).length;
                    const total = Object.keys(triageRatings).length;
                    return (
                      <>
                        <p className="text-sm text-charcoal/80 leading-relaxed">
                          You rated{' '}
                          <strong className="text-gold">
                            {secondaryCount} of {total}
                          </strong>{' '}
                          of your "condemned" positions as secondary
                          disagreements or uncertain.
                        </p>
                        {secondaryCount > total / 2 && (
                          <p className="text-sm text-charcoal/60 mt-2 italic">
                            If most of what got you "condemned" falls in the
                            "secondary" category — and it does — then maybe the
                            councils were arguing about things that aren't worth
                            dividing over. The truth has nothing to fear from
                            honest disagreement.
                          </p>
                        )}
                        <a
                          href="/articles/unity-in-christ"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-light transition-colors mt-3"
                        >
                          Read more about theological triage →
                        </a>
                      </>
                    );
                  })()}
                </div>
              )}
          </div>
        )}
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
