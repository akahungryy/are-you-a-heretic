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
      className={`w-full text-left p-4 md:p-5 rounded-xl min-h-[52px] transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
        ${
          isSelected
            ? 'border-2 border-gold bg-gold/8 shadow-md border-l-4 border-l-gold'
            : isOther
              ? 'border border-charcoal/10 bg-parchment/50 opacity-60'
              : 'border border-charcoal/15 hover:border-gold/60 hover:bg-gold/5'
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
