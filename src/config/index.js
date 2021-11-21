/* global process */

export default {
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
  floorImageScale: 0.02,
  	
  // Size of floor plan image (in pixels)
  floorImageSize: {
    height: 4800,
    width: 7600
  }
}
