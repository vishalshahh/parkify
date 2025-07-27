'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { HtmlInput } from '../atoms/HtmlInput'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { useEffect } from 'react'

const customerInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(
      /^[a-zA-Z\s\.]+$/,
      'Name can only contain letters, spaces, and dots',
    ),
  email: z
    .string()
    .email('Valid email is required')
    .min(1, 'Email is required for payment processing'),
  address: z.object({
    line1: z
      .string()
      .min(5, 'Address must be at least 5 characters')
      .max(200, 'Address too long'),
    city: z
      .string()
      .min(2, 'City name is required')
      .regex(/^[a-zA-Z\s]+$/, 'City name can only contain letters and spaces'),
    state: z
      .string()
      .min(2, 'State name is required')
      .regex(/^[a-zA-Z\s]+$/, 'State name can only contain letters and spaces'),
    postal_code: z
      .string()
      .regex(/^[1-9][0-9]{5}$/, 'Enter valid 6-digit PIN code (e.g., 110001)'),
    country: z.string().default('IN'),
  }),
})

export type CustomerInfoFormType = z.infer<typeof customerInfoSchema>

export const CustomerInfoForm = ({
  onValidCustomerInfo,
  children,
}: {
  onValidCustomerInfo: (customerInfo: CustomerInfoFormType | null) => void
  children: React.ReactNode
}) => {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<CustomerInfoFormType>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      address: {
        country: 'IN',
      },
    },
    mode: 'onChange',
  })

  const currentData = watch()

  useEffect(() => {
    if (isValid) {
      onValidCustomerInfo(currentData)
    } else {
      onValidCustomerInfo(null)
    }
  }, [currentData, isValid, onValidCustomerInfo])

  return (
    <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
      <div className="flex items-center gap-2">
        <div className="text-lg font-semibold text-yellow-800">
          🇮🇳 Payment Information
        </div>
        <span className="text-xs bg-yellow-200 text-yellow-700 px-2 py-1 rounded">
          Required by Indian Law
        </span>
      </div>
      <div className="text-sm text-yellow-700">
        <strong>Indian Export Regulations:</strong> Complete customer
        information is mandatory for all transactions.
      </div>

      <div className="space-y-4">
        <HtmlLabel title="Full Name (as per ID)" error={errors.name?.message}>
          <HtmlInput
            placeholder="Enter your full legal name"
            {...register('name')}
          />
        </HtmlLabel>

        <HtmlLabel title="Email Address" error={errors.email?.message}>
          <HtmlInput
            type="email"
            placeholder="your@email.com"
            {...register('email')}
          />
        </HtmlLabel>

        <HtmlLabel
          title="Complete Address"
          error={errors.address?.line1?.message}
        >
          <HtmlInput
            placeholder="House/Flat No, Street Name, Area, Landmark"
            {...register('address.line1')}
          />
        </HtmlLabel>

        <div className="grid grid-cols-2 gap-4">
          <HtmlLabel title="City" error={errors.address?.city?.message}>
            <HtmlInput placeholder="Delhi" {...register('address.city')} />
          </HtmlLabel>

          <HtmlLabel title="State" error={errors.address?.state?.message}>
            <HtmlInput placeholder="New Delhi" {...register('address.state')} />
          </HtmlLabel>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <HtmlLabel
            title="PIN Code"
            error={errors.address?.postal_code?.message}
          >
            <HtmlInput
              placeholder="110001"
              maxLength={6}
              {...register('address.postal_code')}
              onInput={(e) => {
                const target = e.target as HTMLInputElement
                target.value = target.value.replace(/[^0-9]/g, '')
              }}
            />
          </HtmlLabel>

          <HtmlLabel title="Country">
            <HtmlInput value="India" disabled className="bg-gray-100" />
          </HtmlLabel>
        </div>
      </div>

      {children}
    </div>
  )
}
