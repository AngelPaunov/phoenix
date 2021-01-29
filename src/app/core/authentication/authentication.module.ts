import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';

const materials = [
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatTooltipModule,
  MatIconModule
]

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent
  ],
  imports: [
    AuthenticationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    materials
  ]
})
export class AuthenticationModule { }
