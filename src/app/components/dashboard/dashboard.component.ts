import { Component } from '@angular/core';
import { Org } from '../../models/org.model';
import { Work } from '../../models/work.model';
import { EnvService } from '../../services/env.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    public searchPos: number = 0;
    constructor(public env: EnvService) {}
}
