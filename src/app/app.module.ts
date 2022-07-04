import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CurrencyConvertor }   from './app.currency';
import { HttpClientModule } from '@angular/common/http';
// import { HttpService } from './app.httpservice';

@NgModule({
    imports:      [ BrowserModule, HttpClientModule, FormsModule],
    declarations: [ CurrencyConvertor],
    bootstrap:    [ CurrencyConvertor ]
})
export class AppModule { }