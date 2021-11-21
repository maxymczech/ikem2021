/* global process */

export default {
  // List of buildings
  buildings: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],

  // Firebase config
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  },

  // Number of floors in the building
  floorCount: 5,

  // Meters per pixel
  // 470 px mapped to 9.45 meters on the floor plan
  floorImageScale: 0.02,
  	
  // Size of floor plan image (in pixels)
  floorImageSize: {
    height: 4800,
    width: 7600
  },

  // Icon config
  icons: {
    default: {
      iconSize: [16, 16],
      iconUrl: '/images/icons/default.png',
      iconAnchor: [8, 8],
    },

    elevator: {
      iconSize: [32, 48],
      iconUrl: '/images/icons/elevator.png',
      iconAnchor: [16, 48],
    },

    fire: {
      iconSize: [37, 48],
      iconUrl: '/images/icons/fire.png',
      iconAnchor: [19, 48],
    },

    'fire-button': {
      iconSize: [32, 34],
      iconUrl: '/images/icons/fire-button.png',
      iconAnchor: [16, 34],
    },

    'fire-extinguisher': {
      iconSize: [34, 48],
      iconUrl: '/images/icons/fire-extinguisher.png',
      iconAnchor: [17, 48],
    },

    'ikemka-1': {
      iconSize: [32, 54],
      iconUrl: '/images/icons/ikemka-1.png',
      iconAnchor: [16, 54],
    },

    'ikemka-2': {
      iconSize: [32, 54],
      iconUrl: '/images/icons/ikemka-2.png',
      iconAnchor: [16, 54],
    },

    'ikemka-3': {
      iconSize: [32, 54],
      iconUrl: '/images/icons/ikemka-3.png',
      iconAnchor: [16, 54],
    },

    'ikemka-4': {
      iconSize: [32, 54],
      iconUrl: '/images/icons/ikemka-4.png',
      iconAnchor: [16, 54],
    },

    'ikemka-5': {
      iconSize: [32, 54],
      iconUrl: '/images/icons/ikemka-5.png',
      iconAnchor: [16, 54],
    },

    'ikemka-6': {
      iconSize: [32, 54],
      iconUrl: '/images/icons/ikemka-6.png',
      iconAnchor: [16, 54],
    },
    stairs: {
      iconSize: [60, 60],
      iconUrl: '/images/icons/stairs.png',
      iconAnchor: [30, 30],
    }
  },

  // Type of map
  nodeTypes: ['intermediate', 'destination'],

  // Line thickness for route plotting, in pixels
  routeLineThickness: 6,

  // Voice assistant phrases
  voiceAssistant: {
    arrived: {
      cz: 'You have arrived at your destination!',
      en: 'Dorazili jste do cíle!'
    },
    elevator: {
      cz: 'Use elevator to go to floor number %d',
      en: 'Použijte výtah pro jízdu do patra číslo %d'
    },
    goStraight: {
      cz: 'Go straight for approximately %d meters',
      en: 'Jděte rovně přibližně %d metrů'
    },
    stairsDown: {
      cz: 'Walk down the stairs to floor number %d',
      en: 'Sejděte po schodech do patra číslo %d'
    },
    stairsUp: {
      cz: 'Walk up the stairs to floor number %d',
      en: 'Vyjděte po schodech do patra číslo %d'
    },
    turnLeft: {
      cz: 'Turn left',
      en: 'Otočte se doleva'
    },
    turnRight: {
      cz: 'Turn right',
      en: 'Otočte se vpravo'
    },
  }
}
