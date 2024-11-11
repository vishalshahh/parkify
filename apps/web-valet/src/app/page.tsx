'use client'
import { IsLoggedIn } from '@parkify/ui/src/components/organisms/IsLoggedIn'
import { IsValet } from '@parkify/ui/src/components/organisms/IsValet'
import { ValetHome } from '@parkify/ui/src/components/templates/ValetHome'

export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetHome />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  )
}
