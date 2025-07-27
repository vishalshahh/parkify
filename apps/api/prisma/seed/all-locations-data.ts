import { generateSlots } from './util'
import { Prisma } from '@prisma/client'

// Array of all image URLs from the original data
const imageUrls = [
  'https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/create-a-cover-image-of-an-affordable-parking-garage-in-brooklyn-new-york-the-picture-should-featu-561631306_qir7we.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/create-a-cover-image-of-an-affordable-and-clean-parking-garage-in-brooklyn-new-york-the-picture-sh-825512221_kzvig6.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/design-a-cover-picture-for-a-convenient-parking-garage-in-queens-new-york-the-image-should-show-a--976407210_la43y2.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/design-a-cover-picture-for-a-convenient-parking-garage-in-queens-new-york-the-image-should-show-a--639233464_tuskex.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/design-a-cover-picture-for-a-parking-garage-in-long-island-city-queens-new-york-the-image-should--184920453_v8umyi.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/create-a-cover-image-of-a-spacious-parking-garage-in-brooklyn-heights-new-york-the-picture-should--539597916_obi5kl.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/design-a-cover-picture-for-a-parking-garage-in-long-island-city-queens-new-york-the-image-should--110448605_bqjzmf.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/render-a-cover-picture-of-a-secure-parking-garage-near-central-park-in-manhattan-new-york-the-imag-736153979_kvpczt.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/create-a-cover-image-of-an-affordable-clean-outdoor-parking-garage-in-brooklyn-new-york-the-pict-620611113_ortr3g.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158769/autospace/busy-parking-garage-with-slots-in-newyork-neon-ambiance-abstract-black-oil-gear-mecha-detailed-a_fy51wa.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/brand-new-ultra-modern-techno-parking-garage-with-slots-showing-newyork-skyline-haze-ultra-detail_n1hhhz.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/brand-new-ultra-modern-car-parking-garage-with-slots-wide-angle-haze-ultra-detailed-film-photogr_kst6l1.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/busy-parking-garage-near-a-newyork-central-park-acrylic-painting-trending-on-pixiv-fanbox-palette-790070610_pptabc.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/brand-new-ultra-modern-techno-parking-garage-with-slots-wide-angle-haze-ultra-detailed-film-phot_ywuzvl.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/brand-new-ultra-modern-techno-parking-garage-with-slots-showing-newyork-skyline-low-poly-isometri_lai3r3.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/brand-new-modern-techno-parking-garage-with-slots-showing-newyork-skyline-low-poly-isometric-art_rfgxgp.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/busy-parking-garage-with-slots-in-newyork-in-the-hudson-river-low-poly-isometric-art-3d-art-high_os8c09.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/brand-new-modern-techno-parking-garage-with-slots-showing-newyork-skyline-with-no-cars-low-poly-i_ikyidk.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/busy-parking-garage-with-slots-in-newyork-outer-space-vanishing-point-super-highway-high-speed-_wnpn6u.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158766/autospace/busy-parking-garage-near-a-newyork-central-park-acrylic-painting-trending-on-pixiv-fanbox-palette_buv6ks.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1716158766/autospace/multistorey-parking-garage-with-slots-showing-newyork-skyline-low-poly-isometric-art-3d-art-hig_1_pbgzgi.jpg',
]

// Helper function to get random image
const getRandomImage = () =>
  imageUrls[Math.floor(Math.random() * imageUrls.length)]

// Helper function to get random slot types
const getRandomSlots = () => {
  const slotTypes = ['BIKE', 'CAR', 'BICYCLE', 'HEAVY']
  const numTypes = Math.floor(Math.random() * 3) + 1 // 1-3 types
  const selectedTypes = []

  for (let i = 0; i < numTypes; i++) {
    const randomType = slotTypes[Math.floor(Math.random() * slotTypes.length)]
    if (!selectedTypes.includes(randomType)) {
      selectedTypes.push(randomType)
    }
  }

  return selectedTypes.map((type) => generateSlots({ type })).flat()
}

// Greater Noida Garages
export const greaterNoidaGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Alpha 1 Commercial Complex',
    description: "Modern parking facility in Greater Noida's commercial hub",
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Alpha 1, Greater Noida, Uttar Pradesh 201310, India',
        lat: 28.4744,
        lng: 77.503,
      },
    },
  },
  {
    displayName: 'Beta 2 Metro Station Garage',
    description: 'Convenient parking near Metro station',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Beta 2, Greater Noida, Uttar Pradesh 201308, India',
        lat: 28.4808,
        lng: 77.5167,
      },
    },
  },
  {
    displayName: 'Gamma 1 Shopping Center',
    description: 'Shopping complex parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Gamma 1, Greater Noida, Uttar Pradesh 201310, India',
        lat: 28.4689,
        lng: 77.495,
      },
    },
  },
  {
    displayName: 'Delta 1 Business Park',
    description: 'Corporate parking solution',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Delta 1, Greater Noida, Uttar Pradesh 201308, India',
        lat: 28.4823,
        lng: 77.5098,
      },
    },
  },
  {
    displayName: 'Techzone 4 IT Hub',
    description: 'Tech park parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Techzone 4, Greater Noida, Uttar Pradesh 201310, India',
        lat: 28.465,
        lng: 77.489,
      },
    },
  },
  {
    displayName: 'Omicron 1 Residential',
    description: 'Residential complex parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Omicron 1, Greater Noida, Uttar Pradesh 201308, India',
        lat: 28.489,
        lng: 77.514,
      },
    },
  },
  {
    displayName: 'Pari Chowk Hub',
    description: 'Central Greater Noida parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Pari Chowk, Greater Noida, Uttar Pradesh 201310, India',
        lat: 28.472,
        lng: 77.502,
      },
    },
  },
  {
    displayName: 'Knowledge Park Garage',
    description: 'Educational hub parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Knowledge Park 2, Greater Noida, Uttar Pradesh 201306, India',
        lat: 28.461,
        lng: 77.485,
      },
    },
  },
  {
    displayName: 'Surajpur Industrial Area',
    description: 'Industrial zone parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Surajpur, Greater Noida, Uttar Pradesh 201306, India',
        lat: 28.495,
        lng: 77.518,
      },
    },
  },
  {
    displayName: 'Ecotech Extension',
    description: 'Modern eco-friendly parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address:
          'Ecotech Extension 1, Greater Noida, Uttar Pradesh 201308, India',
        lat: 28.458,
        lng: 77.492,
      },
    },
  },
]

// New Delhi Garages
export const newDelhiGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Connaught Place Central',
    description: "Premium parking in Delhi's commercial heart",
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Connaught Place, New Delhi, Delhi 110001, India',
        lat: 28.6304,
        lng: 77.2177,
      },
    },
  },
  {
    displayName: 'India Gate Plaza',
    description: 'Historic area parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'India Gate, New Delhi, Delhi 110003, India',
        lat: 28.6129,
        lng: 77.2295,
      },
    },
  },
  {
    displayName: 'Khan Market Garage',
    description: 'Upscale market parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Khan Market, New Delhi, Delhi 110003, India',
        lat: 28.5989,
        lng: 77.2307,
      },
    },
  },
  {
    displayName: 'Karol Bagh Metro',
    description: 'Metro station parking hub',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Karol Bagh, New Delhi, Delhi 110005, India',
        lat: 28.6507,
        lng: 77.1909,
      },
    },
  },
  {
    displayName: 'South Extension Plaza',
    description: 'Shopping district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'South Extension, New Delhi, Delhi 110049, India',
        lat: 28.5697,
        lng: 77.2242,
      },
    },
  },
  {
    displayName: 'Rajouri Garden Mall',
    description: 'West Delhi shopping parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Rajouri Garden, New Delhi, Delhi 110027, India',
        lat: 28.6464,
        lng: 77.1181,
      },
    },
  },
  {
    displayName: 'Lajpat Nagar Market',
    description: 'Traditional market parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Lajpat Nagar, New Delhi, Delhi 110024, India',
        lat: 28.5656,
        lng: 77.2431,
      },
    },
  },
  {
    displayName: 'Nehru Place IT Hub',
    description: 'Technology district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Nehru Place, New Delhi, Delhi 110019, India',
        lat: 28.5505,
        lng: 77.2506,
      },
    },
  },
  {
    displayName: 'Saket Select City Walk',
    description: 'Premium mall parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Saket, New Delhi, Delhi 110017, India',
        lat: 28.5245,
        lng: 77.2066,
      },
    },
  },
  {
    displayName: 'Dwarka Sector 21 Metro',
    description: 'Modern metro parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Dwarka Sector 21, New Delhi, Delhi 110075, India',
        lat: 28.5692,
        lng: 77.0593,
      },
    },
  },
]

// London Garages
export const londonGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Westminster Central Garage',
    description: 'Premium parking near Westminster Abbey and Big Ben',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '123 Victoria Street, Westminster, London SW1E 6DE, UK',
        lat: 51.4975,
        lng: -0.1357,
      },
    },
  },
  {
    displayName: 'Camden Market Garage',
    description: "Convenient parking near Camden Market and Regent's Park",
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '45 Camden High Street, Camden, London NW1 7JH, UK',
        lat: 51.5412,
        lng: -0.1434,
      },
    },
  },
  {
    displayName: 'Kensington Palace Garage',
    description: 'Secure parking in upscale Kensington near Hyde Park',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '78 Kensington High Street, Kensington, London W8 4PE, UK',
        lat: 51.5019,
        lng: -0.191,
      },
    },
  },
  {
    displayName: 'Canary Wharf Business Centre',
    description: "Modern parking facility in London's financial district",
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '25 Bank Street, Canary Wharf, London E14 5JP, UK',
        lat: 51.5051,
        lng: -0.0209,
      },
    },
  },
  {
    displayName: 'Shoreditch Creative Quarter',
    description: 'Trendy parking spot in the heart of East London',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '67 Shoreditch High Street, Shoreditch, London E1 6JJ, UK',
        lat: 51.5255,
        lng: -0.0754,
      },
    },
  },
  {
    displayName: 'Greenwich Maritime Garage',
    description:
      'Historic parking near Greenwich Observatory and Maritime Museum',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '89 Greenwich Church Street, Greenwich, London SE10 9BL, UK',
        lat: 51.4816,
        lng: 0.0052,
      },
    },
  },
  {
    displayName: 'Clapham Junction Station Garage',
    description: "Convenient parking near London's busiest railway station",
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: "34 St John's Hill, Clapham Junction, London SW11 1SA, UK",
        lat: 51.4642,
        lng: -0.17,
      },
    },
  },
  {
    displayName: 'Hammersmith Apollo Garage',
    description: 'Entertainment district parking near Apollo venue',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '112 King Street, Hammersmith, London W6 0QU, UK',
        lat: 51.4927,
        lng: -0.2339,
      },
    },
  },
  {
    displayName: 'Islington Angel Garage',
    description: 'Vibrant North London parking near Angel tube station',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '56 Upper Street, Islington, London N1 0NY, UK',
        lat: 51.5362,
        lng: -0.1058,
      },
    },
  },
  {
    displayName: 'Richmond Park Gateway',
    description: 'Peaceful parking near Richmond Park and Thames riverside',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '98 The Quadrant, Richmond, London TW9 1DN, UK',
        lat: 51.4613,
        lng: -0.3037,
      },
    },
  },
]

// Paris Garages
export const parisGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Champs-Élysées Premium',
    description: "Luxury parking on the world's most famous avenue",
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '123 Avenue des Champs-Élysées, 75008 Paris, France',
        lat: 48.8698,
        lng: 2.3077,
      },
    },
  },
  {
    displayName: 'Le Marais Historic Garage',
    description: 'Charming parking in historic Marais district',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '45 Rue de Rivoli, 75004 Paris, France',
        lat: 48.857,
        lng: 2.3537,
      },
    },
  },
  {
    displayName: 'Montmartre Artists Quarter',
    description: 'Bohemian parking near Sacré-Cœur',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '18 Rue Lepic, 75018 Paris, France',
        lat: 48.8846,
        lng: 2.3352,
      },
    },
  },
  {
    displayName: 'Saint-Germain Literary Garage',
    description: 'Intellectual hub parking in Left Bank',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '67 Boulevard Saint-Germain, 75005 Paris, France',
        lat: 48.8499,
        lng: 2.3447,
      },
    },
  },
  {
    displayName: 'La Défense Business District',
    description: 'Modern corporate parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '1 Parvis de la Défense, 92800 Puteaux, France',
        lat: 48.8917,
        lng: 2.2361,
      },
    },
  },
  {
    displayName: 'Bastille Revolution Square',
    description: 'Historic square parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '23 Place de la Bastille, 75011 Paris, France',
        lat: 48.8532,
        lng: 2.3691,
      },
    },
  },
  {
    displayName: 'Trocadéro Eiffel View',
    description: 'Parking with stunning Eiffel Tower views',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '1 Place du Trocadéro, 75016 Paris, France',
        lat: 48.863,
        lng: 2.2876,
      },
    },
  },
  {
    displayName: 'Opéra Garnier Cultural',
    description: 'Cultural district parking near Opera House',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '8 Rue Scribe, 75009 Paris, France',
        lat: 48.8719,
        lng: 2.3316,
      },
    },
  },
  {
    displayName: 'République Central Hub',
    description: 'Central Paris transportation hub parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '12 Place de la République, 75011 Paris, France',
        lat: 48.8678,
        lng: 2.3633,
      },
    },
  },
  {
    displayName: 'Belleville Multicultural',
    description: 'Diverse neighborhood parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '56 Rue de Belleville, 75020 Paris, France',
        lat: 48.8713,
        lng: 2.3807,
      },
    },
  },
]

// Berlin Garages
export const berlinGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Brandenburg Gate Historic',
    description: 'Iconic location parking near Brandenburg Gate',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Pariser Platz 1, 10117 Berlin, Germany',
        lat: 52.5163,
        lng: 13.3777,
      },
    },
  },
  {
    displayName: 'Alexanderplatz Tower',
    description: 'Central Berlin parking at TV Tower',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Alexanderplatz 7, 10178 Berlin, Germany',
        lat: 52.5219,
        lng: 13.4132,
      },
    },
  },
  {
    displayName: 'Kreuzberg Alternative',
    description: 'Hip district parking in trendy Kreuzberg',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Oranienstraße 45, 10969 Berlin, Germany',
        lat: 52.502,
        lng: 13.4178,
      },
    },
  },
  {
    displayName: 'Potsdamer Platz Modern',
    description: 'Modern business district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Potsdamer Platz 1, 10785 Berlin, Germany',
        lat: 52.5096,
        lng: 13.3762,
      },
    },
  },
  {
    displayName: 'Prenzlauer Berg Family',
    description: 'Family-friendly neighborhood parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Kastanienallee 67, 10435 Berlin, Germany',
        lat: 52.5346,
        lng: 13.4016,
      },
    },
  },
  {
    displayName: 'Charlottenburg Palace',
    description: 'Royal district parking near palace',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Spandauer Damm 10-22, 14059 Berlin, Germany',
        lat: 52.5209,
        lng: 13.2957,
      },
    },
  },
  {
    displayName: 'Hackescher Markt Culture',
    description: 'Cultural quarter parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Hackescher Markt 2, 10178 Berlin, Germany',
        lat: 52.5225,
        lng: 13.4026,
      },
    },
  },
  {
    displayName: 'Schöneberg Rainbow',
    description: 'Diverse community parking hub',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Hauptstraße 78, 10827 Berlin, Germany',
        lat: 52.4837,
        lng: 13.3506,
      },
    },
  },
  {
    displayName: 'Friedrichshain East Side',
    description: 'East Berlin artistic district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Mühlenstraße 12, 10243 Berlin, Germany',
        lat: 52.5058,
        lng: 13.4394,
      },
    },
  },
  {
    displayName: 'Tiergarten Green Oasis',
    description: 'Park-adjacent eco-friendly parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Unter den Linden 45, 10117 Berlin, Germany',
        lat: 52.517,
        lng: 13.3888,
      },
    },
  },
]

// Sydney Garages
export const sydneyGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Sydney Opera House Harbour',
    description: 'Iconic harbour parking near Opera House',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Bennelong Point, Sydney NSW 2000, Australia',
        lat: -33.8568,
        lng: 151.2153,
      },
    },
  },
  {
    displayName: 'Circular Quay Transport Hub',
    description: 'Central ferry and train station parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Circular Quay, Sydney NSW 2000, Australia',
        lat: -33.8617,
        lng: 151.2108,
      },
    },
  },
  {
    displayName: 'Bondi Beach Coastal',
    description: 'Beachside parking at famous Bondi Beach',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Campbell Parade, Bondi Beach NSW 2026, Australia',
        lat: -33.8915,
        lng: 151.2767,
      },
    },
  },
  {
    displayName: 'Darling Harbour Entertainment',
    description: 'Entertainment precinct parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Darling Dr, Darling Harbour NSW 2000, Australia',
        lat: -33.874,
        lng: 151.1982,
      },
    },
  },
  {
    displayName: 'The Rocks Historic Quarter',
    description: 'Heritage district parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'George St, The Rocks NSW 2000, Australia',
        lat: -33.8599,
        lng: 151.209,
      },
    },
  },
  {
    displayName: 'Surry Hills Creative Hub',
    description: 'Artistic neighborhood parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Crown St, Surry Hills NSW 2010, Australia',
        lat: -33.8847,
        lng: 151.2094,
      },
    },
  },
  {
    displayName: 'Paddington Victorian Terrace',
    description: 'Historic terrace district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Oxford St, Paddington NSW 2021, Australia',
        lat: -33.8839,
        lng: 151.2292,
      },
    },
  },
  {
    displayName: 'Manly Beach Northern Beaches',
    description: 'Northern beaches parking at Manly',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'The Corso, Manly NSW 2095, Australia',
        lat: -33.7969,
        lng: 151.284,
      },
    },
  },
  {
    displayName: 'Newtown Alternative Culture',
    description: 'Alternative culture district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'King St, Newtown NSW 2042, Australia',
        lat: -33.8986,
        lng: 151.1794,
      },
    },
  },
  {
    displayName: 'Coogee Beach Eastern Suburbs',
    description: 'Eastern suburbs beach parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Coogee Bay Rd, Coogee NSW 2034, Australia',
        lat: -33.9222,
        lng: 151.2579,
      },
    },
  },
]

// Ghaziabad Garages
export const ghaziabadGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Raj Nagar Extension Hub',
    description: 'Modern parking in fast-growing residential area',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Raj Nagar Extension, Ghaziabad, Uttar Pradesh 201017, India',
        lat: 28.6692,
        lng: 77.4538,
      },
    },
  },
  {
    displayName: 'Indirapuram City Center',
    description: 'Premium shopping and residential parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Indirapuram, Ghaziabad, Uttar Pradesh 201014, India',
        lat: 28.6448,
        lng: 77.3803,
      },
    },
  },
  {
    displayName: 'Vaishali Metro Station',
    description: 'Metro connectivity parking hub',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Vaishali, Ghaziabad, Uttar Pradesh 201012, India',
        lat: 28.6507,
        lng: 77.334,
      },
    },
  },
  {
    displayName: 'Kaushambi Commercial Complex',
    description: 'Business district parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Kaushambi, Ghaziabad, Uttar Pradesh 201010, India',
        lat: 28.6436,
        lng: 77.3266,
      },
    },
  },
  {
    displayName: 'Sahibabad Industrial Area',
    description: 'Industrial zone parking solution',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sahibabad, Ghaziabad, Uttar Pradesh 201005, India',
        lat: 28.6864,
        lng: 77.3548,
      },
    },
  },
  {
    displayName: 'Crossings Republik Mall',
    description: 'Shopping mall parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Crossings Republik, Ghaziabad, Uttar Pradesh 201016, India',
        lat: 28.6234,
        lng: 77.4021,
      },
    },
  },
  {
    displayName: 'Mohan Nagar Central',
    description: 'Central Ghaziabad parking hub',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Mohan Nagar, Ghaziabad, Uttar Pradesh 201007, India',
        lat: 28.6734,
        lng: 77.3801,
      },
    },
  },
  {
    displayName: 'Govindpuram New Development',
    description: 'New township parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Govindpuram, Ghaziabad, Uttar Pradesh 201013, India',
        lat: 28.689,
        lng: 77.4234,
      },
    },
  },
  {
    displayName: 'Lohia Nagar Residential',
    description: 'Residential area parking solution',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Lohia Nagar, Ghaziabad, Uttar Pradesh 201001, India',
        lat: 28.6598,
        lng: 77.4123,
      },
    },
  },
  {
    displayName: 'Shipra Mall Complex',
    description: 'Entertainment and shopping parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address:
          'Shipra Path, Indirapuram, Ghaziabad, Uttar Pradesh 201014, India',
        lat: 28.6423,
        lng: 77.3789,
      },
    },
  },
]

// Noida Garages
export const noidaGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Sector 18 Atta Market',
    description: 'Premier shopping and business district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 18, Noida, Uttar Pradesh 201301, India',
        lat: 28.5685,
        lng: 77.3194,
      },
    },
  },
  {
    displayName: 'Sector 62 IT Hub',
    description: 'Technology park parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 62, Noida, Uttar Pradesh 201309, India',
        lat: 28.6208,
        lng: 77.3658,
      },
    },
  },
  {
    displayName: 'City Centre Metro Station',
    description: 'Central metro connectivity parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 32, Noida, Uttar Pradesh 201301, India',
        lat: 28.5832,
        lng: 77.3178,
      },
    },
  },
  {
    displayName: 'DLF Mall of India',
    description: 'Premium shopping mall parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 18, Noida, Uttar Pradesh 201301, India',
        lat: 28.5704,
        lng: 77.321,
      },
    },
  },
  {
    displayName: 'Botanical Garden Metro',
    description: 'Green belt metro station parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 38, Noida, Uttar Pradesh 201303, India',
        lat: 28.5634,
        lng: 77.3344,
      },
    },
  },
  {
    displayName: 'Wave City Center',
    description: 'Commercial complex parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 32, Noida, Uttar Pradesh 201301, India',
        lat: 28.5821,
        lng: 77.3156,
      },
    },
  },
  {
    displayName: 'Logix City Centre',
    description: 'Premium lifestyle destination parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 32, Noida, Uttar Pradesh 201301, India',
        lat: 28.5743,
        lng: 77.3567,
      },
    },
  },
  {
    displayName: 'Film City Media Hub',
    description: 'Entertainment industry parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 16A, Noida, Uttar Pradesh 201301, India',
        lat: 28.5823,
        lng: 77.3145,
      },
    },
  },
  {
    displayName: 'Golf Course Extension',
    description: 'Upscale residential area parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector Alpha 2, Greater Noida, Uttar Pradesh 201308, India',
        lat: 28.4934,
        lng: 77.5234,
      },
    },
  },
  {
    displayName: 'Amity University Campus',
    description: 'Educational institution parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 125, Noida, Uttar Pradesh 201313, India',
        lat: 28.5355,
        lng: 77.391,
      },
    },
  },
]

// Badarpur Garages
export const badarpurGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Badarpur Metro Terminal',
    description: 'End-of-line metro station parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Badarpur Metro Station, Badarpur, Delhi 110044, India',
        lat: 28.4962,
        lng: 77.2996,
      },
    },
  },
  {
    displayName: 'Badarpur Border Commercial',
    description: 'Interstate border commercial parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Badarpur Border, Badarpur, Delhi 110044, India',
        lat: 28.4856,
        lng: 77.2934,
      },
    },
  },
  {
    displayName: 'Tughlakabad Industrial Area',
    description: 'Industrial zone parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Tughlakabad, Badarpur, Delhi 110044, India',
        lat: 28.5089,
        lng: 77.2845,
      },
    },
  },
  {
    displayName: 'Sarita Vihar Residential',
    description: 'Residential area parking solution',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sarita Vihar, Badarpur, Delhi 110076, India',
        lat: 28.5234,
        lng: 77.2912,
      },
    },
  },
  {
    displayName: 'Jasola Apollo Hospital',
    description: 'Medical complex parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Jasola, Badarpur, Delhi 110025, India',
        lat: 28.5378,
        lng: 77.2789,
      },
    },
  },
  {
    displayName: 'Kalindi Kunj Riverside',
    description: 'Yamuna riverside parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Kalindi Kunj, Badarpur, Delhi 110025, India',
        lat: 28.5145,
        lng: 77.3012,
      },
    },
  },
  {
    displayName: 'Meethapur Extension',
    description: 'Extended residential parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Meethapur Extension, Badarpur, Delhi 110044, India',
        lat: 28.4723,
        lng: 77.3134,
      },
    },
  },
  {
    displayName: 'Taimoor Nagar Local Market',
    description: 'Local market area parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Taimoor Nagar, Badarpur, Delhi 110044, India',
        lat: 28.4834,
        lng: 77.3078,
      },
    },
  },
  {
    displayName: 'Madanpur Khadar Village',
    description: 'Village area parking solution',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Madanpur Khadar, Badarpur, Delhi 110076, India',
        lat: 28.5023,
        lng: 77.2834,
      },
    },
  },
  {
    displayName: 'Okhla Bird Sanctuary',
    description: 'Nature reserve parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Okhla Bird Sanctuary, Badarpur, Delhi 110025, India',
        lat: 28.5167,
        lng: 77.3189,
      },
    },
  },
]

// Faridabad Garages
export const faridabadGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Sector 16 City Center',
    description: 'Central Faridabad commercial hub parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 16, Faridabad, Haryana 121002, India',
        lat: 28.4089,
        lng: 77.3178,
      },
    },
  },
  {
    displayName: 'Crown Plaza Mall Complex',
    description: 'Premium shopping mall parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 21, Faridabad, Haryana 121001, India',
        lat: 28.4234,
        lng: 77.3267,
      },
    },
  },
  {
    displayName: 'NIT Faridabad Campus',
    description: 'Technical institute parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'NIT Faridabad, Faridabad, Haryana 121004, India',
        lat: 28.3934,
        lng: 77.3056,
      },
    },
  },
  {
    displayName: 'NHPC Chowk Commercial',
    description: 'Business district parking hub',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'NHPC Chowk, Faridabad, Haryana 121003, India',
        lat: 28.4156,
        lng: 77.2989,
      },
    },
  },
  {
    displayName: 'Old Faridabad Railway Station',
    description: 'Historic railway station parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Old Faridabad, Faridabad, Haryana 121002, India',
        lat: 28.4023,
        lng: 77.3234,
      },
    },
  },
  {
    displayName: 'Neelam Chowk Metro Connectivity',
    description: 'Future metro station parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Neelam Chowk, Faridabad, Haryana 121004, India',
        lat: 28.3867,
        lng: 77.3123,
      },
    },
  },
  {
    displayName: 'Sector 81-82 New Town',
    description: 'Modern township parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sector 81, Faridabad, Haryana 121004, India',
        lat: 28.3689,
        lng: 77.2956,
      },
    },
  },
  {
    displayName: 'Ballabhgarh Heritage Town',
    description: 'Historic town center parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Ballabhgarh, Faridabad, Haryana 121004, India',
        lat: 28.3345,
        lng: 77.3234,
      },
    },
  },
  {
    displayName: 'Surajkund Tourism Complex',
    description: 'Tourist destination parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Surajkund, Faridabad, Haryana 121005, India',
        lat: 28.4567,
        lng: 77.2834,
      },
    },
  },
  {
    displayName: 'Industrial Area Parking Hub',
    description: 'Major industrial zone parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Industrial Area, Faridabad, Haryana 121003, India',
        lat: 28.3778,
        lng: 77.3345,
      },
    },
  },
]

// Chennai Garages
export const chennaiGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'T. Nagar Shopping District',
    description: 'Premier shopping area parking in South India',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'T. Nagar, Chennai, Tamil Nadu 600017, India',
        lat: 13.0418,
        lng: 80.2341,
      },
    },
  },
  {
    displayName: 'Marina Beach Promenade',
    description: 'Beachfront parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Marina Beach Rd, Chennai, Tamil Nadu 600002, India',
        lat: 13.0487,
        lng: 80.2824,
      },
    },
  },
  {
    displayName: 'Express Avenue Mall',
    description: 'Modern shopping mall parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address:
          'Express Avenue, Royapettah, Chennai, Tamil Nadu 600014, India',
        lat: 13.0594,
        lng: 80.2584,
      },
    },
  },
  {
    displayName: 'Anna Salai Commercial Hub',
    description: 'Business district parking on main arterial road',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Anna Salai, Chennai, Tamil Nadu 600002, India',
        lat: 13.0827,
        lng: 80.2707,
      },
    },
  },
  {
    displayName: 'Vadapalani Metro Station',
    description: 'Metro connectivity parking hub',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Vadapalani, Chennai, Tamil Nadu 600026, India',
        lat: 13.0501,
        lng: 80.2126,
      },
    },
  },
  {
    displayName: 'OMR IT Corridor',
    description: 'Technology corridor parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Old Mahabalipuram Rd, Chennai, Tamil Nadu 600096, India',
        lat: 12.9516,
        lng: 80.2447,
      },
    },
  },
  {
    displayName: 'Phoenix MarketCity',
    description: 'Premium mall and entertainment parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Velachery, Chennai, Tamil Nadu 600042, India',
        lat: 12.9756,
        lng: 80.221,
      },
    },
  },
  {
    displayName: 'Mylapore Cultural Quarter',
    description: 'Heritage district parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Mylapore, Chennai, Tamil Nadu 600004, India',
        lat: 13.0389,
        lng: 80.2619,
      },
    },
  },
  {
    displayName: 'Guindy Industrial Estate',
    description: 'Industrial area parking solution',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Guindy, Chennai, Tamil Nadu 600032, India',
        lat: 13.0067,
        lng: 80.2206,
      },
    },
  },
  {
    displayName: 'Central Railway Station',
    description: 'Main railway station parking hub',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Park Town, Chennai, Tamil Nadu 600003, India',
        lat: 13.0827,
        lng: 80.2749,
      },
    },
  },
]

// Rio de Janeiro Garages
export const rioGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Copacabana Beach Garage',
    description: 'Iconic beachfront parking in Rio',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address:
          'Av. Atlântica, Copacabana, Rio de Janeiro - RJ, 22070-012, Brazil',
        lat: -22.9711,
        lng: -43.1822,
      },
    },
  },
  {
    displayName: 'Christ the Redeemer Access',
    description: 'Parking for Corcovado mountain visits',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Cosme Velho, Rio de Janeiro - RJ, 22241-090, Brazil',
        lat: -22.9519,
        lng: -43.2105,
      },
    },
  },
  {
    displayName: 'Ipanema Beach Plaza',
    description: 'Upscale beach district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address:
          'Rua Visconde de Pirajá, Ipanema, Rio de Janeiro - RJ, 22410-002, Brazil',
        lat: -22.9838,
        lng: -43.2096,
      },
    },
  },
  {
    displayName: 'Santa Teresa Bohemian Quarter',
    description: 'Artistic neighborhood parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Santa Teresa, Rio de Janeiro - RJ, 20241-230, Brazil',
        lat: -22.9068,
        lng: -43.1729,
      },
    },
  },
  {
    displayName: 'Sugarloaf Cable Car Base',
    description: 'Tourist attraction parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Urca, Rio de Janeiro - RJ, 22290-240, Brazil',
        lat: -22.9483,
        lng: -43.1656,
      },
    },
  },
  {
    displayName: 'Barra da Tijuca Shopping',
    description: 'Modern district shopping center parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Barra da Tijuca, Rio de Janeiro - RJ, 22640-102, Brazil',
        lat: -23.0045,
        lng: -43.3646,
      },
    },
  },
  {
    displayName: 'Lapa Nightlife District',
    description: 'Entertainment area parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Lapa, Rio de Janeiro - RJ, 20230-060, Brazil',
        lat: -22.9099,
        lng: -43.1783,
      },
    },
  },
  {
    displayName: 'Maracanã Stadium Complex',
    description: 'Sports venue parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Maracanã, Rio de Janeiro - RJ, 20271-110, Brazil',
        lat: -22.9121,
        lng: -43.2302,
      },
    },
  },
  {
    displayName: 'Tijuca Forest Gateway',
    description: 'National park access parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Tijuca, Rio de Janeiro - RJ, 20520-051, Brazil',
        lat: -22.9249,
        lng: -43.2741,
      },
    },
  },
  {
    displayName: 'Centro Historical District',
    description: 'Historic downtown parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Centro, Rio de Janeiro - RJ, 20040-020, Brazil',
        lat: -22.9035,
        lng: -43.2096,
      },
    },
  },
]

// Cape Town Garages
export const capeTownGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'V&A Waterfront Marina',
    description: 'Premium waterfront shopping and dining parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'V&A Waterfront, Cape Town, 8001, South Africa',
        lat: -33.9022,
        lng: 18.4187,
      },
    },
  },
  {
    displayName: 'Table Mountain Cable Car',
    description: 'Iconic mountain attraction parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Table Mountain Rd, Cape Town, 8001, South Africa',
        lat: -33.9249,
        lng: 18.4241,
      },
    },
  },
  {
    displayName: 'Long Street Heritage District',
    description: 'Historic city center parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address:
          'Long St, Cape Town City Centre, Cape Town, 8001, South Africa',
        lat: -33.9211,
        lng: 18.4196,
      },
    },
  },
  {
    displayName: 'Camps Bay Beach Resort',
    description: 'Scenic beachfront parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Victoria Rd, Camps Bay, Cape Town, 8040, South Africa',
        lat: -33.9571,
        lng: 18.3782,
      },
    },
  },
  {
    displayName: 'Stellenbosch Wine Route',
    description: 'Wine country parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Stellenbosch, 7600, South Africa',
        lat: -33.9321,
        lng: 18.8602,
      },
    },
  },
  {
    displayName: 'Kirstenbosch Botanical Gardens',
    description: 'World heritage garden parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Rhodes Dr, Newlands, Cape Town, 7700, South Africa',
        lat: -33.9886,
        lng: 18.4338,
      },
    },
  },
  {
    displayName: 'Cape Point Nature Reserve',
    description: 'Southern tip of Africa parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Cape Point Rd, Cape Point, 8001, South Africa',
        lat: -34.357,
        lng: 18.4896,
      },
    },
  },
  {
    displayName: 'Sea Point Promenade',
    description: 'Atlantic seaboard parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Beach Rd, Sea Point, Cape Town, 8005, South Africa',
        lat: -33.9157,
        lng: 18.3845,
      },
    },
  },
  {
    displayName: 'Robben Island Ferry Terminal',
    description: 'Historic island ferry parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address:
          'Nelson Mandela Gateway, V&A Waterfront, Cape Town, 8001, South Africa',
        lat: -33.9068,
        lng: 18.4232,
      },
    },
  },
  {
    displayName: 'Constantia Wine Estates',
    description: 'Premium wine valley parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Constantia, Cape Town, 7806, South Africa',
        lat: -34.0337,
        lng: 18.42,
      },
    },
  },
]

// Moscow Garages
export const moscowGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Red Square Heritage Garage',
    description: 'Historic center parking near Kremlin',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Red Square, Moscow, 109012, Russia',
        lat: 55.7539,
        lng: 37.6208,
      },
    },
  },
  {
    displayName: 'GUM Department Store',
    description: 'Luxury shopping district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Red Square, 3, Moscow, 109012, Russia',
        lat: 55.7558,
        lng: 37.6211,
      },
    },
  },
  {
    displayName: 'Arbat Pedestrian Street',
    description: 'Cultural street parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Arbat St, Moscow, 119002, Russia',
        lat: 55.7521,
        lng: 37.5932,
      },
    },
  },
  {
    displayName: 'Moscow City Business Center',
    description: 'Modern financial district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Moscow City, Moscow, 123317, Russia',
        lat: 55.7558,
        lng: 37.5385,
      },
    },
  },
  {
    displayName: 'Gorky Park Recreation',
    description: 'Central park recreational parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Krymsky Val, 9, Moscow, 119049, Russia',
        lat: 55.7308,
        lng: 37.6014,
      },
    },
  },
  {
    displayName: 'Tretyakov Gallery District',
    description: 'Art museum quarter parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Lavrushinsky Ln, 10, Moscow, 119017, Russia',
        lat: 55.7416,
        lng: 37.6208,
      },
    },
  },
  {
    displayName: 'VDNKh Exhibition Center',
    description: 'Soviet-era exhibition parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Prospect Mira, 119, Moscow, 129223, Russia',
        lat: 55.8304,
        lng: 37.6278,
      },
    },
  },
  {
    displayName: 'Luzhniki Olympic Complex',
    description: 'Sports venue parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Luzhnetskaya Nab., 24, Moscow, 119048, Russia',
        lat: 55.7156,
        lng: 37.5515,
      },
    },
  },
  {
    displayName: 'Sokolniki Park Metro',
    description: 'Green space metro parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Sokolnicheskaya Sq., Moscow, 107014, Russia',
        lat: 55.7897,
        lng: 37.6703,
      },
    },
  },
  {
    displayName: 'Domodedovo Airport Access',
    description: 'International airport parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Domodedovo, Moscow Oblast, 142015, Russia',
        lat: 55.4087,
        lng: 37.9063,
      },
    },
  },
]

// Beijing Garages
export const beijingGarages: Prisma.GarageCreateInput[] = [
  {
    displayName: 'Forbidden City Heritage',
    description: 'Imperial palace parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '4 Jingshan Front St, Dongcheng, Beijing, 100009, China',
        lat: 39.9163,
        lng: 116.3972,
      },
    },
  },
  {
    displayName: 'Tiananmen Square Central',
    description: 'Historic square parking hub',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Tiananmen Square, Dongcheng, Beijing, 100006, China',
        lat: 39.9042,
        lng: 116.3976,
      },
    },
  },
  {
    displayName: 'Great Wall Badaling Access',
    description: 'World wonder access parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Badaling, Yanqing, Beijing, 102112, China',
        lat: 40.3584,
        lng: 116.0138,
      },
    },
  },
  {
    displayName: 'Wangfujing Shopping Street',
    description: 'Premier shopping district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Wangfujing St, Dongcheng, Beijing, 100006, China',
        lat: 39.9097,
        lng: 116.4074,
      },
    },
  },
  {
    displayName: 'Temple of Heaven Park',
    description: 'Ancient temple complex parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '1 Tiantan E Rd, Dongcheng, Beijing, 100050, China',
        lat: 39.8823,
        lng: 116.4066,
      },
    },
  },
  {
    displayName: 'CBD Business District',
    description: 'Central business district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Jianguomenwai St, Chaoyang, Beijing, 100020, China',
        lat: 39.9085,
        lng: 116.4561,
      },
    },
  },
  {
    displayName: 'Summer Palace Scenic',
    description: 'Imperial garden parking facility',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: '19 Xinjiangongmen Rd, Haidian, Beijing, 100091, China',
        lat: 39.999,
        lng: 116.2753,
      },
    },
  },
  {
    displayName: 'Hutong Cultural Quarter',
    description: 'Traditional alley district parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Nanluoguxiang, Dongcheng, Beijing, 100009, China',
        lat: 39.9368,
        lng: 116.4038,
      },
    },
  },
  {
    displayName: 'Olympic Park Sports Complex',
    description: '2008 Olympics venue parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Olympic Green, Chaoyang, Beijing, 100101, China',
        lat: 40.0031,
        lng: 116.3914,
      },
    },
  },
  {
    displayName: 'Beijing Capital Airport T3',
    description: 'International airport terminal parking',
    Company: { connect: { id: 1 } },
    images: { set: [getRandomImage()] },
    Slots: { create: getRandomSlots() },
    Address: {
      create: {
        address: 'Capital Airport, Chaoyang, Beijing, 100621, China',
        lat: 40.0799,
        lng: 116.6031,
      },
    },
  },
]

// Combine all garage arrays for easy export
export const allLocationGarages = [
  ...greaterNoidaGarages,
  ...newDelhiGarages,
  ...ghaziabadGarages,
  ...noidaGarages,
  ...badarpurGarages,
  ...faridabadGarages,
  ...chennaiGarages,
  ...londonGarages,
  ...parisGarages,
  ...berlinGarages,
  ...sydneyGarages,
  ...rioGarages,
  ...capeTownGarages,
  ...moscowGarages,
  ...beijingGarages,
]
