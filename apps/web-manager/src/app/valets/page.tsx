import { ManageValets } from '@parkify/ui/src/components/templates/ManageValets'
import { IsLoggedIn } from '@parkify/ui/src/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <IsLoggedIn>
      <ManageValets />
    </IsLoggedIn>
  )
}
