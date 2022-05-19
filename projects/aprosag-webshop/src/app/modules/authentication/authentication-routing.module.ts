import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {canActivate, redirectLoggedInTo} from "@angular/fire/auth-guard";
import {RegisterComponent} from "./pages/register/register.component";

const redirectLoggedInToProfile = () => redirectLoggedInTo(['profile']);

const routes: Routes = [
  {path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToProfile)},
  {path: 'signup', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
