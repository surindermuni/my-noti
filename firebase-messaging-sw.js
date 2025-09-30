// Import Firebase scripts (Service Worker compatible)
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js");

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDeIxJDrJrCeUl176VMCUfCrSxV5SgptW8",
  authDomain: "silentcomments.firebaseapp.com",
  projectId: "silentcomments",
  storageBucket: "silentcomments.firebasestorage.app",
  messagingSenderId: "986211393111", // 👈 ye numeric ID hoga
  appId: "1:986211393111:web:79b34f775007a6f7bfcd12"
});

// Initialize Messaging
const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message received: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/favicon.ico",
    data: { url: payload.data?.url || "/" } // custom data se URL pass karna
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url) // 👈 notification click par post open hoga
  );
});
