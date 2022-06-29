import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';

const numbers = interval(1000);

@Component({
    selector: 'purchase-app',
    template: `<div class="page-header">
        <h1> Счетчик </h1>
    </div>
    <div class="counter-wrapper">
            <h1 class="counter-display">{{number}}</h1>
            <button class="counter-start">Start</button>
            <button class="counter-stop">Stop</button>    
            <button class="counter-stop">Wait</button>
    </div>`
})
export class Counter {

    number;

  ngOnInit() {
  }

}