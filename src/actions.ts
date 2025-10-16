'use server'

import prisma from '@lib/db'
import { revalidatePath } from 'next/cache'

export async function addFavourite(universityId: string) {
  try {
    await prisma.favourite.create({
      data: {
        university: {
          connect: {
            id: universityId,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath('/university')
}

export async function removeFavourite(universityId: string) {
  try {
    await prisma.favourite.delete({
      where: {
        universityId: universityId,
      },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath('/university')
}
