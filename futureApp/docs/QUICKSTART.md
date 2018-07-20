## Install Steps

If only targeting the web, you can skip steps 2 and 3 below. 

### Ionic App

0. `git clone` this repo, cd into it, and run `npm install`
1. Add your Firebase web config to the `config.ts`
2. Save `google-services.json` and `GoogleService-Info.plist` from Firebase to the project root.
3. Run `ionic cordova emulate android -l -c` or (ios) to run the app

### Cloud Functions Deployment

Cloud functions handle backend tasks, such as push notifications and data aggregation.

0. `cd functions`
1. `npm install`
2. `firebase deploy --only functions`