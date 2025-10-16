import PaginationControls from '@components/pagination-controls'
import Stat from '@components/stat'
import { getFavouriteUniversities } from '@/queries'
import parseIntIfNotNaN from '@utils/parseIntIfNotNaN'
import Universities from '@components/universities'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const page = parseIntIfNotNaN(queryParams.page as string | undefined)
  const limit = parseIntIfNotNaN(queryParams.limit as string | undefined)
  const { data, totalCount } = await getFavouriteUniversities(page, limit)

  return (
    <div>
      <div className="stats stats-horizontal mt-2 mb-4 shadow">
        <Stat title="Total Favourites Count" value={totalCount} />
      </div>
      <Universities universities={data} />
      <PaginationControls totalCount={totalCount} />
    </div>
  )
}
