'use client'

import parseIntIfNotNaN from '@/utils/parseIntIfNotNaN'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PaginationControlsProps {
  totalCount: number
}

export default function PaginationControls({ totalCount }: PaginationControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const paramsArr = Array.from(searchParams.entries())
  const page = parseIntIfNotNaN(searchParams.get('page')) ?? 1
  const limit = parseIntIfNotNaN(searchParams.get('limit')) ?? 20
  const maxPages = Math.ceil(totalCount / limit)

  const getQueryStr = (newPage: number) => {
    const pageParams = new URLSearchParams(paramsArr)
    pageParams.set('page', String(Math.min(maxPages, Math.max(newPage, 1))))
    const search = pageParams.toString()
    return search ? `?${search}` : ''
  }

  const prevQueryStr = getQueryStr(page - 1)
  const nextQueryStr = getQueryStr(page + 1)

  return totalCount <= 0 ? null : (
    <div className="join flex justify-center">
      <button
        className="join-item btn btn-sm sm:btn-md"
        disabled={page <= 1}
        onClick={() => {
          router.push(`${pathname}${prevQueryStr}`)
        }}
      >
        «
      </button>
      <button className="join-item btn btn-sm sm:btn-md">
        Page {page} of {maxPages}
      </button>
      <button
        className="join-item btn btn-sm sm:btn-md"
        disabled={page >= maxPages}
        onClick={() => {
          router.push(`${pathname}${nextQueryStr}`)
        }}
      >
        »
      </button>
    </div>
  )
}
