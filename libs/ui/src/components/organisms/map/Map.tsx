import MapGl, { useMap } from 'react-map-gl'
import { useState, useEffect } from 'react'

type MapProps = React.ComponentProps<typeof MapGl> & { height?: string }

export const Map = ({ height = 'calc(100vh - 4rem)', ...props }: MapProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  // Debug token
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    console.log('Mapbox Token Status:', token ? 'Present' : 'Missing')
    if (!token) {
      console.error('NEXT_PUBLIC_MAPBOX_TOKEN is not set!')
      setHasError(true)
      setIsLoading(false)
    }
  }, [])

  // Timeout fallback
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log('Map load timeout - hiding loading state')
        setIsLoading(false)
      }
    }, 3000) // Reduced timeout

    return () => clearTimeout(timeout)
  }, [isLoading])

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!mapboxToken) {
    return (
      <div className="relative" style={{ height }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-red-600">
            <div className="text-sm">Mapbox token not configured</div>
            <div className="text-xs mt-1">Check NEXT_PUBLIC_MAPBOX_TOKEN</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative" style={{ height }}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <div className="text-sm text-gray-600">Loading map...</div>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center text-red-600">
            <div className="text-sm mb-2">Failed to load map</div>
            <button 
              className="px-3 py-1 bg-primary text-white rounded text-xs"
              onClick={() => {
                setHasError(false)
                setIsLoading(true)
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <MapGl
        {...props}
        projection={{ name: 'globe' }}
        // Use a standard Mapbox style that's guaranteed to work
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={mapboxToken}
        style={{ height }}
        scrollZoom={true} // Enable scroll zoom for better UX
        onLoad={() => {
          console.log('✅ Map loaded successfully')
          setIsLoading(false)
        }}
        onError={(error) => {
          console.error('❌ Map loading error:', error)
          setHasError(true)
          setIsLoading(false)
        }}
      >
        <StyleMap />
        {!isLoading && props.children}
      </MapGl>
    </div>
  )
}

export const StyleMap = () => {
  const { current } = useMap()

  useEffect(() => {
    if (!current) return

    const handleStyleLoad = () => {
      try {
        const map = current.getMap()
        if (map && map.isStyleLoaded()) {
          // Simplified fog effect - remove if causing issues
          try {
            map.setFog({
              color: 'rgb(255, 255, 255)',
              range: [1, 10],
              // @ts-ignore
              'high-color': 'rgb(200, 200, 200)',
              'horizon-blend': 0.05,
              'space-color': 'rgb(150, 150, 150)',
              'star-intensity': 0.5,
            })
            console.log('✅ Map fog effect applied')
          } catch (fogError) {
            console.warn('⚠️ Fog effect not supported, continuing without it')
          }
        }
      } catch (error) {
        console.warn('⚠️ Could not set map effects:', error)
      }
    }

    // Check if already loaded
    if (current.getMap()?.isStyleLoaded()) {
      handleStyleLoad()
    } else {
      current.on('style.load', handleStyleLoad)
    }

    return () => {
      current?.off('style.load', handleStyleLoad)
    }
  }, [current])

  return null
}
