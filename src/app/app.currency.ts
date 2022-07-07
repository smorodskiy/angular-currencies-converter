import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { map, Observable, pipe, filter } from 'rxjs';
import { DataSource } from './app.data-source';
import { Currency } from './model/currency-model';

@Component({
    selector: 'currency-convertor',
    template: `
    <div class="container">
        <form class="form-inline d-flex flex-column "> 
            <div>
                <div *ngFor="let cur of actualCurrency">
                    <span>{{cur.name}} - </span>
                    <span>{{cur.rate}}</span>
                </div>
            </div>
            <div class="input-group input-group-lg">
                        <span class="input-group-text currency-symbol">$</span>
                        
                        <input (change)="getCurrencies()" type="text" class="form-control currency-amount" id="inlineFormInputGroup" placeholder="0.00" size="8">
                        
                        <div class="input-group-addon currency-addon">
                            <select class="form-select-lg currency-selector">
                            <option data-symbol="$" data-placeholder="0.00" selected>USD</option>
                            <option data-symbol="€" data-placeholder="0.00">EUR</option>
                            <option data-symbol="G" data-placeholder="0.00">UAH</option>          
                            </select>
                        </div>
            </div>
            <div class="input-group input-group-lg">
                        <span class="input-group-text currency-symbol">€</span>
                                    
                        <input (change)="getCurrencies()" type="text" class="form-control currency-amount" id="inlineFormInputGroup" placeholder="0.00" size="8">
                        
                        <div class="input-group-addon currency-addon">
                            <select class="form-select-lg currency-selector">
                            <option data-symbol="$" data-placeholder="0.00" selected>USD</option>
                            <option data-symbol="€" data-placeholder="0.00">EUR</option>
                            <option data-symbol="G" data-placeholder="0.00">UAH</option>          
                            </select>
                        </div>                
            </div>
        </form>
    </div>


`,
    styleUrls: ["app.currency.css"]
})


export class CurrencyConvertor {

    actualCurrency: Currency[];
    currenciesName: [] = [];
    // test: ["USD", ]


    constructor(private data$: DataSource) {
        
        this.getCurrencies();
        console.log(this.actualCurrency);
    }

    parsingArray() {

    }

    clearActualCurrencies() {
        this.actualCurrency = [];
        console.log(this.actualCurrency);
    }
    
    getCurrenciesName() {    
        this.actualCurrency.forEach( cur => {
            this.currenciesName.push(cur.name);
        })
    }

    getCurrencies() {    
        this.clearActualCurrencies();    
        this.data$.getActualCurrencies().subscribe(
            currencies => {
                if (currencies)
                this.actualCurrency = currencies;
            }            
        )        
    };

}