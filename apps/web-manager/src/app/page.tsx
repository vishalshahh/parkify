'use client'
import { IsLoggedIn } from '@parkify/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@parkify/ui/src/components/organisms/IsManager'
import { ListGarages } from '@parkify/ui/src/components/organisms/ListGarages'

export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>
        {(companyId) => <ListGarages companyId={companyId} />}
      </IsManager>
    </IsLoggedIn>
  )
}
