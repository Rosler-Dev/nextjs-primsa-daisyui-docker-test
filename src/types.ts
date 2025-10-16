export interface IUniversity {
  id: string
  name: string
  country: string
  stateProvince?: string
  website?: string
  favourite?: IFavourite
}

export interface IFavourite {
  universityId: string
  createdAt: Date
}

export interface IQueryResponse<T> {
  data: T[]
  totalCount: number
}
