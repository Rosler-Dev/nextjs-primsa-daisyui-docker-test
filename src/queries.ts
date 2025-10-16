import { IQueryResponse, IUniversity } from '@/types'
import prisma from '@lib/db'
import { Prisma } from '@prisma/client'

async function _timedQuery(query: () => Promise<Response>) {
  const startTime = process.hrtime()

  const response = await query()

  const elapsed = process.hrtime(startTime)
  const responseTime = (elapsed[0] * 1000 + elapsed[1] / 1000000).toFixed(0)

  return { response, responseTime }
}

export async function getUniversities(
  country: string,
  nameSearch: string,
  page: number | undefined = 1,
  limit: number | undefined = 20,
) {
  const { response, responseTime } = await _timedQuery(() =>
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/university/search?page=${page}&limit=${limit}&country=${country}&nameSearch=${nameSearch}`,
    ),
  )
  const data = await response.json()
  const responseCode = `${response.status} ${response.statusText}`

  return { data: data.data, totalCount: data.totalCount, responseCode, responseTime }
}

export async function getFavouriteUniversities(
  page: number | undefined = 1,
  limit: number | undefined = 20,
) {
  const skip = (page - 1) * limit

  const query: Prisma.UniversityFindManyArgs = {
    where: {
      favourite: {
        isNot: null,
      },
    },
    orderBy: {
      name: 'asc',
    },
    include: {
      favourite: true,
    },
    skip: skip,
    take: limit,
  }

  const [data, totalCount] = await prisma.$transaction([
    prisma.university.findMany(query),
    prisma.university.count({ where: query.where }),
  ])

  return {
    data,
    totalCount,
  } as IQueryResponse<IUniversity>
}
