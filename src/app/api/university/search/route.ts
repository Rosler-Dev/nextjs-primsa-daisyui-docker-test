import { IQueryResponse, IUniversity } from '@/types'
import parseIntIfNotNaN from '@/utils/parseIntIfNotNaN'
import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const country = searchParams.get('country') ?? undefined
    const nameSearch = searchParams.get('nameSearch') ?? undefined
    const page = parseIntIfNotNaN(searchParams.get('page')) ?? 1
    const limit = parseIntIfNotNaN(searchParams.get('limit')) ?? 20
    const skip = (page - 1) * limit

    const query: Prisma.UniversityFindManyArgs = {
      where: {
        country: {
          equals: country,
        },
        name: {
          contains: nameSearch,
          mode: 'insensitive',
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

    const responseObj = {
      data,
      totalCount,
    } as IQueryResponse<IUniversity>

    return new Response(JSON.stringify(responseObj), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(`Error: ${error}`, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
