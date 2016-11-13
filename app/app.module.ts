import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";

import { AppComponent } from "./app.component";
import { HostService } from "./HostService";

@NgModule({
  imports: [NativeScriptModule],
  declarations: [AppComponent],
  providers: [HostService],
  bootstrap: [AppComponent]
})
export class AppModule {}
