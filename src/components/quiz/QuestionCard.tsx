import type { QuizQuestion } from '../../data/types';
import AnswerOption from './AnswerOption';

interface Props {
  question: QuizQuestion;
  onAnswer: (answerId: string) => void;
  selectedId?: string | null;
  disabled?: boolean;
}

export default function QuestionCard({
  question,
  onAnswer,
  selectedId,
  disabled,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold/15 text-gold-light uppercase tracking-wide">
          {question.category}
        </span>
      </div>
      <h2
        className="text-2xl md:text-3xl font-bold text-charcoal"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {question.question}
      </h2>
      <div className="space-y-3" role="group" aria-label="Answer options">
        {question.answers.map((answer) => (
          <AnswerOption
            key={answer.id}
            answer={answer}
            onClick={() => onAnswer(answer.id)}
            isSelected={selectedId === answer.id}
            isDisabled={disabled || false}
            isOther={!!selectedId && selectedId !== answer.id}
          />
        ))}
      </div>
    </div>
  );
}
