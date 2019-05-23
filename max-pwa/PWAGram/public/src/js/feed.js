const USER_REQUESTED_CACHE = 'user-requested-v1';

const shareImageButton = document.querySelector('#share-image-button');
const createPostArea = document.querySelector('#create-post');
const closeCreatePostModalButton = document.querySelector(
  '#close-create-post-modal-btn'
);
const sharedMomentsArea = document.querySelector('#shared-moments');
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const locationInput = document.querySelector('#location');
const snackbarContainer = document.querySelector('#confirmation-toast');
const videoPlayer = document.querySelector('#player');
const canvasElement = document.querySelector('#canvas');
const captureButton = document.querySelector('#capture-btn');
const imagePicker = document.querySelector('#image-picker');
const imagePickerArea = document.querySelector('#pick-image');

let picture;

function initializeMedia() {
  if (!'mediaDevices' in navigator) {
    navigator.mediaDevices;
  }
  if (!('getUserMedia' in navigator.mediaDevices)) {
    navigator.mediaDevices.getUserMedia = constraints => {
      const getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented'));
      }

      return new Promise((resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      videoPlayer.srcObject = stream;
      videoPlayer.style.display = 'block';
    })
    .catch(err => {
      imagePickerArea.style.display = 'block';
    });
}

captureButton.addEventListener('click', e => {
  canvasElement.style.display = 'block';
  videoPlayer.style.display = 'none';
  captureButton.style.display = 'none';
  const context = canvasElement.getContext('2d');
  context.drawImage(
    videoPlayer,
    0,
    0,
    canvasElement.width,
    videoPlayer.videoHeight / (videoPlayer.videoWidth / canvasElement.width)
  );
  videoPlayer.srcObject.getVideoTracks().forEach(track => track.stop());
  picture = dataURItoBlob(canvasElement.toDataURL());
});

function openCreatePostModal() {
  createPostArea.classList.add('create-post--show');
  initializeMedia();
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
      console.log(choiceResult.outcome);
      if (choiceResult.outcome === 'dismissed') {
        console.log('user cancelled installation');
      } else {
        console.log('user added to homescreen');
      }
      deferredPrompt = null;
    });
  }

  // example on how to remove all service workers
  // if ('serviceWorker' in navigator) {
  //   console.log('service worker here?');
  //   navigator.serviceWorker.getRegistrations().then(registrations => {
  //     registrations.forEach(registration => {
  //       console.log('unregistering service worker');
  //       registration.unregister();
  //     });
  //   });
  // }
}

function closeCreatePostModal() {
  createPostArea.classList.remove('create-post--show');
  imagePickerArea.style.display = 'none';
  videoPlayer.style.display = 'none';
  canvasElement.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

// could be used to dynamically cache an asset on demand
function handleSaveButtonClicked(e) {
  console.log('save button clicked');
  if ('caches' in window) {
    caches.open(USER_REQUESTED_CACHE).then(cache => {
      cache.add('https://httpbin.org/get');
      cache.add('/src/images/sf-boat.jpg');
    });
  } else {
    alert("You don't have the ability to save offline");
  }
}

function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard(data) {
  const cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  const cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = `url(${data.image})`;
  cardTitle.style.backgroundSize = 'cover';
  cardWrapper.appendChild(cardTitle);
  const cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = data.title;
  cardTitleTextElement.style.color = 'white';
  cardTitle.appendChild(cardTitleTextElement);
  const cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = data.location;
  cardSupportingText.style.textAlign = 'center';
  // const cardSaveButton = document.createElement('button');
  // cardSaveButton.textContent = 'Save';
  // cardSaveButton.addEventListener('click', handleSaveButtonClicked);
  // cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

function updateUi(data) {
  clearCards();
  data.forEach(cardData => {
    createCard(cardData);
  });
}

function mapFirebaseResponseToArray(data) {
  const dataArray = [];
  for (const key in data) {
    dataArray.push(data[key]);
  }
  return dataArray;
}

const url = 'https://pwagram-d5dac.firebaseio.com/posts.json';
let networkDataReceived = false;

// fake dynamic content
fetch(url)
  .then(res => res.json())
  .then(data => {
    networkDataReceived = true;
    console.log('From web', data);
    const dataArray = mapFirebaseResponseToArray(data);
    updateUi(dataArray);
  });

if ('indexedDB' in window) {
  readAllData('posts').then(data => {
    if (!networkDataReceived) {
      console.log('From cache', data);
      updateUi(data);
    }
  });
}

function sendData() {
  fetch(url, {
    const id = new Date().toISOString();
    const postData = new FormData();
    postData.append('id', id);
    postData.append('title', titleInput.value);
    postData.append('location', locationInput.value);
    postData.append('file', picture, id + '.png');
    method: 'POST',
    body: postData,
  }).then(res => {
    console.log('Sent data', res);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (titleInput.value.trim() === '' || locationInput.value.trim() === '') {
    alert('Please enter valid data');
    return;
  }

  closeCreatePostModal();

  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(sw => {
      const post = {
        id: new Date().toISOString(),
        title: titleInput.value,
        location: locationInput.value,
        picture,
      };
      writeData('sync-posts', post)
        .then(() => {
          sw.sync.register('sync-new-posts');
        })
        .then(() => {
          const data = { message: 'Your post was saved for syncing!' };
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        })
        .catch(err => console.log(err));
    });
  } else {
    sendData();
  }
});
