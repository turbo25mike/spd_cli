// status.service.ts

import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/Rx';

@Injectable()
export class StatusService {
    private http: Http;
    private authHttp: AuthHttp;
    public uri: string;

    constructor(http: Http, authHttp: AuthHttp) {
        this.http = http;
        this.authHttp = authHttp;
        this.uri = window.location.protocol + '//' + window.location.hostname + ':5000/api/status/';
    }

    private get(route) {
        return this.http.get(this.uri + route).map((res: Response) => res.json());
    }

    private getString(route) {
        return this.http.get(this.uri + route).map((res: Response) => res);
    }

    private getSecured(route) {
        return this.authHttp.get(this.uri + route).map((res: Response) => res.json());
    }

    private getSecuredString(route) {
        return this.authHttp.get(this.uri + route).map((res: Response) => res);
    }

    public getStatus() { return this.getString(''); }

    public getEnvironment() {
      return this.getSecuredString('environment');
    }

    public getLoggedIn() {
      return this.getSecuredString('secure');
    }
}
