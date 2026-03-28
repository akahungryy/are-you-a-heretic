import type { QuizQuestion } from '../../data/types';
import AnswerOption from './AnswerOption';

interface Props {
  question: QuizQuestion;
  onAnswer: (answerId: string) => void;
  onOption5: () => void;
  selectedId?: string | null;
  disabled?: boolean;
}

export default function QuestionCard({
  question,
  onAnswer,
  onOption5,
  selectedId,
  disabled,
}: Props) {
  const isOption5Selected = selectedId === 'option5';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold/15 text-gold-light uppercase tracking-wide">
          {question.category}
        </span>
      </div>
      <h2
        className="text-2xl md:text-3xl font-bold text-charcoal"
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

        {/* Option 5 */}
        <button
          onClick={onOption5}
          disabled={disabled || false}
          className={`w-full text-left p-4 md:p-5 rounded-xl min-h-[52px] transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
            ${
              isOption5Selected
                ? 'border-2 border-gold bg-gold/8 shadow-md border-l-4 border-l-gold'
                : selectedId
                  ? 'border border-charcoal/10 bg-parchment/50 opacity-60'
                  : 'border border-dashed border-charcoal/20 hover:border-gold/60 hover:bg-gold/5'
            }
            ${disabled ? 'cursor-default' : ''}
          `}
          aria-pressed={isOption5Selected}
        >
          <span className="text-base text-charcoal/70 leading-relaxed italic">
            None of these quite fit what I believe.
          </span>
        </button>
      </div>
    </div>
  );
}
