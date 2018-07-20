import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { Keyboard } from "@ionic-native/keyboard";
import { ImagePicker } from "@ionic-native/image-picker";
import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "../components/components.module";
import { ElasticModule } from "ng-elastic";
import { DirectivesModule } from "../directives/directives.module";
import { IonicStorageModule } from "@ionic/storage";
import { TabsPage } from "../pages/tabs/tabs";
import { WelcomePageModule } from "../pages/welcome/welcome.module";
import { AnimatorModule } from 'css-animator';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Camera } from "@ionic-native/camera";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireAuthModule } from "angularfire2/auth";
import { DatabaseProvider } from "../providers/database/database";
import { Config } from "../config";
import { Firebase } from "@ionic-native/firebase";
import { AuthProvider } from "../providers/auth/auth";
import { FCM } from "@ionic-native/fcm";
import { MSAdal } from "@ionic-native/ms-adal";
import { MenuPageModule } from "../pages/menu/menu.module";
import { SharepointProvider } from "../providers/sharepoint/sharepoint";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';

@NgModule({
  declarations: [MyApp, TabsPage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    DirectivesModule,
    ElasticModule,
    AnimatorModule,
    MenuPageModule,
    WelcomePageModule,
    IonicStorageModule.forRoot({
      name: 'tfgdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp, {
      preloadModules: true,
      tabsHideOnSubPages: true,
      mode: "ios", // TODO: to have same iOS look for all platforms
      backButtonText: ""
    }),
    AngularFireModule.initializeApp(Config.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ImagePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Firebase,
    FCM,
    DatabaseProvider,
    AuthProvider,
    SharepointProvider,
    MSAdal,
    InAppBrowser,
    Camera,
    DocumentViewer,
    File,
    FileTransfer,
    FileOpener
  ]
})
export class AppModule {}
