'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import {
  BODY_SYSTEM_LABELS,
  MODE_TITLES,
  evidenceMeta,
  evidenceRecords,
  getInterpretation,
  type BodySystemTag,
  type EvidenceDetailEnvelope,
  type DrawerMode,
  type StudyDetail,
} from '@/data/evidence'
import { EASE_OUT } from '@/lib/motion'
import { useEvidenceFilter } from '@/hooks/useEvidenceFilter'
import ClinicalInterpretationSummary from './ClinicalInterpretationSummary'
import FeaturedStudies from './FeaturedStudies'
import FilterBar from './FilterBar'
import StudyCard from './StudyCard'
import TimelineView from './TimelineView'
import SystemGroupView from './SystemGroupView'
import ZeroState from './ZeroState'

type Props = {
  open: boolean
  mode: DrawerMode
  initialDomain?: BodySystemTag | null
  onClose: () => void
}

function getHeader(mode: DrawerMode, domain: BodySystemTag | null, count: number) {
  if (mode === 'filtered' && domain) {
    return `${BODY_SYSTEM_LABELS[domain]} — ${count} curated studies`
  }
  return `${MODE_TITLES[mode]} — ${count} curated studies`
}

export default function EvidenceDrawer({
  open,
  mode,
  initialDomain = null,
  onClose,
}: Props) {
  const [details, setDetails] = useState<Record<string, StudyDetail>>({})
  const [detailsLoaded, setDetailsLoaded] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastActiveElement = useRef<HTMLElement | null>(null)

  const {
    bodySystem,
    evidenceType,
    filteredRecords,
    paginatedRecords,
    page,
    totalPages,
    canPaginate,
    suggestedReset,
    setBodySystem,
    setEvidenceType,
    setPage,
    resetAll,
  } = useEvidenceFilter({
    mode,
    records: evidenceRecords,
    initialDomain,
  })

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const media = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [hydrated])

  useEffect(() => {
    if (!open || detailsLoaded) return

    let active = true
    import('@/data/evidence/studies-detail.json').then((module) => {
      if (!active) return
      const payload = module.default as EvidenceDetailEnvelope
      const nextDetails = Object.fromEntries(
        payload.records.map((record) => [record.id, record]),
      ) as Record<string, StudyDetail>
      setDetails(nextDetails)
      setDetailsLoaded(true)
    })

    return () => {
      active = false
    }
  }, [open, detailsLoaded])

  useEffect(() => {
    if (!open) return

    lastActiveElement.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )
      const elements = Array.from(focusable).filter(
        (element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'),
      )
      if (elements.length === 0) return

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      lastActiveElement.current?.focus()
    }
  }, [open, onClose])

  const interpretation = getInterpretation(
    mode === 'filtered' && initialDomain ? initialDomain : bodySystem === 'all' ? 'all' : bodySystem,
  )

  const featuredStudies = useMemo(() => {
    return filteredRecords
      .filter(
        (record) =>
          record.featured &&
          ['human-study', 'review'].includes(record.evidenceType) &&
          record.year > 2010,
      )
      .slice(0, 5)
  }, [filteredRecords])

  const groupedSystems = useMemo(() => {
    const domains = (['dermatology', 'mucosal', 'oxidative', 'immune', 'metabolic'] as BodySystemTag[])
    return domains.map((domainId) => ({
      domainId,
      interpretation: getInterpretation(domainId),
      studies: filteredRecords.filter((record) => record.bodySystemTags.includes(domainId)),
    }))
  }, [filteredRecords])

  if (!hydrated || !open) return null

  const visibleRecords =
    mode === 'timeline' || mode === 'systems' ? filteredRecords : paginatedRecords

  const panelMotion = isDesktop
    ? {
        initial: { opacity: 0, x: 28 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 28 },
        transition: { duration: 0.3, ease: EASE_OUT },
      }
    : {
        initial: { opacity: 0, y: 32 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 32 },
        transition: { duration: 0.3, ease: EASE_OUT },
      }

  return (
    <AnimatePresence>
      <motion.div
        key="evidence-overlay"
        className="fixed inset-0 z-[300] bg-deep-green/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        onClick={onClose}
      >
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Evidence library"
          className="fixed inset-x-0 bottom-0 h-[88vh] rounded-t-[1.75rem] border border-himalayan-green/12 bg-white md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[min(760px,92vw)] md:rounded-none md:border-l md:border-t-0"
          onClick={(event) => event.stopPropagation()}
          {...panelMotion}
          style={{ transformOrigin: 'bottom center' }}
        >
          <DrawerContent
            closeButtonRef={closeButtonRef}
            mode={mode}
            initialDomain={initialDomain}
            interpretation={interpretation}
            featuredStudies={featuredStudies}
            details={details}
            bodySystem={bodySystem}
            evidenceType={evidenceType}
            filteredRecords={filteredRecords}
            visibleRecords={visibleRecords}
            groupedSystems={groupedSystems}
            canPaginate={canPaginate}
            page={page}
            totalPages={totalPages}
            suggestedReset={suggestedReset}
            setBodySystem={setBodySystem}
            setEvidenceType={setEvidenceType}
            setPage={setPage}
            resetAll={resetAll}
            onClose={onClose}
            header={getHeader(mode, initialDomain, filteredRecords.length)}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

type DrawerContentProps = {
  closeButtonRef: RefObject<HTMLButtonElement | null>
  mode: DrawerMode
  initialDomain: BodySystemTag | null
  interpretation: ReturnType<typeof getInterpretation>
  featuredStudies: typeof evidenceRecords
  details: Record<string, StudyDetail>
  bodySystem: BodySystemTag | 'all'
  evidenceType: 'all' | 'human-study' | 'review' | 'mechanistic' | 'ingredient-level'
  filteredRecords: typeof evidenceRecords
  visibleRecords: typeof evidenceRecords
  groupedSystems: Array<{
    domainId: BodySystemTag
    interpretation: ReturnType<typeof getInterpretation>
    studies: typeof evidenceRecords
  }>
  canPaginate: boolean
  page: number
  totalPages: number
  suggestedReset: string | null
  setBodySystem: (value: BodySystemTag | 'all') => void
  setEvidenceType: (value: 'all' | 'human-study' | 'review' | 'mechanistic' | 'ingredient-level') => void
  setPage: (value: number) => void
  resetAll: () => void
  onClose: () => void
  header: string
}

function DrawerContent({
  closeButtonRef,
  mode,
  interpretation,
  featuredStudies,
  details,
  bodySystem,
  evidenceType,
  filteredRecords,
  visibleRecords,
  groupedSystems,
  canPaginate,
  page,
  totalPages,
  suggestedReset,
  setBodySystem,
  setEvidenceType,
  setPage,
  resetAll,
  onClose,
  header,
}: DrawerContentProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-himalayan-green/10 px-5 py-5 md:px-6 md:py-6">
        <div className="mx-auto flex max-w-3xl items-start justify-between gap-4 md:gap-6">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-himalayan-green">
              Evidence Library
            </p>
            <h2 className="mt-3 max-w-[18ch] font-display text-[1.8rem] leading-[1.02] tracking-[-0.015em] text-deep-green md:text-[2.1rem]">
              {header}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-full border border-himalayan-green/12 px-3.5 py-2 font-sans text-sm text-text-dark"
          >
            Close
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6 md:py-6">
        <div className="mx-auto max-w-3xl space-y-9 md:space-y-10">
          <ClinicalInterpretationSummary interpretation={interpretation} />

          {mode !== 'systems' ? (
            <FeaturedStudies studies={featuredStudies} details={details} />
          ) : null}

          {mode !== 'systems' ? (
            <FilterBar
              bodySystem={bodySystem}
              evidenceType={evidenceType}
              onBodySystemChange={setBodySystem}
              onEvidenceTypeChange={setEvidenceType}
            />
          ) : null}

          {mode === 'timeline' ? (
            filteredRecords.length > 0 ? (
              <TimelineView studies={filteredRecords} details={details} />
            ) : (
              <ZeroState suggestedReset={suggestedReset} onReset={resetAll} />
            )
          ) : mode === 'systems' ? (
            <SystemGroupView groupedStudies={groupedSystems} details={details} />
          ) : filteredRecords.length > 0 ? (
            <div className="space-y-4">
              {visibleRecords.map((study) => (
                <StudyCard key={study.id} study={study} detail={details[study.id]} />
              ))}

              {canPaginate ? (
                <div className="flex items-center justify-between gap-4 border-t border-himalayan-green/10 pt-5">
                  <button
                    type="button"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="rounded-full border border-himalayan-green/12 px-4 py-2 font-sans text-sm text-text-dark disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <p className="font-sans text-sm text-text-muted">
                    Page {page} of {totalPages}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="rounded-full border border-himalayan-green/12 px-4 py-2 font-sans text-sm text-text-dark disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <ZeroState suggestedReset={suggestedReset} onReset={resetAll} />
          )}

          <div className="border-t border-himalayan-green/10 pt-6">
            <div className="grid gap-2 font-sans text-sm leading-relaxed text-text-muted md:grid-cols-3 md:gap-5">
              <p>Evidence index last reviewed: {evidenceMeta._meta.lastReviewed}</p>
              <p>Curated by CEOVIA Clinical Research Team</p>
              <p>Sources indexed from PubMed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
