'use client'

import { useMemo, useState } from 'react'
import type { BodySystemTag, DrawerMode, EvidenceType, StudyMeta } from '@/data/evidence'

const PAGE_SIZE = 30

type Options = {
  mode: DrawerMode
  records: StudyMeta[]
  initialDomain?: BodySystemTag | null
}

export function useEvidenceFilter({ mode, records, initialDomain = null }: Options) {
  const [bodySystem, setBodySystem] = useState<BodySystemTag | 'all'>(
    mode === 'filtered' && initialDomain ? initialDomain : 'all',
  )
  const [evidenceType, setEvidenceType] = useState<EvidenceType | 'all'>('all')
  const [page, setPage] = useState(1)

  const filteredRecords = useMemo(() => {
    let next = records

    if (mode === 'filtered' && initialDomain) {
      next = next.filter((record) => record.bodySystemTags.includes(initialDomain))
    } else if (bodySystem !== 'all') {
      next = next.filter((record) => record.bodySystemTags.includes(bodySystem))
    }

    if (evidenceType !== 'all') {
      next = next.filter((record) => record.evidenceType === evidenceType)
    }

    return next
  }, [records, bodySystem, evidenceType, mode, initialDomain])

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE))

  const paginatedRecords = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredRecords.slice(start, start + PAGE_SIZE)
  }, [filteredRecords, page])

  const suggestedReset = useMemo(() => {
    if (bodySystem !== 'all' && evidenceType !== 'all') {
      return bodySystem
    }
    if (evidenceType !== 'all') return evidenceType
    if (bodySystem !== 'all') return bodySystem
    return null
  }, [bodySystem, evidenceType])

  const resetAll = () => {
    setBodySystem(mode === 'filtered' && initialDomain ? initialDomain : 'all')
    setEvidenceType('all')
    setPage(1)
  }

  const updateBodySystem = (value: BodySystemTag | 'all') => {
    setBodySystem(value)
    setPage(1)
  }

  const updateEvidenceType = (value: EvidenceType | 'all') => {
    setEvidenceType(value)
    setPage(1)
  }

  const canPaginate = filteredRecords.length > PAGE_SIZE

  return {
    bodySystem,
    evidenceType,
    filteredRecords,
    paginatedRecords,
    page,
    totalPages,
    canPaginate,
    suggestedReset,
    setBodySystem: updateBodySystem,
    setEvidenceType: updateEvidenceType,
    setPage,
    resetAll,
  }
}
