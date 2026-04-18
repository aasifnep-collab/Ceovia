// src/components/ui/TabGroup.jsx
// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA Tab Group — horizontal tab navigation with animated indicator
//
// Usage:
//   <TabGroup
//     tabs={[{ id: 'skin', label: 'Skin & Radiance', content: <Panel /> }]}
//   />
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TabGroup({ tabs = [], defaultTab, className = '' }) {
  const [activeId, setActiveId] = useState(defaultTab || tabs[0]?.id);

  const activeTab = tabs.find(t => t.id === activeId) || tabs[0];

  return (
    <div className={className}>
      {/* Tab bar */}
      <div className="relative flex gap-1 border-b border-neutral-200 overflow-x-auto scrollbar-none mb-8">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={[
                'relative flex-shrink-0 px-4 pb-3 pt-1 font-sans text-sm font-medium',
                'transition-colors duration-200 focus-visible:outline-none',
                isActive ? 'text-himalayan-green' : 'text-text-muted hover:text-text-dark',
              ].join(' ')}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-himalayan-green rounded-full"
                  transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }}
        >
          {activeTab?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
