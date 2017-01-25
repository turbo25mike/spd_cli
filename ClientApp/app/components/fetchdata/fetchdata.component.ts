import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'fetchdata',
    template: require('./fetchdata.component.html')
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
    public apiResponse: Object;
    public apiUrl: string = window.location.protocol + '//' + window.location.hostname + ':5000/api/status';

    constructor(http: Http) {
        http.get('/api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json();
        });

        http.get(this.apiUrl).subscribe(result => {
            this.apiResponse = result.json();
        });
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
