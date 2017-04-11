import { Component } from '@angular/core';
import { StatusService } from '../../services/status.service';

@Component({
    selector: 'dashboard',
    providers: [StatusService],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    public apiStatus: any;
    public apiEnvironment: any;
    public apiLoggedIn: string;

    constructor(public service: StatusService) {
        service.getStatus().subscribe(res => this.apiStatus = res);
        service.getEnvironment().subscribe(res => this.apiEnvironment = res);
        //service.getLoggedIn().subscribe(res => this.apiLoggedIn = res);
    }

}
