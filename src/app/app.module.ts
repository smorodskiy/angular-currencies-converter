import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Counter }   from './app.counter';
@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ Counter ],
    bootstrap:    [ Counter ]
})
export class AppModule { }