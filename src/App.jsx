// ─────────────────────────────────────────────────────────────────────────────
// CEOVIA — Root App Component
// src/App.jsx
//
// Single-page application shell.
// Renders 9 sections in narrative order — no state, no logic.
// Data lives in /data files; animations handled inside each section.
// ─────────────────────────────────────────────────────────────────────────────

import Hero                from './components/sections/Hero';
import CellularScience     from './components/sections/CellularScience';
import Omega7Moat          from './components/sections/Omega7Moat';
import BioactiveMatrix     from './components/sections/BioactiveMatrix';
import MultiSystemOutcomes from './components/sections/MultiSystemOutcomes';
import Protocol90Day       from './components/sections/Protocol90Day';
import TransformationJourney from './components/sections/TransformationJourney';
import ClinicalAuthority   from './components/sections/ClinicalAuthority';
import MasterDistributorCTA from './components/sections/MasterDistributorCTA';

export default function App() {
  return (
    <main>
      <Hero />
      <CellularScience />
      <Omega7Moat />
      <BioactiveMatrix />
      <MultiSystemOutcomes />
      <Protocol90Day />
      <TransformationJourney />
      <ClinicalAuthority />
      <MasterDistributorCTA />
    </main>
  );
}
