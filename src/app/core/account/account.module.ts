import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 


@NgModule({
  declarations: [AccountSettingsComponent],
  imports: [
    AccountRoutingModule,
    MatFormFieldModule
  ]
})
export class AccountModule { }
