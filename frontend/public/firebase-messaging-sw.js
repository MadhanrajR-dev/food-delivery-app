// Import Firebase libraries for service worker (compat mode)
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

// Initialize Firebase app in service worker
firebase.initializeApp({
  apiKey: "AIzaSyDE4xWfxbTixFzqsQWzEjtnY3kSa0ruHWM",
  authDomain: "food-del-madhan.firebaseapp.com",
  projectId: "food-del-madhan",
  storageBucket: "food-del-madhan.firebasestorage.app",
  messagingSenderId: "990547717917",
  appId: "1:990547717917:web:948b1be4efdb270ae7bbf4",
  measurementId: "G-1KQ862JDDH" // optional, but good to include
});

// Get Firebase Messaging instance
const messaging = firebase.messaging(); 

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/firebase-logo.png', // optional icon
  };

  
  self.registration.showNotification(notificationTitle, notificationOptions);
});
