import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyConvertor } from './app.currency';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    

    constructor(private http: HttpClient) { }
    
    getCurrency(url: any): Observable<any> {
        return this.http.get(url);
    }


}