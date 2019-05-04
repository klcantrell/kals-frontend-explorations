let deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
      console.log('service worker registered');
    })
    .catch(err => console.log(err));
}

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  console.log('before install prompt fired');
  deferredPrompt = e;
  return false;
});
