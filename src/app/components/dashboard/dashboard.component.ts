import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { QueryService } from '../../services/query.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tableList: Observable<any>;
  
    constructor(private queryService: QueryService) {
      queryService.getTables(this.tableList);
    }
}
