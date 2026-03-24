import { motion } from 'framer-motion';
import type { QuizAnswer } from '../../data/types';

interface Props {
  answer: QuizAnswer;
  onClick: () => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  isOther?: boolean;
}

export default function AnswerOption({
  answer,
  onClick,
  isSelected,
  isDisabled,
  isOther,
}: Props) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? 'border-gold bg-gold/10 shadow-md'
            : isOther
              ? 'border-charcoal/10 bg-parchment/50 opacity-50'
              : 'border-charcoal/15 hover:border-crimson hover:bg-crimson/5'
        }
        ${isDisabled ? 'cursor-default' : ''}
      `}
      aria-pressed={isSelected}
    >
      <span className="text-base text-charcoal/90 leading-relaxed">
        {answer.text}
      </span>
    </motion.button>
  );
}
