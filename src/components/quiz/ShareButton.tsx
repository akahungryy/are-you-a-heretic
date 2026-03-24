import { useState } from 'react';
import type { QuizResult } from '../../data/types';
import { generateShareText, generateTwitterUrl } from '../../lib/sharing';

interface Props {
  result: QuizResult;
}

export default function ShareButton({ result }: Props) {
  const [copied, setCopied] = useState(false);
  const shareText = generateShareText(result);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Are You a Heretic?',
          text: shareText,
          url: window.location.origin,
        });
      } catch {
        // User cancelled
      }
    } else {
      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(
          `${shareText} ${window.location.origin}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback to Twitter
        const twitterUrl = generateTwitterUrl(shareText, window.location.origin);
        window.open(twitterUrl, '_blank');
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-6 py-3 bg-crimson text-parchment rounded-lg font-bold hover:bg-crimson-light transition-colors cursor-pointer shadow-sm"
    >
      {copied ? 'Copied!' : 'Share Your Condemnation'}
    </button>
  );
}
