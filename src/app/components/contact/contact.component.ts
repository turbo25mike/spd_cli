import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {Observable} from 'rxjs/Rx';
import {WeatherService} from '../../services/weather.service';

@Component({
    selector: 'contact',
    providers: [WeatherService],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent {
    public pdx: CityInfo;
    
    constructor(private sanitizer:DomSanitizer, private weatherService:WeatherService){
        this.pdx = new CityInfo();
        this.pdx.date = Date.now();
        
        weatherService.getPortlandWeather().subscribe(res => {
            this.pdx.temperatureF = res.main.temp.toFixed(0) + '\xB0F';
            this.pdx.temperatureC = ((res.main.temp-32) * 5/9).toFixed(0) + '\xB0C';
            this.pdx.weather = res.weather[0].main.toLowerCase();
            
            this.pdx.coord = Math.abs(res.coord.lon) + ((res.coord.lon < 0) ? ' S' : ' N');
                this.pdx.coord += ', ';
            
            this.pdx.coord += Math.abs(res.coord.lat) + ((res.coord.lat < 0) ? ' E' : ' W');
        });
                        
        Observable.interval(1000)
        .subscribe(t => {
            this.pdx.date = Date.now();
            this.pdx.secondsTransform = this.timeTransform(this.pdx.date, 'seconds');
            this.pdx.minutesTransform = this.timeTransform(this.pdx.date, 'minutes');
            this.pdx.hoursTransform = this.timeTransform(this.pdx.date, 'hours');
        });
    }
    
    private timeTransform(time: number, timeType:String){
        var ticks:number;
        switch(timeType){
            case 'seconds':
                ticks = new Date(time).getSeconds();
                break;
            case 'minutes':
                ticks = new Date(time).getMinutes();
                break;
            case 'hours':
                ticks = new Date(time).getHours();
                break;
                       }
        
                return this.sanitizer.bypassSecurityTrustStyle('rotate(' + (ticks / 60 * 360) + 'deg)');
    }
    
}


export class CityInfo {
    secondsTransform: any;
    minutesTransform: any;
    hoursTransform: any;
    date: number;
    temperatureC: string;
    temperatureF: string;
    weather: string;
    coord: string;
}