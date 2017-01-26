// status.service.ts

import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/Rx';

@Injectable()
export class StatusService {
    private http: Http;
    public uri: string;

    constructor(http: Http, private authHttp: AuthHttp) {
        this.http = http;
        this.uri = window.location.protocol + '//' + window.location.hostname + ':5000/api/status/';
    }

    private get(route) {
        return this.http.get(this.uri + route).map((res: Response) => res.json());
    }

    private getSecured(route) {
        return this.authHttp.get(this.uri + route).map((res: Response) => res.json());
    }

    getStatus() { return this.get(''); }

    getEnvironment() { return this.get('environment'); }

    getLoggedIn() { return this.getSecured('secure'); }
}