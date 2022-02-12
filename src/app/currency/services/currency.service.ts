import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Currencies } from "../models/currencies.model";

@Injectable({providedIn: 'root'})
export class CurrencyService {
    baseUrl = `${environment.apiUrl}/currency`;

    constructor(private http: HttpClient) {
    }

    currencies(): Observable<any> {
        return this.http
            .get<any>(`${this.baseUrl}`)
            .pipe(map(m => new Currencies(m)));
    }
}
