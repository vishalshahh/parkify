import { ListCustomerBookings } from '@parkify/ui/src/components/templates/ListCustomerBookings'
import { IsLoggedIn } from '@parkify/ui/src/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <IsLoggedIn>
      <ListCustomerBookings />
    </IsLoggedIn>
  )
}
