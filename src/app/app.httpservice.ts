import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyConvertor } from './app.currency';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    private url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

    constructor(private http: HttpClient) { }
    
    getCurrencyFromBank(): Observable<any> {
        return this.http.get(this.url);
    }


}