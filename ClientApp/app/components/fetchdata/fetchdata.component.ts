import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { StatusService } from '../../services/status.service';

@Component({
    selector: 'fetchdata',
    providers: [StatusService],
    template: require('./fetchdata.component.html')
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
    public apiStatus: string;
    public apiEnvironment: string;
    public apiLoggedIn: string;
    public apiUrl: string = window.location.protocol + '//' + window.location.hostname + ':5000';

    constructor(private http: Http, private service: StatusService) {
        http.get('/api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json();
        });

        service.getStatus().subscribe(res => this.apiStatus = res);
        service.getEnvironment().subscribe(res => this.apiEnvironment = res);
        service.getLoggedIn().subscribe(res => this.apiLoggedIn = res);
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
