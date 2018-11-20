const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');

const serviceAccount = require('./react-native-practical-firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: functions.config().gcp.bucket_name,
});

const bucket = admin.storage().bucket();

exports.storeImage = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer ')
    ) {
      console.log('No token present');
      return response.status(403).json({ error: 'Unauthorized' });
    }
    const idToken = request.headers.authorization.split('Bearer ')[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const uuid = UUID();
        const body = JSON.parse(request.body);
        fs.writeFileSync(
          '/tmp/uploaded-image.jpg',
          body.image,
          'base64',
          err => {
            console.log(err);
            return response.status(500).json({ error: err });
          }
        );
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
                    imagePath: `/places/${uuid}.jpg`,
                  });
                });
            } else {
              console.log(err);
              return response.status(500).json({ error: err });
            }
          }
        );
      })
      .catch(err => {
        return response.status(403).json({ error: 'Unauthorized' });
      });
  });
});

exports.deleteImage = functions.database
  .ref('/places/{placeId}')
  .onDelete(snapshot => {
    const imagePath = snapshot.val().imagePath;

    return bucket.file(imagePath).delete();
  });
