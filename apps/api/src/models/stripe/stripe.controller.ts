import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import StripeService from './stripe.service'
import { BookingsService } from '../bookings/graphql/bookings.service'
import { CreateStripeDto } from './dto/create-stripe-session.dto'
import { CreateBookingInput } from '../bookings/graphql/dtos/create-booking.input'
import { Response } from 'express'

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly bookingService: BookingsService,
  ) {}

  @Get()
  helloStripe() {
    return 'Hello Stripe - Indian Export Compliant'
  }

  @Post()
  async create(@Body() createStripeDto: CreateStripeDto) {
    try {
      // Comprehensive validation for Indian compliance
      if (!createStripeDto.customerInfo) {
        throw new BadRequestException('Customer information is required for Indian export compliance')
      }

      const { customerInfo } = createStripeDto

      // Validate name
      if (!customerInfo.name || customerInfo.name.trim().length < 2) {
        throw new BadRequestException('Valid customer name is required')
      }

      // Validate email
      if (!customerInfo.email) {
        throw new BadRequestException('Email address is required for payment processing')
      }

      // Validate complete address
      const { address } = customerInfo
      if (!address || !address.line1 || !address.city || !address.state || !address.postal_code) {
        throw new BadRequestException('Complete address (line1, city, state, postal_code) is required for Indian export compliance')
      }

      // Validate PIN code format
      const pinRegex = /^[1-9][0-9]{5}$/
      if (!pinRegex.test(address.postal_code)) {
        throw new BadRequestException('Valid 6-digit PIN code is required')
      }

      return await this.stripeService.createStripeSession(createStripeDto)
    } catch (error) {
      console.error('Stripe controller error:', error)
      throw error
    }
  }

  @Get('success')
  async handleStripeSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    if (!sessionId) {
      throw new BadRequestException('Session id missing.')
    }

    try {
      const session =
        await this.stripeService.stripe.checkout.sessions.retrieve(sessionId)

      const { uid, bookingData } = session.metadata

      const bookingInput: CreateBookingInput = JSON.parse(bookingData)
      const newBooking = await this.bookingService.create(bookingInput)
      
      res.redirect(process.env.BOOKINGS_REDIRECT_URL)
    } catch (error) {
      console.error('Stripe success handler error:', error)
      res.redirect(process.env.STRIPE_CANCEL_URL + '?error=processing_failed')
    }
  }
}
