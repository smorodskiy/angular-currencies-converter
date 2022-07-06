import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pipe, filter } from 'rxjs';

import { Currency } from './model/currency-model';


@Injectable({
    providedIn: 'root'
})

// Служба для получения данных с Банка
export class DataSource {

    
    currenciesTemp: Currency[] = [];

    url: string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

    constructor(private http: HttpClient) {
        // this.baseURL = location.hostname
    }

    addCurrency(currency: string, rate: number) {
        // this.currency = new Currency(currency, rate);
    }

    getActualCurrencies(): Observable<Currency[]> {
        this.currenciesTemp = [];
        return this.http.get<any>(this.url).pipe(

            map(res => {
                
                res.forEach((jsonItem) => {

                    for (let key in jsonItem) {
                        const { cc, rate } = jsonItem;
                        if (cc == "USD") {                            
                            this.currenciesTemp.push(
                                new Currency(cc, rate)
                            )
                            return;
                        }
                        if (cc == "EUR") {
                            this.currenciesTemp.push(
                                new Currency(cc, rate)
                            )
                            return;
                        }
                    }
                });

                return this.currenciesTemp;
            })
            
        )
    }


}