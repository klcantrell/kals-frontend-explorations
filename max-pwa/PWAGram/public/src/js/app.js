let deferredPrompt;
const enableNotificationButtons = document.querySelectorAll(
  '.enable-notifications'
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => {
      console.log('service worker registered');
    })
    .catch(console.log);
}

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  console.log('before install prompt fired');
  deferredPrompt = e;
  return false;
});

function displayConfirmNotification() {
  if ('serviceWorker' in navigator) {
    const options = {
      body: 'Thanks for subscribing!',
      icon: '/src/images/icons/app-icon-96x96.png',
      image: '/src/images/sf-boat.jpg',
      dir: 'ltr',
      lang: 'en-US', // BCP 47
      vibrate: [100, 50, 200],
      badge: '/src/images/icons/app-icon-96x96.png',
      tag: 'confirm-notification',
      renotify: false,
      actions: [
        {
          action: 'confirm',
          title: 'Okay',
          icon: '/src/images/icons/app-icon-96x96.png',
        },
        {
          action: 'cancel',
          title: 'Cancel',
          icon: '/src/images/icons/app-icon-96x96.png',
        },
      ],
    };
    navigator.serviceWorker.ready.then(swReg => {
      swReg.showNotification('Successfully subscribed!', options);
    });
  }
}

function configurePushSub() {
  if (!('serviceWorker' in navigator)) {
    return;
  }
  let reg;
  navigator.serviceWorker.ready
    .then(swReg => {
      reg = swReg;
      return swReg.pushManager.getSubscription();
    })
    .then(sub => {
      if (sub === null) {
        const vapidPublicKey =
          'BBYbcjBB7fQYmdLLyxfnV-ILAx4XKSboWsWxi52KFSKQoBchnEYPWb8MDymOlmBcdmcjC_OUA9OWvPmRztdNN2M';
        const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey,
        });
      } else {
      }
    })
    .then(newSub => {
      return fetch('https://pwagram-d5dac.firebaseio.com/subscriptions.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newSub),
      });
    })
    .then(res => {
      if (res.ok) {
        displayConfirmNotification();
      }
    })
    .catch(console.log);
}

function askForNotificationPermission() {
  Notification.requestPermission(result => {
    console.log('User Choice', result);
    if (result !== 'granted') {
      console.log('No notification permission granted!');
    } else {
      configurePushSub();
    }
  });
}

if ('Notification' in window && 'serviceWorker' in navigator) {
  enableNotificationButtons.forEach(enableNotificationButton => {
    enableNotificationButton.style.display = 'inline-block';
    enableNotificationButton.addEventListener(
      'click',
      askForNotificationPermission
    );
  });
}
