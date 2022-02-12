import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from './components/header/header.component';
import { RenewComponent } from './components/renew/renew.component';
import { Error404Component } from './components/error404/error404.component';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgbModule,
  FontAwesomeModule
]

@NgModule({
declarations: [
  HeaderComponent,
  RenewComponent,
  Error404Component
],
imports: [
  ...sharedModules
],
exports: [
  ...sharedModules,
  HeaderComponent,
  Error404Component,
],
entryComponents: [
  RenewComponent
],
providers: [  ],
})
export class CoreModule {}