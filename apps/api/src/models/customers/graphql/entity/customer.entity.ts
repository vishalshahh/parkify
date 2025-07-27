import { Field, ObjectType } from '@nestjs/graphql'
import { Customer as CustomerType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Customer implements RestrictProperties<Customer, CustomerType> {
  uid: string
  createdAt: Date
  updatedAt: Date
  @Field({ nullable: true })
  displayName: string
  
  // New address fields
  @Field({ nullable: true })
  addressLine1: string
  @Field({ nullable: true })
  city: string
  @Field({ nullable: true })
  state: string
  @Field({ nullable: true })
  postalCode: string
  @Field({ nullable: true })
  country: string
}
