const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const webpush = require('web-push');
const UUID = require('uuid');
const fs = require('fs');
const os = require('os');
const Busboy = require('busboy');
const path = require('path');

const serviceAccount = require('./firebase-credentials.json');

admin.initializeApp({
  databaseURL: 'https://pwagram-d5dac.firebaseio.com/',
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'pwagram-d5dac.appspot.com',
});

exports.storePostData = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const uuid = UUID();
    const formData = new formidable.IncomingForm();
    const busboy = new Busboy({ headers: req.headers });
    // These objects will store the values (file + fields) extracted from busboy
    let upload;
    const fields = {};

    // This callback will be invoked for each file uploaded
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log(
        `File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
      );
      const filepath = path.join(os.tmpdir(), filename);
      upload = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    // This will invoked on every field detected
    busboy.on('field', function(
      fieldname,
      val,
      fieldnameTruncated,
      valTruncated,
      encoding,
      mimetype
    ) {
      fields[fieldname] = val;
    });

    // This callback will be invoked after all uploaded files are saved.
    busboy.on('finish', () => {
      bucket.upload(
        '/tmp/' + files.file.name,
        {
          uploadType: 'media',
          metadata: {
            metadata: {
              contentType: files.file.type,
              firebaseStorageDownloadTokens: uuid,
            },
          },
        },
        (err, file) => {
          if (!err) {
            admin
              .database()
              .ref('posts')
              .push({
                id,
                title,
                location,
                image:
                  'https://firebasestorage.googleapis.com/v0/b' +
                  bucket.name +
                  '/o/' +
                  encodeURIComponent(file.name) +
                  '?alt=media&token=' +
                  uuid,
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
                        content: 'A new post was added!',
                        openUrl: '/help',
                      })
                    )
                    .catch(console.log);
                });
                res.status(201).json({ message: 'Data stored', id });
              })
              .catch(err => {
                res.status(500).json({ error: err });
              });
          } else {
            console.log(err);
          }
        }
      );
    });

    // The raw bytes of the upload will be in request.rawBody.  Send it to busboy, and get
    // a callback when it's finished.
    busboy.end(request.rawBody);
    // formData.parse(request, function(err, fields, files) {
    //   fs.rename(files.file.path, "/tmp/" + files.file.name);
    //   var bucket = gcs.bucket("YOUR_PROJECT_ID.appspot.com");
    // });
  });
});
