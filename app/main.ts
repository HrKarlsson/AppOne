import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";


import firebase = require("nativescript-plugin-firebase");


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
