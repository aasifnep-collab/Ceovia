import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    id:    'omegas',
    label: 'Omegas',
    cards: [
      { name: 'Omega-3 (ALA)',          fn: 'Anti-inflammatory cascade modulation and neurological membrane fluidity.' },
      { name: 'Omega-6 (LA / GLA)',     fn: 'Structural cell membrane component; eicosanoid precursor for immune signaling.' },
      { name: 'Omega-7 (Palmitoleic)', fn: 'Direct membrane integration; mucosal regeneration; collagen synthesis activation.' },
      { name: 'Omega-9 (Oleic Acid)',   fn: 'Cardiovascular lipid profile support; skin barrier reinforcement.' },
    ],
  },
  {
    id:    'carotenoids',
    label: 'Carotenoids',
    cards: [
      { name: 'Beta-Carotene',       fn: 'Pro-vitamin A precursor; potent antioxidant; photoprotective.' },
      { name: 'Lycopene',            fn: 'Singlet oxygen quenching; endothelial cardiovascular protection.' },
      { name: 'Zeaxanthin',          fn: 'Macular pigment density; blue-light filtration; retinal defence.' },
      { name: 'Lutein',              fn: 'Macular and skin photoprotection; anti-inflammatory antioxidant.' },
      { name: 'Beta-Cryptoxanthin',  fn: 'Pro-vitamin A activity; bone metabolism; anti-inflammatory.' },
      { name: '30+ additional',      fn: 'Comprehensive carotenoid matrix — astaxanthin, phytoene, phytofluene, canthaxanthin, and more.' },
    ],
  },
  {
    id:    'vitamins',
    label: 'Vitamins',
    cards: [
      { name: 'Vitamin A',                fn: 'Epithelial integrity; immune function; vision; gene expression regulation.' },
      { name: 'Vitamin D',                fn: 'Calcium homeostasis; immune regulation; hormonal cascade modulation.' },
      { name: 'Vitamin E (Tocopherols)',   fn: 'Lipid peroxidation inhibition; membrane integrity; immune modulation.' },
      { name: 'Vitamin K1 + K2',          fn: 'Coagulation; osteocalcin activation; arterial calcification prevention.' },
      { name: 'Vitamin C (Ascorbic Acid)', fn: 'Collagen synthesis; antioxidant regeneration; immune activation.' },
      { name: 'B-Complex',               fn: 'Metabolic cofactors for energy production and cellular repair pathways.' },
    ],
  },
  {
    id:    'phytosterols',
    label: 'Phytosterols & Polyphenols',
    cards: [
      { name: 'Beta-Sitosterol',  fn: 'LDL cholesterol displacement; anti-inflammatory; androgenic balance.' },
      { name: 'Campesterol',      fn: 'Cardiovascular cholesterol modulation; anti-inflammatory support.' },
      { name: 'Quercetin',        fn: 'COX-2 inhibition; mast cell stabilisation; antiviral activity.' },
      { name: 'Isorhamnetin',     fn: 'Metabolic syndrome support; adipogenesis inhibition — rare outside Sea Buckthorn.' },
      { name: 'Kaempferol',       fn: 'Apoptosis modulation; neuroprotection; anti-inflammatory.' },
    ],
  },
];

export default function BioactiveMatrix() {
  const [activeId, setActiveId] = useState('omegas');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const activeTab = tabs.find(t => t.id === activeId);

  return (
    <section className="py-32 px-6 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-himalayan-green mb-5"
        >
          The Formula
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-[680px] mb-12"
        >
          <h2
            className="font-display font-medium text-text-dark leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            190+ Bioactives.
            <br />
            One Uncompromised Source.
          </h2>
          <p className="font-sans text-text-muted text-lg leading-relaxed">
            Every active ingredient in CEOVIA co-occurs naturally in Himalayan Sea Buckthorn.
            No isolates. No synthetic co-factors. Pure matrix integrity.
          </p>
        </motion.div>

        {/* Tab nav */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={[
                'font-sans text-sm font-medium px-5 py-2 rounded-pill border transition-all duration-200',
                tab.id === activeId
                  ? 'bg-himalayan-green text-white border-himalayan-green'
                  : 'bg-transparent text-text-muted border-neutral-300 hover:border-himalayan-green hover:text-himalayan-green',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activeTab?.cards.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="bg-clinical-white rounded-xl border border-neutral-200 px-6 py-5"
              >
                <div className="font-sans font-semibold text-[0.9375rem] text-text-dark mb-2">
                  {card.name}
                </div>
                <div className="font-sans text-sm text-text-muted leading-relaxed">
                  {card.fn}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
