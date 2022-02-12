import { NgModule } from "@angular/core";
import { CurrencyRoutingModule } from "./currency-routing.module";
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { CoreModule } from "../core/core.module";

@NgModule({
declarations: [
  CurrenciesComponent,
  ExchangeComponent
],
imports: [
  CoreModule,
  CurrencyRoutingModule
],
entryComponents: [
  ExchangeComponent
],
providers: [  ],
})
export class CurrencyModule {}