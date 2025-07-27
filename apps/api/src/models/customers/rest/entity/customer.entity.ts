import { Customer } from '@prisma/client'
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class CustomerEntity
  implements RestrictProperties<CustomerEntity, Customer>
{
  uid: string
  createdAt: Date
  updatedAt: Date
  @IsOptional()
  displayName: string
  
  // New address fields
  @IsOptional()
  @IsString()
  addressLine1: string
  @IsOptional()
  @IsString()
  city: string
  @IsOptional()
  @IsString()
  state: string
  @IsOptional()
  @IsString()
  postalCode: string
  @IsOptional()
  @IsString()
  country: string
}
