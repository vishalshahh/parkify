import { RegisterForm } from '@parkify/ui/src/components/templates/RegisterForm'
import { AuthLayout } from '@parkify/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Register'}>
      <RegisterForm />
    </AuthLayout>
  )
}
