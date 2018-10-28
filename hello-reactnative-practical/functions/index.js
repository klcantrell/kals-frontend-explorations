const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');

const serviceAccout = require('./react-native-practical-firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccout),
  storageBucket: functions.config().gcp.bucket_name,
});

const bucket = admin.storage().bucket();

const uuid = UUID();

exports.storeImage = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const body = JSON.parse(request.body);
    fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
      console.log(err);
      return response.status(500).json({ error: err });
    });
    return bucket.upload(
      '/tmp/uploaded-image.jpg',
      {
        uploadType: 'media',
        destination: `/places/${uuid}.jpg`,
        metadata: {
          contentType: 'image/jpeg',
        },
      },
      (err, file) => {
        if (!err) {
          return file
            .getSignedUrl({
              action: 'read',
              expires: '01/01/3000',
            })
            .then(signedUrls => {
              return response.status(201).json({
                imageUrl: signedUrls[0],
              });
            });
        } else {
          console.log(err);
          return response.status(500).json({ error: err });
        }
      }
    );
  });
});
