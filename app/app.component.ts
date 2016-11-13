import { Component, OnInit } from "@angular/core";
import { HostService, Message } from "./HostService";

@Component({
  moduleId: module.id,
  selector: "my-app",
  providers: [HostService],
  templateUrl: 'app.html' 
})

export class AppComponent implements OnInit {
  messages: Array<Message>;
  currentUser: string;

  constructor(private _HostService: HostService) {
    this.messages = [];
    _HostService.MessageStateEmitter.subscribe(
      mgs => {
        this.messages.push(mgs);
        console.log(mgs);
      }
    );

    _HostService.InitStateEmitter.subscribe(
      instance => {
        console.log("init instance survived");
        this.currentUser = instance.email + '/' + instance.uid;
      }
    );
  }
  
  ngOnInit() {
    this._HostService.init('mario.roskosch@assfinet.de','Keines:78m');
  }
}


/*
function (instance) {
    console.log("firebase.init done");

                .then(
        function (result) {
            // the result object has these properties: uid, provider, expiresAtUnixEpochSeconds, profileImageURL, token


        },
        function (errorMessage) {
            console.log("error " + errorMessage);
        });
},
function (error) {
    console.log("firebase.init error: " + error);
});
*/