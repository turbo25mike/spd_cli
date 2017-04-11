// status.service.ts

import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
    private http: Http;
    private appid: string = '036d1027a5ebb015cb37f7f1a06e19dc';
    public weatherUri: string = 'http://api.openweathermap.org/data/2.5/weather?id=';

    constructor(http: Http) {
        this.http = http;
    }

    private get(cityID: string) {
        return this.http.get(this.weatherUri + cityID + '&appid=' + this.appid + '&units=imperial').map((res: Response) => res.json());
    }

    public getPortlandWeather() { return this.get('5746545'); }
}