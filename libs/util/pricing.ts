// Standard parking rates in INR per hour
export const PARKING_RATES = {
  CAR: 50,
  BIKE: 30,
  BICYCLE: 10,
  HEAVY: 100,
} as const

// Valet service rate
export const VALET_RATE_PER_HOUR = 100

// Valet charge per meter (for distance-based calculation)
// Assuming average pickup distance of 5km = 5000m
// 100rs / 5000m = 0.02rs per meter
export const VALET_CHARGE_PER_METER = 0.02

export const getDefaultPriceForSlotType = (slotType: keyof typeof PARKING_RATES) => {
  return PARKING_RATES[slotType]
} 