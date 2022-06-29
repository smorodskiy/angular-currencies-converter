import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CounterModule }   from './app.counter';

@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ CounterModule],
    bootstrap:    [ CounterModule ]
})
export class AppModule { }