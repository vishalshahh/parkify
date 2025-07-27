import Stripe from 'stripe'
import { Injectable, BadRequestException } from '@nestjs/common'
import { CreateStripeDto } from './dto/create-stripe-session.dto'
import { toTitleCase } from 'src/common/util'

@Injectable()
export default class StripeService {
  public stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    })
  }

  async createStripeSession({
    totalPriceObj,
    uid,
    bookingData,
    customerInfo,
  }: CreateStripeDto) {
    try {
      // Validate customer info for Indian compliance
      if (!customerInfo || !customerInfo.name || !customerInfo.address) {
        throw new BadRequestException('Customer name and address are required for Indian export compliance')
      }

      // Ensure all required address fields are present
      const { address } = customerInfo
      if (!address.line1 || !address.city || !address.state || !address.postal_code) {
        throw new BadRequestException('Complete address (line1, city, state, postal_code) is required for Indian compliance')
      }

      // Create Stripe customer with FULL address for Indian compliance
      const customer = await this.stripe.customers.create({
        name: customerInfo.name.trim(),
        email: customerInfo.email || undefined,
        phone: bookingData.phoneNumber || undefined,
        address: {
          line1: address.line1.trim(),
          line2: null,
          city: address.city.trim(),
          state: address.state.trim(),
          postal_code: address.postal_code.trim(),
          country: 'IN',
        },
        metadata: {
          userId: uid,
          vehicleNumber: bookingData.vehicleNumber,
          bookingType: 'parking',
        },
      })

      // Create session with correct Stripe API properties
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: customer.id, // REQUIRED: Link to customer with address
        line_items: Object.entries(totalPriceObj)
          .filter(([, price]) => price > 0)
          .map(([name, price]) => ({
            quantity: 1,
            price_data: {
              product_data: {
                name: toTitleCase(name),
                description: `Parking booking for ${bookingData.vehicleNumber}`,
              },
              currency: 'inr',
              unit_amount: Math.round(price * 100),
            },
          })),
        mode: 'payment',
        
        // CRITICAL for Indian compliance - must collect billing address
        billing_address_collection: 'required',
        
        // Collect phone number as additional verification
        phone_number_collection: {
          enabled: true,
        },
        
        // Pre-fill with our collected information (correct property)
        customer_update: {
          address: 'auto',
          name: 'auto',
        },
        
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
        
        metadata: {
          uid,
          bookingData: JSON.stringify(bookingData),
          customerName: customerInfo.name,
          customerAddress: JSON.stringify(customerInfo.address),
          // Add export transaction fields for Indian compliance
          export_transaction: 'true',
          customer_country: 'IN',
          business_type: 'parking_services',
        },
        
        // Additional invoice settings for compliance
        invoice_creation: {
          enabled: true,
          invoice_data: {
            description: `Parking Services - Vehicle: ${bookingData.vehicleNumber}`,
            footer: 'Parkify Parking Services - Export Transaction',
            custom_fields: [
              {
                name: 'Customer Name',
                value: customerInfo.name,
              },
              {
                name: 'Vehicle Number',
                value: bookingData.vehicleNumber,
              },
              {
                name: 'Service Type',
                value: 'Parking Services',
              },
            ],
          },
        },
      })

      return { sessionId: session.id, customerId: customer.id }
    } catch (error) {
      console.error('Stripe session creation error:', error)
      if (error.message?.includes('export transactions')) {
        throw new BadRequestException('Unable to process payment: Customer information incomplete for Indian regulations. Please ensure all address fields are filled.')
      }
      throw error
    }
  }
}
