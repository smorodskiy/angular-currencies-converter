import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'purchase-app',
    template: `<div class="page-header">
        <h1> Счетчик </h1>
    </div>
    <div class="counter-wrapper">
            <h1 class="counter-display">{{secondsToDday}}</h1>
            <button class="counter-start">Start</button>
            <button class="counter-stop">Stop</button>    
            <button class="counter-stop">Wait</button>
    </div>`
})
export class Counter {


    private subscription: Subscription;
  
    public dateNow = new Date();
    public dDay = new Date('Jan 01 2023 00:00:00');
    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute  = 60;

    public timeDifference;
    public secondsToDday;
    public minutesToDday;
    public hoursToDday;
    public daysToDday;


    private getTimeDifference () {
        this.timeDifference = this.dDay.getTime() - new  Date().getTime();
        this.allocateTimeUnits(this.timeDifference);
    }

    private allocateTimeUnits (timeDifference) {
        this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
        this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
        this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
        this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  ngOnInit() {
    this.subscription = interval(1000)
        .subscribe(x => { this.getTimeDifference(); });
 }

}