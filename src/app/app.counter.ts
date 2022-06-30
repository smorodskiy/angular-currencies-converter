import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Observable, fromEvent, debounceTime, filter, map, Subject, timer, scan, startWith, BehaviorSubject, mapTo, throttle, throttleTime, count, timeInterval } from 'rxjs';

const numbers = interval(1000);

@Component({
    selector: 'counter',
    template: `<div class="page-header">
        <h1> Счетчик </h1>
    </div>
    <div class="counter-wrapper">
            <h1 class="counter-display">{{count}}</h1>
            <button (click)="getItem($event)" class="counter-start">Start</button>
            <button (click)="setTimer(0)" class="counter-stop">Stop</button>    
            <button (click)="setTimer(-1)" class="counter-wait">Wait</button>
    </div>`
})

export class Counter implements OnInit {

    @ViewChild('btn', { static: true }) button: ElementRef;

    constructor() { }

    setTimer(param: number) {

    }
    // private buttonClicked = new Subject<string>();

    public getItem(itemId: string) {
        // this.buttonClicked.next(itemId);
    }
    // init start num
    count: number = 0;
    interval: number = 1000;
    clickInterval: number = 500;

    btnSelector = document.querySelector('.counter-start');


    renderCount(num: number){
        this.count = num;
    }
    // watch = new Observable(observer => {

    //     observer.next(this.count);

    //     const watchInterval = setInterval(() => {
    //         this.count += 1;
    //         observer.next(this.count);
    //     }, 1000);

    //     return () => clearInterval(watchInterval);
    // }).pipe(
    //     filter(data => data > 3)
    // );

    // subscribe = example.subscribe(val => console.log(val));
    // stopwatchSubscription = this.watch.subscribe(count => {
    //     // console.log(count);
    // });

    // buttonSubscription =  fromEvent(document.querySelector('.counter-start'), 'click')
    //         .pipe(debounceTime(300))
    //         .subscribe(res => console.log(res));


    ngOnInit() {
        
        // Count stream
        const counter$ = timer(0, 1000);
        // Mouse clicks stream
        const clickStream$ = fromEvent(this.btnSelector, 'click');
        // const toggle$ = new BehaviorSubject(true);

        // 
        let doubleClick$ = clickStream$.pipe(
            timeInterval(),
            scan((acc, val) => val.interval < this.clickInterval ? acc + 1 : 0, 0),
            filter(val => val == 1)
        );

        // Subscribes to stream
        doubleClick$.subscribe((e) => console.log('Pause the timer'));
        // counter$.subscribe((timeLeft) => this.renderCount(timeLeft));
        counter$.subscribe((v) => console.log(v));

        // const buttonClickedDebounced = this.buttonClicked.pipe(
        //     scan((acc, cur) => {
        //         acc + cur;
        //         console.log(acc + cur);
        //     }, true), startWith(true)
        // );


    }
    ngOnDestroy() {

    }

}