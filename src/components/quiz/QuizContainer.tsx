import { useState, useEffect, useCallback } from 'react';
import { questions } from '../../data/questions';
import { calculateResults } from '../../lib/scoring';
import QuestionCard from './QuestionCard';
import RevealCard from './RevealCard';
import ProgressBar from './ProgressBar';
import AnimatedCounter from './AnimatedCounter';

type QuizState = 'answering' | 'revealing' | 'complete';

const STORAGE_KEY = 'quizState';
const OPTION5_ID = 'option5';

interface SavedState {
  currentIndex: number;
  answers: Record<number, string>;
}

export default function QuizContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<QuizState>('answering');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [heresyCount, setHeresyCount] = useState(0);

  // Restore state from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedState = JSON.parse(saved);
        if (parsed.currentIndex < questions.length) {
          setCurrentIndex(parsed.currentIndex);
          setAnswers(parsed.answers);
          // Count unique heresies from saved answers (skip option5)
          const uniqueHeresies = new Set<string>();
          for (const answerId of Object.values(parsed.answers)) {
            if (answerId === OPTION5_ID) continue;
            for (const q of questions) {
              const a = q.answers.find((ans) => ans.id === answerId);
              if (a) uniqueHeresies.add(a.heresyTriggered);
            }
          }
          setHeresyCount(uniqueHeresies.size);
        }
      }
    } catch {
      // Invalid stored state — start fresh
    }
  }, []);

  // Save state to sessionStorage on changes
  const saveState = useCallback(
    (index: number, ans: Record<number, string>) => {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ currentIndex: index, answers: ans })
        );
      } catch {
        // Storage full or unavailable
      }
    },
    []
  );

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-charcoal/60">Loading questions...</p>
      </div>
    );
  }

  const handleAnswer = (answerId: string) => {
    setSelectedAnswer(answerId);
    const newAnswers = { ...answers, [currentQuestion.id]: answerId };
    setAnswers(newAnswers);
    setState('revealing');

    // Update heresy count (skip option5)
    const uniqueHeresies = new Set<string>();
    for (const aid of Object.values(newAnswers)) {
      if (aid === OPTION5_ID) continue;
      for (const q of questions) {
        const a = q.answers.find((ans) => ans.id === aid);
        if (a) uniqueHeresies.add(a.heresyTriggered);
      }
    }
    setHeresyCount(uniqueHeresies.size);

    // Save progress
    saveState(currentIndex, newAnswers);
  };

  const handleOption5 = () => {
    setSelectedAnswer(OPTION5_ID);
    const newAnswers = { ...answers, [currentQuestion.id]: OPTION5_ID };
    setAnswers(newAnswers);
    setState('revealing');
    saveState(currentIndex, newAnswers);
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    const prevIndex = currentIndex - 1;
    const prevQuestion = questions[prevIndex];
    const prevAnswerId = answers[prevQuestion.id] ?? null;

    setCurrentIndex(prevIndex);
    setSelectedAnswer(prevAnswerId);
    setState(prevAnswerId ? 'revealing' : 'answering');
    saveState(prevIndex, answers);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeAnswer = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion.id];
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    setState('answering');

    // Recalculate heresy count
    const uniqueHeresies = new Set<string>();
    for (const aid of Object.values(newAnswers)) {
      if (aid === OPTION5_ID) continue;
      for (const q of questions) {
        const a = q.answers.find((ans) => ans.id === aid);
        if (a) uniqueHeresies.add(a.heresyTriggered);
      }
    }
    setHeresyCount(uniqueHeresies.size);
    saveState(currentIndex, newAnswers);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      const results = calculateResults({ ...answers });
      sessionStorage.setItem('quizResults', JSON.stringify(results));
      sessionStorage.removeItem(STORAGE_KEY);
      // Track quiz completion in GA4
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('quiz_complete', {
          heresy_count: results.heresies?.length ?? 0,
          top_heresy: results.heresies?.[0] ?? 'none',
        });
      }
      window.location.href = '/results';
      return;
    }
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setSelectedAnswer(null);
    setState('answering');
    saveState(nextIndex, answers);

    // Scroll to top of quiz area
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isOption5 = selectedAnswer === OPTION5_ID;
  const answer = selectedAnswer && !isOption5
    ? currentQuestion.answers.find((a) => a.id === selectedAnswer)
    : null;
  const isRevisiting = answers[currentQuestion.id] !== undefined && state === 'revealing';

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      {/* Back button + heresy counter */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {currentIndex > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm text-charcoal/50 hover:text-charcoal transition-colors cursor-pointer"
            >
              <span aria-hidden="true">&larr;</span> Back
            </button>
          )}
        </div>
        <div>
          {heresyCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-crimson/10 rounded-full text-sm">
              <span className="text-crimson font-bold">
                <AnimatedCounter target={heresyCount} />
              </span>
              <span className="text-crimson/70 text-xs">
                {heresyCount === 1 ? 'heresy' : 'heresies'} triggered
              </span>
            </div>
          )}
        </div>
      </div>

      {state === 'answering' && (
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          onOption5={handleOption5}
        />
      )}

      {state === 'revealing' && (
        <div>
          <QuestionCard
            question={currentQuestion}
            onAnswer={() => {}}
            onOption5={() => {}}
            selectedId={selectedAnswer}
            disabled
          />
          <div className="mt-6">
            {isOption5 ? (
              <RevealCard
                option5Reveal={currentQuestion.option5Reveal}
                onNext={handleNext}
                isLastQuestion={currentIndex + 1 >= questions.length}
              />
            ) : answer ? (
              <RevealCard
                answer={answer}
                onNext={handleNext}
                isLastQuestion={currentIndex + 1 >= questions.length}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
