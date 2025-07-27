import { Field, InputType, PickType } from '@nestjs/graphql'
import { Customer } from '../entity/customer.entity'

@InputType()
export class CreateCustomerInput extends PickType(
  Customer,
  ['uid', 'displayName'],
  InputType,
) {
  // Optional address fields
  @Field({ nullable: true })
  addressLine1?: string
  
  @Field({ nullable: true })
  city?: string
  
  @Field({ nullable: true })
  state?: string
  
  @Field({ nullable: true })
  postalCode?: string
  
  @Field({ nullable: true })
  country?: string
}
