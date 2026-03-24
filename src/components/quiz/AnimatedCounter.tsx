import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface Props {
  target: number;
}

export default function AnimatedCounter({ target }: Props) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration: 1.5,
      ease: 'easeOut',
    });

    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [target, count, rounded]);

  return (
    <motion.div
      className="text-3xl font-bold text-[#1a1a2e]"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {displayValue}
    </motion.div>
  );
}
