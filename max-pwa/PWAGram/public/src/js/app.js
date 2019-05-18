let deferredPrompt;
const enableNotificationButtons = document.querySelectorAll(
  '.enable-notifications'
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
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
  const options = {
    body: 'Thanks for subscribing!',
  };
  new Notification('Successfully subscribed!', options);
}

function askForNotificationPermission() {
  Notification.requestPermission(result => {
    console.log('User Choice', result);
    if (result !== 'granted') {
      console.log('No notification permission granted!');
    } else {
      displayConfirmNotification();
    }
  });
}

if ('Notification' in window) {
  enableNotificationButtons.forEach(enableNotificationButton => {
    enableNotificationButton.style.display = 'inline-block';
    enableNotificationButton.addEventListener(
      'click',
      askForNotificationPermission
    );
  });
}
