import { SearchGaragesQuery } from '@parkify/network/src/gql/generated'
import { useState, useEffect, useCallback } from 'react'
import { toast } from '../molecules/Toast'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormTypeBookSlot } from '@parkify/forms/src/bookSlot'
import { Switch } from '../atoms/Switch'
import { Marker } from './map/MapMarker'
import { Map } from './map/Map'
import { ParkingIcon } from '../atoms/ParkingIcon'
import { IconUser } from '@tabler/icons-react'
import { Directions } from './Directions'
import { Panel } from './map/Panel'
import { DefaultZoomControls } from './map/ZoomControls'

export const ManageValets = ({
  garage,
}: {
  garage: SearchGaragesQuery['searchGarages'][number]
}) => {
  const [showValet, setShowValet] = useState(false)
  
  const { setValue, getValues } = useFormContext<FormTypeBookSlot>()
  const { valet } = useWatch<FormTypeBookSlot>()

  // Local state for marker positions during drag (prevents glitching)
  const [pickupPosition, setPickupPosition] = useState<{lat: number, lng: number} | null>(null)
  const [dropoffPosition, setDropoffPosition] = useState<{lat: number, lng: number} | null>(null)
  const [isDragging, setIsDragging] = useState<'pickup' | 'dropoff' | null>(null)

  const lat = garage.address?.lat
  const lng = garage.address?.lng
  
  // Update local positions when form values change (but not during drag)
  useEffect(() => {
    if (!isDragging && valet?.pickupInfo) {
      setPickupPosition({ lat: valet.pickupInfo.lat, lng: valet.pickupInfo.lng })
    }
  }, [valet?.pickupInfo?.lat, valet?.pickupInfo?.lng, isDragging])

  useEffect(() => {
    if (!isDragging && valet?.dropoffInfo) {
      setDropoffPosition({ lat: valet.dropoffInfo.lat, lng: valet.dropoffInfo.lng })
    }
  }, [valet?.dropoffInfo?.lat, valet?.dropoffInfo?.lng, isDragging])
  
  if (!lat || !lng) {
    return (
      <div className="p-2 space-y-3 bg-gray-25">
        <div className="text-xl font-bold">Valet</div>
        <div className="text-red-600 text-sm">
          Garage location not available. Valet service unavailable.
        </div>
      </div>
    )
  }

  const handleValetToggle = (enabled: boolean) => {
    setShowValet(enabled)

    if (!enabled) {
      setValue('valet', undefined, { shouldValidate: true })
      setPickupPosition(null)
      setDropoffPosition(null)
    } else {
      const valetData = {
        pickupInfo: {
          lat,
          lng,
          distance: 0
        },
        dropoffInfo: {
          lat,
          lng,
          distance: 0
        },
        differentLocations: false
      }
      
      setValue('valet', valetData, { shouldValidate: true })
      setPickupPosition({ lat, lng })
      setDropoffPosition({ lat, lng })
    }
  }

  const handleDifferentLocationsToggle = (enabled: boolean) => {
    const currentValet = getValues('valet') || {}
    
    if (!enabled) {
      setValue('valet.differentLocations', false)
      const pickupLat = currentValet.pickupInfo?.lat || lat
      const pickupLng = currentValet.pickupInfo?.lng || lng
      setValue('valet.dropoffInfo', {
        lat: pickupLat,
        lng: pickupLng,
        distance: currentValet.pickupInfo?.distance || 0
      })
      setDropoffPosition({ lat: pickupLat, lng: pickupLng })
    } else {
      setValue('valet.differentLocations', true)
      setValue('valet.dropoffInfo', {
        lat,
        lng,
        distance: 0
      })
      setDropoffPosition({ lat, lng })
    }
  }

  // Pickup marker drag handlers
  const handlePickupDragStart = useCallback(() => {
    setIsDragging('pickup')
  }, [])

  const handlePickupDrag = useCallback(({ lngLat }: any) => {
    if (lngLat) {
      setPickupPosition({ lat: lngLat.lat, lng: lngLat.lng })
    }
  }, [])

  const handlePickupDragEnd = useCallback(({ lngLat }: any) => {
    if (lngLat) {
      const { lat: newLat, lng: newLng } = lngLat
      
      // Update form state
      setValue('valet.pickupInfo.lat', newLat)
      setValue('valet.pickupInfo.lng', newLng)
      
      // If not using different locations, update dropoff too
      const currentValet = getValues('valet')
      if (!currentValet?.differentLocations) {
        setValue('valet.dropoffInfo.lat', newLat)
        setValue('valet.dropoffInfo.lng', newLng)
        setDropoffPosition({ lat: newLat, lng: newLng })
      }
      
      setPickupPosition({ lat: newLat, lng: newLng })
    }
    setIsDragging(null)
  }, [setValue, getValues])

  // Dropoff marker drag handlers
  const handleDropoffDragStart = useCallback(() => {
    setIsDragging('dropoff')
  }, [])

  const handleDropoffDrag = useCallback(({ lngLat }: any) => {
    if (lngLat) {
      setDropoffPosition({ lat: lngLat.lat, lng: lngLat.lng })
    }
  }, [])

  const handleDropoffDragEnd = useCallback(({ lngLat }: any) => {
    if (lngLat) {
      const { lat: newLat, lng: newLng } = lngLat
      setValue('valet.dropoffInfo.lat', newLat)
      setValue('valet.dropoffInfo.lng', newLng)
      setDropoffPosition({ lat: newLat, lng: newLng })
    }
    setIsDragging(null)
  }, [setValue])

  // Use local positions during drag, form positions otherwise
  const currentPickupPosition = pickupPosition || (valet?.pickupInfo ? { lat: valet.pickupInfo.lat, lng: valet.pickupInfo.lng } : null)
  const currentDropoffPosition = dropoffPosition || (valet?.dropoffInfo ? { lat: valet.dropoffInfo.lat, lng: valet.dropoffInfo.lng } : null)

  return (
    <div className="p-2 space-y-3 bg-gray-25">
      <div className="text-xl font-bold">Valet</div>
      <p className="text-sm text-gray">
        Our valets will whisk your car away to its reserved spot and bring it
        back when you&apos;re ready. It&apos;s like magic, but with cars!
      </p>

      <Switch
        checked={showValet}
        onChange={handleValetToggle}
        label={'Need valet?'}
      />

      {showValet ? (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-gray">
              Want your car delivered somewhere else? No problem! Choose a
              different drop-off point and we&apos;ll make sure your ride is
              there waiting for you.
            </p>
            <Switch
              checked={valet?.differentLocations || false}
              onChange={handleDifferentLocationsToggle}
              label={'Add a different drop off location?'}
            />
          </div>
          
          {/* Map Section */}
          <div className="border rounded-lg overflow-hidden">
            <Map
              initialViewState={{
                latitude: lat,
                longitude: lng,
                zoom: 13,
              }}
              height="400px"
            >
              <Panel position="right-center">
                <DefaultZoomControls />
              </Panel>
              
              {/* Garage Marker */}
              <Marker latitude={lat} longitude={lng}>
                <div className="flex flex-col items-center">
                  <ParkingIcon />
                  <span className="text-xs bg-white px-1 rounded shadow">Garage</span>
                </div>
              </Marker>
              
              {/* Pickup Location Marker */}
              {currentPickupPosition ? (
                <>
                  <Marker
                    latitude={currentPickupPosition.lat}
                    longitude={currentPickupPosition.lng}
                    draggable
                    onDragStart={handlePickupDragStart}
                    onDrag={handlePickupDrag}
                    onDragEnd={handlePickupDragEnd}
                  >
                    <div className="flex flex-col items-center cursor-move">
                      <IconUser className="text-blue-600 w-6 h-6" />
                      <span className="text-xs bg-blue-100 px-1 rounded shadow">
                        Pickup {!valet?.differentLocations ? '& Drop off' : ''}
                      </span>
                    </div>
                  </Marker>
                  {/* Only show directions when not dragging */}
                  {isDragging !== 'pickup' && (
                    <Directions
                      sourceId={'pickup_route'}
                      origin={{ lat, lng }}
                      destination={{
                        lat: currentPickupPosition.lat,
                        lng: currentPickupPosition.lng,
                      }}
                      setDistance={(distance) => {
                        setValue('valet.pickupInfo.distance', distance)
                      }}
                    />
                  )}
                </>
              ) : null}

              {/* Drop off Location Marker (if different from pickup) */}
              {valet?.differentLocations && currentDropoffPosition ? (
                <>
                  <Marker
                    latitude={currentDropoffPosition.lat}
                    longitude={currentDropoffPosition.lng}
                    draggable
                    onDragStart={handleDropoffDragStart}
                    onDrag={handleDropoffDrag}
                    onDragEnd={handleDropoffDragEnd}
                  >
                    <div className="flex flex-col items-center cursor-move">
                      <IconUser className="text-green-600 w-6 h-6" />
                      <span className="text-xs bg-green-100 px-1 rounded shadow">
                        Drop off
                      </span>
                    </div>
                  </Marker>
                  {/* Only show directions when not dragging */}
                  {isDragging !== 'dropoff' && (
                    <Directions
                      sourceId={'dropoff_route'}
                      origin={{ lat, lng }}
                      destination={{
                        lat: currentDropoffPosition.lat,
                        lng: currentDropoffPosition.lng,
                      }}
                      setDistance={(distance) => {
                        setValue('valet.dropoffInfo.distance', distance)
                      }}
                    />
                  )}
                </>
              ) : null}
            </Map>
          </div>

          {/* Valet Info */}
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
            <strong>Instructions:</strong>
            <ul className="mt-1 ml-4 list-disc">
              <li>Drag the blue marker to set your pickup location</li>
              <li>Toggle "different drop off location" if needed</li>
              <li>Valet charges are calculated based on distance</li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}
