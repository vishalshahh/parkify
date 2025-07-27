import { LocationInfo } from './types'

export const initialViewState = {
  latitude: 28.4744,
  longitude: 77.503,
  zoom: 13.5,
}

export const majorCitiesLocationInfo: LocationInfo[] = [
  {
    placeName: 'Greater Noida, Uttar Pradesh, India',
    latLng: [28.4744, 77.503],
  },
  {
    placeName: 'New Delhi, Delhi, India',
    latLng: [28.6139, 77.209],
  },
  {
    placeName: 'Ghaziabad, Uttar Pradesh, India',
    latLng: [28.6692, 77.4538],
  },
  {
    placeName: 'Noida, Uttar Pradesh, India',
    latLng: [28.5355, 77.391],
  },
  {
    placeName: 'Badarpur, Delhi, India',
    latLng: [28.4962, 77.2996],
  },
  {
    placeName: 'Faridabad, Haryana, India',
    latLng: [28.4089, 77.3178],
  },
  {
    placeName: 'Chennai, Tamil Nadu, India',
    latLng: [13.0827, 80.2707],
  },
  {
    placeName: 'London, Greater London, England, United Kingdom',
    latLng: [51.5074, -0.1278],
  },
  {
    placeName: 'Paris, France',
    latLng: [48.8566, 2.3522],
  },
  {
    placeName: 'Berlin, Germany',
    latLng: [52.52, 13.405],
  },
  {
    placeName: 'Sydney, New South Wales, Australia',
    latLng: [-33.8688, 151.2093],
  },
  {
    placeName: 'Rio de Janeiro, Brazil',
    latLng: [-22.9068, -43.1729],
  },
  {
    placeName: 'Cape Town, Western Cape, South Africa',
    latLng: [-33.9249, 18.4241],
  },
  {
    placeName: 'Moscow, Russia',
    latLng: [55.7558, 37.6176],
  },
  {
    placeName: 'Beijing, China',
    latLng: [39.9042, 116.4074],
  },
]

// Valet charges: 100rs for typical pickup distance (assuming ~5km average)
// This works out to approximately 0.02rs per meter for a 5km trip = 100rs
export const VALET_CHARGE_PER_METER = 0.02

export const TAKE_COUNT = 12
