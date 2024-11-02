// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBmN7ZCNsp2w0S63c1oM9253yEKJpwhwUY',
  authDomain: 'vugo-6fdfc.firebaseapp.com',
  projectId: 'vugo-6fdfc',
  storageBucket: 'vugo-6fdfc.appspot.com',
  messagingSenderId: '935414459479',
  appId: '1:935414459479:web:3ef3d626af5cb7e0560712'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png",
    data: {
      url: payload.data?.url || "https://vugolive.com/", 
      icon: payload.data?.icon,
    },
  };
  
  console.log('gelen bildirim', notificationTitle);
  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received: ', event);
  
  event.notification.close(); 

  const urlToOpen = event.notification.data.url; 

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      // Sayfa açık değilse yeni bir sekmede aç
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

