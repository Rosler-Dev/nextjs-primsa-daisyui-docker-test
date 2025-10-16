import SearchForm from './_components/search-form'
import Universities from '@components/universities'
import { getUniversities } from '@/queries'
import parseIntIfNotNaN from '@utils/parseIntIfNotNaN'
import PaginationControls from '@components/pagination-controls'
import Stat from '@components/stat'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const { country = 'Canada', nameSearch = '' } = queryParams
  const page = parseIntIfNotNaN(queryParams.page as string)
  const limit = parseIntIfNotNaN(queryParams.limit as string)
  const { data, totalCount, responseCode, responseTime } = await getUniversities(
    country as string,
    nameSearch as string,
    page,
    limit,
  )

  return (
    <div>
      <SearchForm />
      <div className="stats stats-horizontal mt-2 mb-4 shadow">
        <Stat title="Total Results Count" value={totalCount} />
        <Stat title="Response Code" value={responseCode} />
        <Stat title="Response Time" value={responseTime} />
      </div>
      <Universities universities={data} />
      <PaginationControls totalCount={totalCount} />
    </div>
  )
}
