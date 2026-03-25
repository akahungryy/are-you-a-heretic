import { useState, useEffect, useCallback } from 'react';
import { questions } from '../../data/questions';
import { calculateResults } from '../../lib/scoring';
import QuestionCard from './QuestionCard';
import RevealCard from './RevealCard';
import ProgressBar from './ProgressBar';
import AnimatedCounter from './AnimatedCounter';

type QuizState = 'answering' | 'revealing' | 'complete';

const STORAGE_KEY = 'quizState';

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
          // Count unique heresies from saved answers
          const uniqueHeresies = new Set<string>();
          for (const answerId of Object.values(parsed.answers)) {
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

    // Update heresy count
    const uniqueHeresies = new Set<string>();
    for (const aid of Object.values(newAnswers)) {
      for (const q of questions) {
        const a = q.answers.find((ans) => ans.id === aid);
        if (a) uniqueHeresies.add(a.heresyTriggered);
      }
    }
    setHeresyCount(uniqueHeresies.size);

    // Save progress
    saveState(currentIndex, newAnswers);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      const results = calculateResults({ ...answers });
      sessionStorage.setItem('quizResults', JSON.stringify(results));
      sessionStorage.removeItem(STORAGE_KEY);
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

  const answer = selectedAnswer
    ? currentQuestion.answers.find((a) => a.id === selectedAnswer)
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      {/* Running heresy counter */}
      {heresyCount > 0 && (
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-crimson/10 rounded-full text-sm">
            <span className="text-crimson font-bold">
              <AnimatedCounter target={heresyCount} />
            </span>
            <span className="text-crimson/70 text-xs">
              {heresyCount === 1 ? 'heresy' : 'heresies'} triggered
            </span>
          </div>
        </div>
      )}

      {state === 'answering' && (
        <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
      )}

      {state === 'revealing' && answer && (
        <div>
          <QuestionCard
            question={currentQuestion}
            onAnswer={() => {}}
            selectedId={selectedAnswer}
            disabled
          />
          <div className="mt-6">
            <RevealCard
              answer={answer}
              onNext={handleNext}
              isLastQuestion={currentIndex + 1 >= questions.length}
            />
          </div>
        </div>
      )}
    </div>
  );
}
