import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";


import firebase = require("nativescript-plugin-firebase");
import * as LocalNotifications from "nativescript-local-notifications";


//firebase.addValueEventListener((result: any) => {
//}, "/example");


firebase.init({
  persist: true
}).then(
  function (instance) {
    console.log("firebase.init done");

    firebase.login({
      type: firebase.LoginType.PASSWORD,
      email: 'mario.roskosch@assfinet.de',
      password: 'Keines:78m'
    }).then(
      function (result) {
        // the result object has these properties: uid, provider, expiresAtUnixEpochSeconds, profileImageURL, token
        console.log(JSON.stringify(result));


        firebase.setValue(
          '/companies',
          { foo: 'bar' }
        );

        console.log("add event");
        firebase.addOnMessageReceivedCallback(function (message) {
          console.log("log event");
          console.log(message);


          LocalNotifications.schedule([{
            id: 1,
            title: 'The title',
            body: 'Recurs every minute until cancelled',
            ticker: 'The ticker',
            badge: 1,
            ongoing: true, // makes the notification ongoing (Android only)
            smallIcon: 'res://heart.png',
            interval: 'minute',
            sound: null, // suppress the default sound
            at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
          }]).then(
            function () {
              console.log("Notification scheduled");
            },
            function (error) {
              console.log("scheduling error: " + error);
            }
            )



        });


      },
      function (errorMessage) {
        console.log("error " + errorMessage);
      }
      );





  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
  );



platformNativeScriptDynamic().bootstrapModule(AppModule);
