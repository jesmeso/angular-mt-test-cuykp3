import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _exchangeRateListURL = "https://api.currencybeacon.com/v1/latest";
  private API_KEY = "8W9AuSSBLJPKSoTWSq7j3ggX8OkPgK05";

  constructor(private _http: HttpClient) { }

  public getExchangeRateList(base: string) {
    const requestURL = this._exchangeRateListURL + "?base=" + base + "&api_key=" + this.API_KEY;

    this._http.get(requestURL).subscribe(resp => {
      return resp?.response.rates;
    });
  }
}
