import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BackendService } from '../_services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IEnquiry, IAddress, IEnquiryDetails } from './enquiry';

@Injectable()
export class enquirieservice {
  private basicAction = 'enquiries/';

  constructor(private http: HttpClient, private backend: BackendService) { }

  getenquiries(): Observable<IEnquiryDetails[]> {
    // return this.http.get(this.basicAction)
    const action = `${this.basicAction}?_expand=customer`;
    return this.backend.getAll(action)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getEnquiry(id: number): Observable<IEnquiry> {
    if (id === 0) {
      return Observable.of(this.initializeEnquiry());
    };
    const action = `${this.basicAction}${id}?_expand=customer`;
    return this.backend.getById(action)
      .map(this.extractData)
      .do(data => console.log('getEnquiry: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteEnquiry(id: number): Observable<Response> {
    const action = `${this.basicAction}${id}`;
    return this.backend.delete(action)
      .catch(this.handleError);
  }

  saveEnquiry(enquiry: IEnquiry): Observable<IEnquiry> {
    if (enquiry.EnquiryId === 0) {
      return this.createEnquiry(enquiry);
    }
    return this.updateEnquiry(enquiry);
  }

  private createEnquiry(enquiry: IEnquiry): Observable<IEnquiry> {
    enquiry.EnquiryId = undefined;
    return this.backend.create(this.basicAction, enquiry)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private updateEnquiry(enquiry: IEnquiry): Observable<IEnquiry> {
    const action = `${this.basicAction}${enquiry.EnquiryId}`;
    return this.backend.update(action, enquiry)
      .map(() => enquiry)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    const body : any = response.json ? response.json() : response;
    return body.data ? body.data : (body || {});
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }

  initializeEnquiry(): IEnquiry {
    // Return an initialized object
    return {
      Name:null,
      Email:null,
      Phone:null,
      CompanyName:null,
      SourceId:0,
      PinCode:null,
      StateId:0,
      CityId:0,
      CliendBaheviourId:0,
      ServiceId: 0,
      Amount: 0,
      AlterNateNo:null,
      State:null,
      Title:null,
      Website:null,
      Address:null,
      EnquiryId: 0,
      EnquiryNo:null,
      EnquiryDate:null,
      DOB:null,
     
    };
  }
}
