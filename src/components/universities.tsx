import { IUniversity } from '@/types'
import FavouriteButton from '@components/favourite-button'
import Link from 'next/link'

interface UniversitiesProps {
  universities: IUniversity[]
}

export default function Universities({ universities }: UniversitiesProps) {
  return !universities.length ? (
    <div className="text-sm sm:text-base">No Universities Found</div>
  ) : (
    <div className="h-72 sm:h-96 overflow-x-auto mb-2 sm:mb-4">
      <table className="table table-zebra table-pin-rows table-xs sm:table-sm md:table-md">
        <thead>
          <tr>
            <th>Favourite</th>
            <th>Name</th>
            <th>State/Province</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) => (
            <tr key={university.id}>
              <td>
                <FavouriteButton
                  universityId={university.id}
                  isFavourite={!!university.favourite}
                />
              </td>
              <td>{university.name}</td>
              <td>{university.stateProvince}</td>
              <td>
                {university.website && (
                  <Link className="link" href={university.website} target="_blank">
                    {university.website}
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
