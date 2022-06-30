import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Observable, fromEvent, debounceTime, filter, map, Subject, timer, scan, startWith, BehaviorSubject, mapTo, throttle, throttleTime, count, timeInterval, takeWhile, switchMap, take } from 'rxjs';

const numbers = interval(1000);

@Component({
    selector: 'counter',
    template: `<div class="page-header">
        <h1> Счетчик </h1>
    </div>
    <div class="counter-wrapper">
            <h1 class="counter-display">{{mmSS}}</h1>                        
            <button class="counter-start">Start</button>
            <button class="counter-stop">Stop</button>    
            <button class="counter-wait">Wait</button>
    </div>`
})

export class Counter implements OnInit {

    @ViewChild('btn', { static: true }) button: ElementRef;   

    constructor() { }

    // init start num
    count: number = 300;
    // MM:SS format
    mmSS: string;
    // Interval of stream timer
    interval: number = 1000;
    // Interval between mouse click
    clickInterval: number = 500;    
    
    // Convert sec to MM:SS
    convertSec(sec: number): void {
        this.mmSS = new Date(sec * 1000).toISOString().substring(14, 19);
    }
    

    ngOnInit() {

        // Selectors for button elements
        const btnStartSelector = document.querySelector('.counter-start');
        const btnStopSelector = document.querySelector('.counter-stop');
        const btnWaitSelector = document.querySelector('.counter-wait');
        
        // Mouse clicks stream
        const btnStart$ = fromEvent(btnStartSelector, 'click');
        const btnStop$ = fromEvent(btnStopSelector, 'click');
        const btnWait$ = fromEvent(btnWaitSelector, 'click');
        
        // INIT count stream
        const counter$ = timer(0, this.interval)
        .pipe(            
            mapTo(1),
            map(x => this.count -= x),
            takeWhile(x => x >= 0)
        );
        
        // INIT "Wait" button stream
        let btnWaitStream$ = btnWait$.pipe(
            timeInterval(),
            scan((acc, val) => val.interval < this.clickInterval ? acc + 1 : 0, 0),
            filter(val => val == 1)
        );

        
        let counterSub;

        // Subscriber to "Start" button
        btnStart$.subscribe(() => {
            this.count = 120;
            counterSub = counter$.subscribe((timeLeft) => this.convertSec(timeLeft));
        })
        
        // Subscriber to "Stop" button
        btnStop$.subscribe(() => {
            counterSub.unsubscribe();
            this.count = 0;
        })

        // Subscriber to "Wait" button
        btnWaitStream$.subscribe((e) => {
            counterSub.unsubscribe();
        });
    }
    ngOnDestroy() {
        
    }

}