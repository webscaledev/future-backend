## Install Steps

If only targeting the web, you can skip steps 2 and 3 below. 

### Ionic App

0. `git clone` this repo, cd into it, and run `npm install`
1. Add your Firebase web config to the `config.ts`
example `config.ts` : 

```
export const Config = {
  azure: {
    TENANT_NAME: '<<TENANT_ID>>',
    APP_ID: '<<AZURE APP ID>>',
    REDIRECT_URL: '<<REDIRECT_URI>>',
    REDIRECT_URL_BROWSER: '<<REDIRECT_URI_BROWSER>>',
    RESOURCE_URL: 'https://graph.microsoft.com/',
    AUTHORITY_URL: 'https://login.windows.net/common',
    GRAPH_SCOPES: '{ "Files.Read.All","Sites.Read.All"}',
    graphApiVersion: '2013-11-08',
    allUsers: 'https://graph.microsoft.com/v1.0/users'
  },
  firebase: {
    apiKey: '<<YOUR_API_KEY>>',
    authDomain: '<<YOUR_DOMAIN>>',
    databaseURL: '<<FIREBASE_DB_URL>>',
    projectId: '<<PROJECT_ID>>',
    storageBucket: '<<YOUR_STORAGE_BUCKET>>',
    messagingSenderId: '<<MSG_SENDER_ID>>',
    tokenFunction: '<<CLOUD_FUNCTION_TOKEN>>'
  },
  sharepoint:{
     <<SHAREPOINT ENDPOINTS>>
  }
};
```

2. Save `google-services.json` and `GoogleService-Info.plist` from Firebase to the project root.
3. Run `ionic cordova emulate android -l -c` or (ios) to run the app

### Cloud Functions Deployment

Cloud functions handle backend tasks, such as push notifications and data aggregation.

0. `cd functions`
1. `npm install`
2. `firebase deploy --only functions`