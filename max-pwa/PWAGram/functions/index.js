const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

const serviceAccount = require('./firebase-credentials.json');

admin.initializeApp({
  databaseURL: 'https://pwagram-d5dac.firebaseio.com/',
  credential: admin.credential.cert(serviceAccount),
});

exports.storePostData = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { id, title, location, image } = req.body;
    admin
      .database()
      .ref('posts')
      .push({
        id,
        title,
        location,
        image,
      })
      .then(() => {
        res.status(201).json({ message: 'Data stored', id });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
});
