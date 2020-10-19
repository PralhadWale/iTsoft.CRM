import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';


import { LoaderService } from './loaderService';
import { ConfigurationSettings } from '../_models/configuration';

@Injectable({ providedIn: 'root' })

export class APIService {
    private httpClientWithoutInterCeptor: HttpClient;

    constructor(private handler: HttpBackend,
        private http: HttpClient,
        private loaderService: LoaderService) {
        this.httpClientWithoutInterCeptor = new HttpClient(handler);
    }

    PostData(apiURL, data) {
        this.loaderService.display(true);
        let URL = ConfigurationSettings.BASE_API_URL + apiURL;
        let body = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post(URL, body, httpOptions)
            .map((response: Response) => {
                this.loaderService.display(false);
                return { Value: response };
            }).catch(this.handleError).finally(() => this.loaderService.display(false));
    }

    GetData(apiURL) {
        this.loaderService.display(true);
        let URL = ConfigurationSettings.BASE_API_URL + apiURL;
        return this.http.get(URL)
            .map((response: Response) => {
                return { Value: response };
            }
            ).catch(this.handleError).finally(() => this.loaderService.display(false));
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        // console.error(error);

        return Observable.throw(error || 'Server error');
    }
}
