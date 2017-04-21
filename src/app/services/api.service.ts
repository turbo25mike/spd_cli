// status.service.ts

import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
    private http: Http;
    private authHttp: AuthHttp;
    public uri: string;

    constructor(http: Http, authHttp: AuthHttp) {
        this.http = http;
        this.authHttp = authHttp;
        this.uri = environment.apiUri;
    }

    public Get(route) {
        return this.authHttp.get(this.uri + route).map((res: Response) => res.json());
    }

    public Post(route, obj) {
        return this.authHttp.post(this.uri + route, obj).map((res: Response) => res.json());
    }

    public Put(route, obj) {
        return this.authHttp.put(this.uri + route, obj).map((res: Response) => res.json());
    }

    public Delete(route) {
        return this.authHttp.delete(this.uri + route).map((res: Response) => res.json());
    }
}
