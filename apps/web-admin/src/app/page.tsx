import { IsAdmin } from '@parkify/ui/src/components/organisms/IsAdmin'
import { AdminHome } from '@parkify/ui/src/components/templates/AdminHome'

export default function Home() {
  return (
    <main>
      <IsAdmin>
        <AdminHome />
      </IsAdmin>
    </main>
  )
}
