import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const serviceAccount = require("../service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import * as CORS from "cors";
const cors = CORS({ origin: true });

// Use the code returned from Azure to mint a custom auth token in Firebase
export const token = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    return mintAuthToken(req)
      .then(authToken => res.json({ authToken }))
      .catch(err => console.log(err));
  });
});

////// Async Helper Functions //////
async function mintAuthToken(req): Promise<string> {
  // The UID and other things we'll assign to the user.
  const uid = req.body.uid;
  const additionalClaims = {
    name: req.body.name,
    email: req.body.email,
    emailVerified: true
  };

  // Create or update the user account.
  const userCreationTask = await admin
    .auth()
    .updateUser(uid, additionalClaims)
    .catch(error => {
      // If user does not exists we create it.
      if (error.code === "auth/user-not-found") {
        console.log(
          `Created user with UID:${uid}, Name: ${
            additionalClaims.name
          } and e-mail: ${additionalClaims.email}`
        );
        return admin.auth().createUser({
          uid: uid,
          displayName: additionalClaims.name,
          email: additionalClaims.email,
          emailVerified: true
        });
      }
      throw error;
    });

  // Wait for all async task to complete then generate and return a custom auth token.
  return Promise.all([userCreationTask]).then(() => {
    // Create a Firebase custom auth token.
    return admin.auth().createCustomToken(uid,additionalClaims);
  // tslint:disable-next-line:no-shadowed-variable
  }).then((token) => {
    console.log('Created Custom token for UID "', uid, '" Token:', token);
    return token;
  });
}

// Validate the Firebase auth header to authenticate the user
async function verifyUser(req): Promise<string> {
  let authToken = req.headers.authorization as string;
  authToken = authToken.split("Bearer ")[1];

  const verifiedToken = await admin.auth().verifyIdToken(authToken);

  return verifiedToken.uid;
}
