import { NgModule } from "@angular/core";
import { UserRoutingModule } from "./user-routing.module";
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CoreModule } from "../core/core.module";

@NgModule({
  declarations: [  
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CoreModule,
    UserRoutingModule,
  ],
  entryComponents: [
  ],
  providers: [  ],
})
export class UserModule {}