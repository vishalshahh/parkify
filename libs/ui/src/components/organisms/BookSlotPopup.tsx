'use client'
import { FormTypeBookSlot } from '@parkify/forms/src/bookSlot'
import { loadStripe } from '@stripe/stripe-js'

import {
  CreateBookingInput,
  SearchGaragesQuery,
} from '@parkify/network/src/gql/generated'
import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { Form } from '../atoms/Form'
import { Badge } from '../atoms/Badge'
import { AutoImageChanger } from './AutoImageChanger'
import { DateRangeBookingInfo } from '../molecules/DateRangeBookingInfo'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { Radio, RadioGroup } from '@headlessui/react'
import { IconTypes } from '../molecules/IconTypes'
import { FormError } from '../atoms/FormError'
import { HtmlInput } from '../atoms/HtmlInput'
import { toLocalISOString } from '@parkify/util/date'
import { useTotalPrice } from '@parkify/util/hooks/price'
import { CostTitleValue } from '../molecules/CostTitleValue'
import { Button } from '../atoms/Button'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { TotalPrice } from '@parkify/util/types'
import { ManageValets } from './ManageValets'
import { toast } from '../molecules/Toast'
import { CustomerInfoForm, CustomerInfoFormType } from './CustomerInfoForm'

export const BookSlotPopup = ({
  garage,
}: {
  garage: SearchGaragesQuery['searchGarages'][0]
}) => {
  const session = useSession()
  const uid = session.data?.user?.uid
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<FormTypeBookSlot>()

  const { startTime, endTime, phoneNumber, type, valet, vehicleNumber } =
    useWatch<FormTypeBookSlot>()

  const pricePerHour = garage.availableSlots.find(
    (slot) => slot.type === type,
  )?.pricePerHour

  const totalPriceObj = useTotalPrice({
    pricePerHour,
  })

  const totalPrice =
    totalPriceObj.parkingCharge +
    totalPriceObj.valetChargeDropoff +
    totalPriceObj.valetChargePickup

  const [booking, setBooking] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoFormType | null>(null)

  const handleBooking = async (data: FormTypeBookSlot) => {
    if (!uid) {
      alert('You are not logged in.')
      return
    }

    if (!customerInfo) {
      alert('Please fill in customer information.')
      return
    }

    const bookingData: CreateBookingInput = {
      phoneNumber: data.phoneNumber,
      customerId: uid,
      endTime: data.endTime,
      startTime: data.startTime,
      type: data.type,
      garageId: garage.id,
      vehicleNumber: data.vehicleNumber,
      totalPrice,
      pricePerHour,
      ...(data.valet?.pickupInfo && data.valet?.dropoffInfo
        ? {
            valetAssignment: {
              pickupLat: data.valet?.pickupInfo?.lat,
              pickupLng: data.valet?.pickupInfo?.lng,
              returnLat: data.valet?.dropoffInfo?.lat,
              returnLng: data.valet?.dropoffInfo?.lng,
            },
          }
        : null),
    }

    try {
      setBooking(true)
      // Create booking session with customer info
      const res = await createBookingSession(
        uid!,
        totalPriceObj,
        bookingData,
        customerInfo // Pass customer info
      )
    } catch (error) {
      console.error('Booking error:', error)
      toast('An error occurred while creating the booking session.')
    } finally {
      setBooking(false)
    }
  }

  return (
    <div className="flex gap-2 text-left border-t-2 border-white bg-white/50 backdrop-blur-sm">
      <Form onSubmit={handleSubmit(handleBooking)}>
        <div className="flex items-start gap-2">
          <div className="mb-2 text-lg font-bold">{garage.displayName}</div>
          {garage.verification?.verified ? (
            <Badge variant="green" size="sm">
              Verified
            </Badge>
          ) : (
            <Badge variant="gray" size="sm">
              Not verified
            </Badge>
          )}
        </div>
        <div className="mb-2 text-xl font-extralight">
          {garage.address?.address}
        </div>
        <AutoImageChanger
          images={garage.images || []}
          durationPerImage={10000}
          aspectRatio="aspect-video"
          noAutoChange
        />
        <DateRangeBookingInfo startTime={startTime} endTime={endTime} />

        <div className="flex flex-wrap gap-2 mt-2">
          <HtmlLabel title="Slot type" error={errors.type?.message}>
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <RadioGroup
                    value={value || ''}
                    onChange={onChange}
                    className="flex w-full gap-2"
                    defaultValue={''}
                  >
                    {garage.availableSlots.map((slot) => (
                      <div
                        key={slot.type}
                        className="flex flex-wrap items-center gap-2 bg-white"
                      >
                        <Radio key={slot.type} value={slot.type}>
                          {({ checked }) => (
                            <div
                              className={`cursor-default border-2 p-2 ${
                                checked
                                  ? 'border-primary-500 shadow-md'
                                  : 'border-gray-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {slot.type ? IconTypes[slot.type] : null}
                                <div>
                                  <span className="text-lg font-bold">
                                    ₹{slot.pricePerHour}
                                  </span>
                                  /hr
                                </div>
                              </div>

                              <div className="text-gray-600">
                                {slot.count} open
                              </div>
                            </div>
                          )}
                        </Radio>
                      </div>
                    ))}
                  </RadioGroup>
                )
              }}
            />
          </HtmlLabel>
        </div>
        {!type ? <FormError error="Set type" /> : null}

        <HtmlLabel title="Start time" error={errors.startTime?.message}>
          <HtmlInput
            type="datetime-local"
            min={toLocalISOString(new Date()).slice(0, 16)}
            {...register('startTime')}
          />
        </HtmlLabel>
        <HtmlLabel title="End time" error={errors.endTime?.message}>
          <HtmlInput
            min={toLocalISOString(new Date()).slice(0, 16)}
            type="datetime-local"
            {...register('endTime')}
          />
        </HtmlLabel>

        <HtmlLabel title="Vehicle number" error={errors.vehicleNumber?.message}>
          <HtmlInput placeholder="KA01AB1234" {...register('vehicleNumber')} />
        </HtmlLabel>
        <HtmlLabel title="Phone number" error={errors.phoneNumber?.message}>
          <HtmlInput placeholder="+910000000000" {...register('phoneNumber')} />
        </HtmlLabel>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-0 text-sm py-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">1</span>
            <span>Booking Details</span>
          </div>
          <div className="h-px bg-gray-300 flex-1 mx-2"></div>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${customerInfo ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}>2</span>
            <span>Payment Info</span>
          </div>
          <div className="h-px bg-gray-300 flex-1 mx-2"></div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs">3</span>
            <span>Pay</span>
          </div>
        </div>

        {/* Customer Information Form - Better positioned */}
        <CustomerInfoForm onValidCustomerInfo={setCustomerInfo}>
          <div />
        </CustomerInfoForm>

        <ManageValets garage={garage} />

        {/* Price Summary */}
        {totalPriceObj ? (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold mb-2">Price Summary</div>
            <CostTitleValue
              title="Parking"
              price={totalPriceObj.parkingCharge}
            />
            <CostTitleValue
              title="Valet Pickup"
              price={totalPriceObj.valetChargePickup}
            />
            <CostTitleValue
              title="Valet Dropoff"
              price={totalPriceObj.valetChargeDropoff}
            />
            <hr className="my-2" />
            <CostTitleValue title="Total" price={totalPrice} />
          </div>
        ) : null}

        {/* Enhanced Book Button */}
        <Button
          loading={booking}
          fullWidth
          type="submit"
          disabled={!customerInfo}
          className="mt-4"
        >
          {customerInfo ? (
            totalPrice ? `Proceed to Pay ₹${totalPrice}` : 'Proceed to Payment'
          ) : (
            'Complete Information Above'
          )}
        </Button>
        
        {!customerInfo && (
          <div className="text-xs text-center text-gray-600 mt-2">
            Please fill in your information above to continue to secure checkout
          </div>
        )}
      </Form>
    </div>
  )
}

// Single createBookingSession function (removed duplicate)
export const createBookingSession = async (
  uid: string,
  totalPriceObj: TotalPrice,
  bookingData: CreateBookingInput,
  customerInfo: CustomerInfoFormType,
) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPriceObj,
        uid,
        bookingData,
        customerInfo,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorData}`)
    }

    const checkoutSession = await response.json()

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    const stripe = await loadStripe(publishableKey || '')
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.sessionId,
    })

    return result
  } catch (error) {
    console.error('Error creating booking session:', error)
    throw error
  }
}
