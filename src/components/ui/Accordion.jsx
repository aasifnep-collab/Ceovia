// src/components/ui/Accordion.jsx
// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA Accordion — expand/collapse content panels
// Animated with Framer Motion (AnimatePresence + height transition)
//
// Usage:
//   <Accordion items={[{ question: '...', answer: '...' }]} />
//
// Or with custom renderAnswer:
//   <Accordion items={[...]} renderAnswer={(item) => <CustomContent />} />
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function AccordionItem({ item, isOpen, onToggle, renderAnswer }) {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group focus-visible:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-sans font-medium text-[0.9375rem] text-text-dark group-hover:text-himalayan-green transition-colors duration-200">
          {item.question}
        </span>
        <span
          className={[
            'flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full border border-neutral-300',
            'transition-all duration-300',
            isOpen ? 'border-himalayan-green bg-himalayan-green text-white rotate-45' : 'text-text-muted',
          ].join(' ')}
          aria-hidden="true"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-9 text-text-muted text-[0.9375rem] leading-relaxed">
              {renderAnswer ? renderAnswer(item) : item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items = [], renderAnswer, allowMultiple = false, className = '' }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes(prev => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={['divide-y-0', className].join(' ')}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id || index}
          item={item}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggle(index)}
          renderAnswer={renderAnswer}
        />
      ))}
    </div>
  );
}
