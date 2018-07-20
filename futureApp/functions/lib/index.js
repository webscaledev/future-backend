"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("../service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const CORS = require("cors");
const cors = CORS({ origin: true });
// Use the code returned from Azure to mint a custom auth token in Firebase
exports.token = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        return mintAuthToken(req)
            .then(authToken => res.json({ authToken }))
            .catch(err => console.log(err));
    });
});
////// Async Helper Functions //////
function mintAuthToken(req) {
    return __awaiter(this, void 0, void 0, function* () {
        // The UID and other things we'll assign to the user.
        const uid = req.body.uid;
        const additionalClaims = {
            name: req.body.name,
            email: req.body.email,
            emailVerified: true
        };
        // Create or update the user account.
        const userCreationTask = yield admin
            .auth()
            .updateUser(uid, additionalClaims)
            .catch(error => {
            // If user does not exists we create it.
            if (error.code === "auth/user-not-found") {
                console.log(`Created user with UID:${uid}, Name: ${additionalClaims.name} and e-mail: ${additionalClaims.email}`);
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
            return admin.auth().createCustomToken(uid, additionalClaims);
            // tslint:disable-next-line:no-shadowed-variable
        }).then((token) => {
            console.log('Created Custom token for UID "', uid, '" Token:', token);
            return token;
        });
    });
}
// Validate the Firebase auth header to authenticate the user
function verifyUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let authToken = req.headers.authorization;
        authToken = authToken.split("Bearer ")[1];
        const verifiedToken = yield admin.auth().verifyIdToken(authToken);
        return verifiedToken.uid;
    });
}
//# sourceMappingURL=index.js.map