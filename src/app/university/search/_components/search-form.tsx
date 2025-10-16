'use client'

import { useState } from 'react'
import Form from 'next/form'
import countries from '@utils/countries'

const DEFAULT_COUNTRY = 'Canada'

export default function SearchForm() {
  const [country, setCountry] = useState<string>(DEFAULT_COUNTRY)
  const [nameSearch, setNameSearch] = useState<string>('')

  const onCountryChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(evt.target.value)
  }

  const onNameSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(evt.target.value)
  }

  const clearFilters = () => {
    setCountry(DEFAULT_COUNTRY)
    setNameSearch('')
  }

  return (
    <div>
      <Form action="/university/search">
        <fieldset className="fieldset flex flex-col md:flex-row md:items-end rounded-box">
          <div>
            <label className="fieldset-label">Country</label>
            <select
              className="select select-sm sm:select-md"
              name="country"
              value={country}
              onChange={onCountryChange}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="fieldset-label">Name Search</label>
            <input
              className="input input-sm sm:input-md"
              name="nameSearch"
              value={nameSearch}
              onChange={onNameSearchChange}
            />
          </div>
          <div className="flex gap-2 mt-2 md:ml-4">
            <button className="btn btn-sm sm:btn-md" type="submit">
              Apply
            </button>
            <button className="btn btn-sm sm:btn-md" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
        </fieldset>
      </Form>
    </div>
  )
}
