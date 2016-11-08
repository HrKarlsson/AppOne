import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";

import {OpaqueToken} from '@angular/core';
export const FIREBASE: OpaqueToken = new OpaqueToken('firebase');

import { AppComponent } from "./app.component";

@NgModule({
  imports: [NativeScriptModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
