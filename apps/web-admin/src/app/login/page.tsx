import { LoginForm } from '@parkify/ui/src/components/templates/LoginForm'
import { AuthLayout } from '@parkify/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Login'}>
      <LoginForm />
    </AuthLayout>
  )
}
