import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicModule, IonicErrorHandler } from "ionic-angular";
import { AppComponent } from "./app.component";
import { Keyboard } from "@ionic-native/keyboard";
import { ImagePicker } from "@ionic-native/image-picker";
import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "./components/components.module";
import { ElasticModule } from "ng-elastic";
import { IonicStorageModule } from "@ionic/storage";
import { WelcomePageModule } from "./pages/welcome/welcome.module";
import { AnimatorModule } from "css-animator";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Camera } from "@ionic-native/camera";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { DatabaseService } from "./services/database/database";
import { Config } from "../config";
import { Firebase } from "@ionic-native/firebase";
import { AuthService } from "./services/auth/auth";
import { FCM } from "@ionic-native/fcm";
import { MSAdal } from "@ionic-native/ms-adal";
import { MenuPageModule } from "./pages/menu/menu.module";
import { SharepointService } from "./services/sharepoint/sharepoint";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
import { DocumentViewer } from "@ionic-native/document-viewer";
import { FileOpener } from "@ionic-native/file-opener";
import { AppRoutingModule } from "./app-routing.module";
import { RouteReuseStrategy } from "@angular/router";
import { IonicRouteStrategy } from "@ionic/angular";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ElasticModule,
    AnimatorModule,
    MenuPageModule,
    WelcomePageModule,
    IonicStorageModule.forRoot({
      name: "tfgdb",
      driverOrder: ["indexeddb", "sqlite", "websql"]
    }),
    IonicModule.forRoot(AppComponent, {
      preloadModules: true,
      tabsHideOnSubPages: true,
      mode: "ios", // TODO: to have same iOS look for all platforms
      backButtonText: ""
    }),
    AngularFireModule.initializeApp(Config.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Keyboard,
    ImagePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Firebase,
    FCM,
    DatabaseService,
    AuthService,
    SharepointService,
    MSAdal,
    InAppBrowser,
    Camera,
    DocumentViewer,
    File,
    FileTransfer,
    FileOpener
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
