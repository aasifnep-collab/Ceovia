'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { partnerBenefits, partnerProgramme } from '@/data/clinicalInsight'
import { EASE_OUT } from '@/lib/motion'

export default function PartnerProgramme() {
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')

  const handleDossierRequest = () => {
    if (!email.trim()) return
    window.location.href = `mailto:info@ceovia.com?subject=${encodeURIComponent('Clinical Dossier Request')}&body=${encodeURIComponent(`Please send the CEOVIA Clinical Dossier to: ${email}`)}`
    setModalOpen(false)
  }

  return (
    <section id="partner" className="bg-clinical-white scroll-mt-32">
      <div className="section-wrapper py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="font-[family-name:var(--font-sans)] text-label-md uppercase tracking-[0.1em] text-himalayan-green">
            {partnerProgramme.label}
          </p>
          <h2 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-display-lg leading-tight text-deep-green">
            {partnerProgramme.title}
          </h2>
          <p className="mt-5 max-w-3xl font-[family-name:var(--font-sans)] text-body-lg text-text-muted">
            {partnerProgramme.subtext}
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="rounded-2xl border border-himalayan-green/12 bg-white p-8 shadow-[0_1px_0_rgba(45,106,79,0.03)]">
              <ul className="grid gap-4 md:grid-cols-2">
                {partnerBenefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 text-himalayan-green">•</span>
                    <span className="font-[family-name:var(--font-sans)] text-body-md text-text-dark">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="rounded-md bg-deep-green px-6 py-4 text-left font-[family-name:var(--font-sans)] text-sm font-medium text-white transition-colors duration-200 hover:bg-himalayan-green"
              >
                Download Clinical Dossier
              </button>

              <Link
                href="/contact"
                className="rounded-md border border-himalayan-green px-6 py-4 font-[family-name:var(--font-sans)] text-sm font-medium text-deep-green transition-colors duration-200 hover:bg-himalayan-green/10"
              >
                Apply for Partner Status
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center font-[family-name:var(--font-sans)] text-sm font-medium text-himalayan-green hover:text-deep-green"
              >
                Request Clinical Consultation →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-deep-green/40 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <p className="font-[family-name:var(--font-sans)] text-label-md uppercase tracking-[0.1em] text-himalayan-green">
                Clinical Dossier
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-display-md text-deep-green">
                Request the full reference file
              </h3>
              <p className="mt-4 font-[family-name:var(--font-sans)] text-body-md text-text-muted">
                {partnerProgramme.dossierPrompt}
              </p>
              <label htmlFor="dossier-email" className="mt-6 block font-[family-name:var(--font-sans)] text-label-sm uppercase tracking-[0.1em] text-himalayan-green">
                Email
              </label>
              <input
                id="dossier-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-himalayan-green/20 px-4 py-3 font-[family-name:var(--font-sans)] text-sm text-text-dark focus:border-himalayan-green focus:outline-none focus:ring-2 focus:ring-himalayan-green/20"
                placeholder="Professional email"
              />

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={handleDossierRequest}
                  className="rounded-md bg-deep-green px-5 py-3 font-[family-name:var(--font-sans)] text-sm font-medium text-white"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-md border border-himalayan-green/20 px-5 py-3 font-[family-name:var(--font-sans)] text-sm font-medium text-text-dark"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
