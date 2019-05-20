const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const webpush = require('web-push');

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
        webpush.setVapidDetails(
          'mailto:cantrellkalalau@gmail.com',
          'BBYbcjBB7fQYmdLLyxfnV-ILAx4XKSboWsWxi52KFSKQoBchnEYPWb8MDymOlmBcdmcjC_OUA9OWvPmRztdNN2M',
          'CfN6DwANvkvykDhxiAA786gA6MvTgUzOKd_SOvw7dBM'
        );
        return admin
          .database()
          .ref('subscriptions')
          .once('value');
      })
      .then(subscriptions => {
        subscriptions.forEach(sub => {
          const pushConfig = {
            endpoint: sub.val().endpoint,
            keys: {
              auth: sub.val().keys.auth,
              p256dh: sub.val().keys.p256dh,
            },
          };

          webpush
            .sendNotification(
              pushConfig,
              JSON.stringify({
                title: 'New Post',
                content: 'New Post Added!',
              })
            )
            .catch(console.log);
        });
        res.status(201).json({ message: 'Data stored', id });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
});
