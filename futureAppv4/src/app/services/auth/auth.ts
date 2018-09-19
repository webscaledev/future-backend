import { Injectable } from "@angular/core";
import { Platform, Loading } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AngularFireAuth } from "angularfire2/auth";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import * as firebase from "firebase/app";
import {
  MSAdal,
  AuthenticationContext,
  AuthenticationResult
} from "@ionic-native/ms-adal";
import { Observable } from "rxjs/Observable";
import { switchMap, first } from "rxjs/operators";
import { Config } from "../../config";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { fromPromise } from "rxjs/observable/fromPromise";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { Client as GraphClient } from "@microsoft/microsoft-graph-client";
import { LoadingController } from "@ionic/angular";

@Injectable({ providedIn: 'root' })
export class AuthProvider {
  user: Observable<any>;
  _aadAuthContext: AuthenticationContext = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private platform: Platform,
    private msAdal: MSAdal,
    private http: HttpClient,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {
    // afs.firestore.settings({ timestampsInSnapshots: true });
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const validateToken = localStorage.getItem("token");
          const helper = new JwtHelperService();
          if (helper.isTokenExpired(validateToken)) {
            this.azureLogin();
          }
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      })
    );
    if (this.platform.is("core")) {
      //check for id_token or access_token in url
      if (this.params["id_token"] != null) this.getAccessToken();
      else if (this.params["access_token"] != null)
        this.access_token = this.params["access_token"];
    }
  }

  // Private function to get authentication context using ADAL
  ensureContext() {
    return new Promise((resolve, reject) => {
      // Check if aadAuthContext is already initialized
      if (this._aadAuthContext == null) {
        // aadAuthContext is null...initialize it
        let authority = Config.azure.AUTHORITY_URL;
        this._aadAuthContext = this.msAdal.createAuthenticationContext(
          authority,
          false
        );
        resolve(this._aadAuthContext);
      } else {
        // aadAuthContext is already initialized so resolve in promise
        resolve(this._aadAuthContext);
      }
    });
  }

  // Private function to get access token for a specific resource using ADAL
  getTokenForResource() {
    return new Promise<any>((resolve, reject) => {
      this.ensureContext().then((context:AuthenticationContext) => {
        // First try to get the token silently
        this.getTokenForResourceSilent(context).then(
          (authResponse: AuthenticationResult) => {
            // We were able to get the token silently...return it
            resolve({
              loggedIn: true,
              userId: authResponse.userInfo.userId,
              familyName: authResponse.userInfo.familyName,
              givenName: authResponse.userInfo.givenName,
              passwordChangeUrl: authResponse.userInfo.passwordChangeUrl,
              passwordExpiresOn: authResponse.userInfo.passwordExpiresOn,
              token: authResponse.accessToken
            });
          },
          err => {
            // We failed to get the token silently...try getting it with user interaction
            this._aadAuthContext
              .acquireTokenAsync(
                Config.azure.RESOURCE_URL,
                Config.azure.APP_ID,
                Config.azure.REDIRECT_URL,
                null,
                null
              )
              .then(
                (authResponse: AuthenticationResult) => {
                  // Resolve the promise with the token
                  resolve({
                    loggedIn: true,
                    userId: authResponse.userInfo.userId,
                    familyName: authResponse.userInfo.familyName,
                    givenName: authResponse.userInfo.givenName,
                    passwordChangeUrl: authResponse.userInfo.passwordChangeUrl,
                    passwordExpiresOn: authResponse.userInfo.passwordExpiresOn,
                    token: authResponse.accessToken
                  });
                },
                err => {
                  // Reject the promise
                  reject("Error getting token");
                }
              );
          }
        );
      });
    });
  }

  // Private function to get access token for a specific resource silent using ADAL
  getTokenForResourceSilent(context:AuthenticationContext) {
    return new Promise<AuthenticationResult>((resolve, reject) => {
      // read the tokenCache
      context.tokenCache.readItems().then(
        cacheItems => {
          // get userId from first cached token
          let user_id;
          if (cacheItems.length > 1) {
            user_id = cacheItems[0].userInfo.userId;
            console.log('SILENT_USER_ID', user_id);
          }
          context
            .acquireTokenSilentAsync(Config.azure.RESOURCE_URL, Config.azure.APP_ID, user_id)
            .then(
              (authResult: AuthenticationResult) => {
                // Resolve the authResult from the silent token call
                resolve(authResult);
              },
              err => {
                // Error getting token silent...reject the promise
                reject("Error getting token silent");
              }
            );
        },
        err => {
          // Error getting cached data...reject the promise
          reject("Error reading token cache");
        }
      );
    });
  }

  //// AZURE ////
  // Try signin
  async azureLogin() {
    let result: any = {};
    const url = Config.firebase.tokenFunction;
    const helper = new JwtHelperService();
    let response = await this.getTokenForResource();
    const decodedToken = helper.decodeToken(response.token);
    const request = {
      uid: decodedToken.puid,
      name: decodedToken.name,
      email: decodedToken.unique_name
    };
    // console.log('RESPONSE TOKEN', JSON.stringify(response.token));
    // this.storage.set('token', authResponse.accessToken);
    localStorage.setItem("token", response.token);
    result = await this.http.post(url, request).toPromise();

    const firebaseUser = await firebase
      .auth()
      .signInWithCustomToken(result.authToken);

    return this.updateUserData(firebaseUser);
  }

  //function to parse the url query string
  private parseQueryString = function(url) {
    var params = {},
      queryString = url.substring(1),
      regex = /([^&=]+)=([^&]*)/g,
      m;
    while ((m = regex.exec(queryString))) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
  };
  private params = this.parseQueryString(location.hash);
  public access_token: string = null;

  // Save custom user data in Firestore
  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const accessToken = localStorage.getItem("token");
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      accessToken: accessToken
    };
    return userRef.set(data, { merge: true });
  }

  //// HELPERS ////
  async logout(): Promise<any> {
    this.ensureContext().then((context: AuthenticationContext) => {
      context.tokenCache.clear();
    });
    localStorage.clear();
    return this.afAuth.auth.signOut();
  }

  // Current user as a Promise. Useful for one-off operations.
  async getCurrentUser(): Promise<any> {
    return this.user.pipe(first()).toPromise();
  }

  async login() {
    //redirect to get id_token
   window.location.href =
      await Config.azure.AUTHORITY_URL +
      "/oauth2/authorize?response_type=id_token&client_id=" +
      Config.azure.APP_ID +
      "&redirect_uri=" +
      Config.azure.REDIRECT_URL_BROWSER + "&scope=openid";
  }

  getAccessToken() {
    if (this.platform.is("core")) {
      //redirect to get access_token
      return (window.location.href =
        Config.azure.AUTHORITY_URL +
        "/oauth2/authorize?response_type=token&client_id=" +
        Config.azure.APP_ID +
        "&resource=" +
        Config.azure.RESOURCE_URL +
        "&redirect_uri=" +
        encodeURIComponent(window.location.href));
    }
    return localStorage.getItem("token");
    //  return Observable.fromPromise(this.storage.get('token'));
  }

  // Current user as boolean Promise. Used in router guards
  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}
