import { TotalPrice } from '@parkify/util/types'
import { CreateBookingInput } from 'src/models/bookings/graphql/dtos/create-booking.input'

export class CreateStripeDto {
  uid: string
  totalPriceObj: TotalPrice
  bookingData: CreateBookingInput
  customerInfo: {
    name: string
    email?: string
    address: {
      line1: string
      city: string
      state: string
      postal_code: string
      country: string
    }
  }
}
