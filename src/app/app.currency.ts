import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { map, Observable, pipe, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './app.httpservice';

@Component({
    selector: 'currency-convertor',
    template: `
    <div class="wrapper">
        <form class="form-inline"> 
            <span {}>USD</span>
            <span>EUR</span>
            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
      
                    <div class="input-group-addon currency-symbol">$</div>
                    
                    <input type="text" class="form-control currency-amount" id="inlineFormInputGroup" placeholder="0.00" size="8">
                    
                    <div class="input-group-addon currency-addon">

                        <select class="currency-selector">
                        <option data-symbol="$" data-placeholder="0.00" selected>USD</option>
                        <option data-symbol="€" data-placeholder="0.00">EUR</option>
                        <option data-symbol="G" data-placeholder="0.00">UAH</option>          
                        </select>
                    </div>
                    
                    <div class="input-group-addon currency-symbol">$</div>
                    
                    <input type="text" class="form-control currency-amount" id="inlineFormInputGroup" placeholder="0.00" size="8">
                    
                    <div class="input-group-addon currency-addon">

                        <select class="currency-selector">
                        <option data-symbol="$" data-placeholder="0.00" selected>USD</option>
                        <option data-symbol="€" data-placeholder="0.00">EUR</option>
                        <option data-symbol="G" data-placeholder="0.00">UAH</option>          
                        </select>

                    </div>

      
            </div>
        </form>
    </div>


`
})



export class CurrencyConvertor implements OnInit {

    constructor(private http$: HttpService) { }

    currency: any
    usd: number; 
    eur: number;
    a: any;
    ngOnInit() {

        const res = this.http$.getCurrencyFromBank()
        .subscribe(
            pipe(
                map(data => data)
            )
            
        )


        
        //     (response) => {
        //         this.currency = response;
        //         console.log(this.currency);
        //     },
        //     (error) => { console.log(error); });
        // () => { console.log('Успешно!') };
    }
    ngOnDestroy() {

    }

}