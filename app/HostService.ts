import { Injectable, EventEmitter } from '@angular/core';

import firebase = require("nativescript-plugin-firebase");
import * as LocalNotifications from "nativescript-local-notifications";

declare var zonedCallback: Function;

export interface Message {
    title: string;
    body: string;
}

@Injectable()
export class HostService {

    MessageStateEmitter: EventEmitter<Message>;
    InitStateEmitter: EventEmitter<any>;
    LoginStateEmitter: EventEmitter<any>;

    _username: string;
    _password: string;

    _active: boolean;

    constructor() {
        this._active = false;

        this.MessageStateEmitter = new EventEmitter<Message>();
        this.InitStateEmitter = new EventEmitter<any>();

        console.log("service created....");

        firebase.addOnMessageReceivedCallback(zonedCallback(this.onMessageEvent.bind(this)));
    }

    private onInitEvent(result: any) {
        console.log("onInitEvent");
        this._active = true;
        this.InitStateEmitter.next(result);
    }

    private onMessageEvent(msg: any) {
        console.log("handle onMessageEvent");

        //{"foreground":true,"from":"768508798594","title":"yxcyxc","body":"cccc","yxc":"yxc"}
        console.log(JSON.stringify(msg));

        this.MessageStateEmitter.next(msg);

        LocalNotifications.schedule([{
            id: 1,
            title: msg.title,
            body: msg.body,
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
            });
    }


    private _OnInit(instance) {
        console.log("starting login for " + this._username);

        firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: this._username,
            password: this._password
        }).then(zonedCallback(this.onInitEvent.bind(this)));

    }

    public init(username: string, password: string) {
        this._username = username;
        this._password = password;

        if (!this._active) {
            firebase.init({
                persist: true
            }).then(this._OnInit.bind(this));
        } else {
            this._OnInit.bind(this);
        }
    }
}



// firebase.setValue(
// '/companies',
// { foo: 'bar' }
// )

/*
function(instance){
            console.log("after init....");
            console.log(x);
            x(instance);
        }*/



