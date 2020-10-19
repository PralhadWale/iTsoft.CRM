import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/finally'


import { iTCRMSettings } from "../models/iTSOFT.iTCRM.Configuration";
import { ServiceResponseModel, ResponseCode } from '../models/ServiceResponse.model';
import { iTCRMLoaderService } from './ITSoftLoaderService';
// import {saveAs as importedSaveAs} from "file-saver";

@Injectable({ providedIn: 'root' })
export class iTCRMAPIService {


    private httpClientWithoutInterCeptor: HttpClient;
    constructor(private handler: HttpBackend, private http: HttpClient, private loaderService: iTCRMLoaderService
        ) {
        this.httpClientWithoutInterCeptor = new HttpClient(handler);

    }

    POST(apiURL, data) {

        this.loaderService.display(true);

        let URL = iTCRMSettings.BASE_API_URL + apiURL;
        let body = JSON.stringify(data);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',

            })
        };

        //  var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });

        return this.http.post(URL, body, httpOptions)
            .map((response: Response) => {
                this.loaderService.display(false);
                return { Value: response };
            }).catch(this.handleError).finally(() => this.loaderService.display(false));
    }

    /* Call API without interceptor - Used for anonymous authentication */
    POST_AN(apiURL, data) {

        this.loaderService.display(true);

        let URL = iTCRMSettings.BASE_API_URL + apiURL;
        let body = JSON.stringify(data);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',

            })
        };

        //  var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });

        return this.httpClientWithoutInterCeptor.post(URL, body, httpOptions)
            .map((response: Response) => {
                this.loaderService.display(false);
                return { Value: response };
            }).catch(this.handleError).finally(() => this.loaderService.display(false));
    }




    POSTBLOB(apiURL, formData) {

        this.loaderService.display(true);

        let URL = iTCRMSettings.BASE_API_URL + apiURL;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data',
            })
        };

        return this.http.post(URL, formData).map((response: Response) => {
            this.loaderService.display(false);
            return { Value: response };
        }).catch(this.handleError).finally(() => this.loaderService.display(false));
    }




    DownLoadFile_POST(apiURL, data) {

        this.loaderService.display(true);
        let URL = iTCRMSettings.BASE_API_URL + apiURL;
        let body = JSON.stringify(data);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            responseType: 'blob' as 'json'
        };

        //  var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });

        return this.http.post(URL, body, httpOptions)
            .map((response: Response) => {
                this.loaderService.display(false);
                return response;
            }).catch(this.handleError).finally(() => this.loaderService.display(false));
    }

    // public DownLoadFile(data: any , fileName: string) {
    //     var blob = new Blob([data]);
    //     importedSaveAs(blob, fileName)
    // }


    DownLoadFile_Get(apiURL: string) {
        this.loaderService.display(true);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            responseType: 'blob' as 'json'
        };

        let URL = iTCRMSettings.BASE_API_URL + apiURL;
        return this.http.get(URL, httpOptions)
            .map((response: Response) => {
                return { Value: response };
            }
            ).catch(this.handleError).finally(() => this.loaderService.display(false));
    }



    public GetFile(data: any) {
        var blob = new Blob([data.Value], { type: 'application/pdf' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    GETData(apiURL) {
        this.loaderService.display(true);

        let URL = iTCRMSettings.BASE_API_URL + apiURL;
        return this.http.get(URL)
            .map((response: Response) => {
                return { Value: response };
            }
            ).catch(this.handleError).finally(() => this.loaderService.display(false));
    }


    GETData_Silent(apiURL) {
        //this.loaderService.display(true);

        let URL = iTCRMSettings.BASE_API_URL + apiURL;
        return this.http.get(URL)
            .map((response: Response) => {
                return { Value: response };
            }
            ).catch(this.handleError);
    }

    /* Call API without interceptor - Used for anonymous authentication */
    GETData_AN(apiURL) {
        this.loaderService.display(true);

        let URL = iTCRMSettings.BASE_API_URL + apiURL;
        return this.httpClientWithoutInterCeptor.get(URL)
            .map((response: Response) => {
                return { Value: response };
            }
            ).catch(this.handleError).finally(() => this.loaderService.display(false));
    }

    GETData_AN_Silent(apiURL) {
        //this.loaderService.display(true);

        let URL = iTCRMSettings.BASE_API_URL + apiURL;
        return this.httpClientWithoutInterCeptor.get(URL)
            .map((response: Response) => {
                return { Value: response };
            }
            ).catch(this.handleError);
    }


    GETSUBSCRIBE(apiURL): Promise<Observable<ServiceResponseModel>> {

        let URL = iTCRMSettings.BASE_API_URL + apiURL;
        return new Promise(resolve => {
            let response: any;
            this.http.get(URL).subscribe(
                (result: any) => {
                    response = result.Value
                },
                (error: any) => {
                    response = new ServiceResponseModel();
                    response.ResponseCode = ResponseCode.DataBaseError;
                    response.Message = error.Message;
                },
                () => {
                    resolve(response);
                }
            );
        });

    }

    public IsValidFileType(fileName: string) {

        //file type extension
        let checkFileType = fileName.split('.').pop();
        var fileType;
        if (checkFileType == ".txt") {
            fileType = "text/plain";
        }
        if (checkFileType == ".pdf") {
            fileType = "application/pdf";
        }
        if (checkFileType == ".doc") {
            fileType = "application/vnd.ms-word";
        }
        if (checkFileType == ".docx") {
            fileType = "application/vnd.ms-word";
        }
        if (checkFileType == ".xls") {
            fileType = "application/vnd.ms-excel";
        }
        if (checkFileType == ".png") {
            fileType = "image/png";
        }
        if (checkFileType == ".jpg") {
            fileType = "image/jpeg";
        }
        if (checkFileType == ".jpeg") {
            fileType = "image/jpeg";
        }
        if (checkFileType == ".gif") {
            fileType = "image/gif";
        }
        if (checkFileType == ".csv") {
            fileType = "text/csv";
        }

        return fileType;
    }


    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);

        return Observable.throw(error || 'Server error');
    }



}