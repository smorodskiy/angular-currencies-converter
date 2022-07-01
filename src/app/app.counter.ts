import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { time } from 'console';
import { interval, Observable, fromEvent, debounceTime, filter, map, Subject, timer, scan, startWith, BehaviorSubject, mapTo, throttle, throttleTime, count, timeInterval, takeWhile, switchMap, take } from 'rxjs';

@Component({
    selector: 'counter',
    template: `
    <div class="rounded bg-gradient-4 shadow p-5 text-center mb-5 m-4">
            <h1 class="text-center display-4 mb-4">Countdown timer</h1>
            <p>Enter the time in MM:SS format</p>
            <input type="text" pattern="^[0-5][0-9]\:[0-5][0-9]\$" class="form-control w-50 d-inline-flex p-2" [(ngModel)]="inputTime">
            <h2 class="counter-display m-3 display-3" [innerHTML]="mmSS"></h2>
            <button class="m-2 counter-start btn btn-dark" [innerHTML]="currentCaption">Start</button>            
            <button class="m-2 counter-wait btn btn-dark">Wait</button>
            <button class="m-2 counter-reset btn btn-dark">Reset</button>
    </div>`
})

export class Counter implements OnInit {

    //    @ViewChild('btn', { static: true }) button: ElementRef;   

    constructor() { }

    // init start num
    count: number = 0;
    countOnStart: number = 0;
    // MM:SS format
    mmSS: string = "00:00";
    // Interval of stream timer
    interval: number = 1000;
    // Interval between mouse click
    clickInterval: number = 500;
    // Input value MM:SS
    inputTime: string = '';
    currentCaption: string = 'Start';

    // Convert sec to MM:SS and display
    setTimerDisplay(sec: number): void {
        this.mmSS = new Date(sec * 1000).toISOString().substring(14, 19);
    }
    // Convert MM:SS to sec
    msToSeconds(str: string): number {
        var p = str.split(':'),
            s = 0, m = 1;
        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }
        return s;
    }

    ngOnInit() {

        // Selectors for button elements
        const btnStartSelector = document.querySelector('.counter-start');
        const btnResetSelector = document.querySelector('.counter-reset');
        const btnWaitSelector = document.querySelector('.counter-wait');

        // Mouse click streams
        const btnStart$ = fromEvent(btnStartSelector, 'click');
        const btnReset$ = fromEvent(btnResetSelector, 'click');
        const btnWait$ = fromEvent(btnWaitSelector, 'click');

        // Counter stream
        let counter$;
        // Subscriber to counter
        let counterSubId;
        // Toogle
        let isPause: boolean = false;

        // Reset timer and all fields
        const resetTimer = () => {
            this.mmSS = '00:00';
            this.inputTime = '';
            this.currentCaption = 'Start';
            counterSubId.unsubscribe();
            counter$ = null;
        }

        const finishTimer = () => {
            this.mmSS = '*Beeep...*';
        }

        // INIT count stream
        let initCount = (sec: number) => {
            if (isPause == false) {
                this.count = sec + 1;
                counter$ = timer(0, this.interval)
                    .pipe(
                        mapTo(1),
                        map(x => this.count -= x),
                        takeWhile(x => x >= 0)
                    );
            }
            counterSubId = counter$.subscribe(
                (timeLeft) => this.setTimerDisplay(timeLeft),
                (err) => console.log('Some error!'),
                () => {
                    resetTimer();
                    finishTimer();
                }
            );

            isPause = false;
        }

        // INIT "Wait" button stream
        let btnWaitStream$ = btnWait$.pipe(
            timeInterval(),
            scan((acc, val) => val.interval < this.clickInterval ? acc + 1 : 0, 0),
            filter(val => val == 1)
        );

        // Subscriber to "Start" button
        btnStart$.subscribe(() => {

            if (counter$ && !isPause) {
                resetTimer();
            } else {
                this.countOnStart = this.msToSeconds(this.inputTime);
                if (this.countOnStart > 0) {
                    initCount(this.countOnStart);
                    this.currentCaption = 'Stop';
                }
            }

        })

        // Subscriber to "Reset" button
        btnReset$.subscribe(() => {
            this.count = this.countOnStart + 1;
        })

        // Subscriber to "Wait" button
        btnWaitStream$.subscribe(() => {
            if (counter$) counterSubId.unsubscribe();
            this.currentCaption = 'Start';
            isPause = true;
        });

    }
    ngOnDestroy() {

    }

}