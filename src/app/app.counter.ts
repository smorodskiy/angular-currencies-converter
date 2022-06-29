import { Component, Output, EventEmitter } from '@angular/core';

import { fromEvent, interval, merge, noop, NEVER, Observable } from 'rxjs';
import { map, mapTo, scan, startWith, switchMap, tap } from 'rxjs/operators';

interface State {
    count: boolean;
    countup: boolean;
    speed: number;
    value: number;
    increase: number;
  }

@Component({
    selector: 'counter',
    template: `<div class="page-header">
        <h1> Счетчик </h1>
    </div>
    <div class="counter-wrapper">
            <h1 class="counter-display">{{count}}</h1>
            <button (click)="counterSet(1)" class="counter-start">Start</button>
            <button (click)="counterSet(0)" class="counter-stop">Stop</button>    
            <button (click)="counterSet(-1)" class="counter-stop">Wait</button>
    </div>`
})

export class CounterModule {

    count: number;

    counterSet(param: number) {
        console.log(param);
        this.count = param;
    }

    clickStream = new Observable((obs) => {
       
       setTimeout(() => {
        obs.next('Start');
       }, 1500);
        
    });    

    getElem = (id: string): HTMLElement => document.getElementById(id);
    fromClick = (id: string) => fromEvent(this.getElem(id), 'click');

    ngOnInit() {
        // this.clickStream.subscribe((data) =>          
        // )

        console.log(this.fromClick)
    }

    // const getElem = (id: string): HTMLElement => document.getElementById(id);
    // const getVal = (id: string): number => parseInt(this.getElem(id)['value']);    
    
    // const fromClick = (id: string) => fromEvent(this.getElem(id), 'click');
    // const fromClickAndMapTo = (id: string, obj: {}) =>
    // this.fromClick(id).pipe(mapTo(obj));
    
    // const fromClickAndMap = (id: string, fn: _ => {}) =>
    // this.fromClick(id).pipe(map(fn));
    
    // const setValue = (val: number) =>
    //   (this.getElem('counter').innerText = val.toString());
      
    //   const events$ = merge(
    //     this.fromClickAndMapTo('start', { count: true }),
    //     this.fromClickAndMapTo('pause', { count: false }),
    //     this.fromClickAndMapTo('reset', { value: 0 }),
    //     this.fromClickAndMapTo('countup', { countup: true }),
    //     this.fromClickAndMapTo('countdown', { countup: false }),
    //     // fromClickAndMap('setto', _ => ({ value: getVal('value') })),
    //     // fromClickAndMap('setspeed', _ => ({ speed: getVal('speed') })),
    //     // fromClickAndMap('setincrease', _ => ({ increase: getVal('increase') }))
    //   );
      
    //   const stopWatch$ = events$.pipe(
    //     startWith({
    //       count: false,
    //       speed: 1000,
    //       value: 0,
    //       countup: true,
    //       increase: 1
    //     }),
    //     scan((state: State, curr): State => ({ ...state, ...curr }), {}),
    //     tap((state: State) => setValue(state.value)),
    //     switchMap((state: State) =>
    //       state.count
    //         ? interval(state.speed).pipe(
    //             tap(
    //               _ =>
    //                 (state.value += state.countup ? state.increase : -state.increase)
    //             ),
    //             tap(_ => setValue(state.value))
    //           )
    //         : NEVER
    //     )
    //   );
      
    //   stopWatch$.subscribe();


}