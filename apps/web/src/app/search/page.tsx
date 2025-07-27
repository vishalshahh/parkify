'use client'
import { SearchPage } from '@parkify/ui/src/components/templates/SearchPage'
import { FormProviderSearchGarage } from '@parkify/forms/src/searchGarages'

export default function Page() {
  return (
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  )
}
