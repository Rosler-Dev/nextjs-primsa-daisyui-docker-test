'use client'

import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { addFavourite, removeFavourite } from '@/actions'

interface FavouriteButtonProps {
  universityId: string
  isFavourite: boolean
}

export default function FavouriteButton({ universityId, isFavourite }: FavouriteButtonProps) {
  const onClick = isFavourite ? removeFavourite : addFavourite
  const buttonClass = 'size-6 sm:size-7 text-red-500'

  return (
    <button className="btn btn-ghost" onClick={async () => await onClick(universityId)}>
      {isFavourite ? (
        <HeartSolidIcon className={buttonClass} />
      ) : (
        <HeartOutlineIcon className={buttonClass} />
      )}
    </button>
  )
}
