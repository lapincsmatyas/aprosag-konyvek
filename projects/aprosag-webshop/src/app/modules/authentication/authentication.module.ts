import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
