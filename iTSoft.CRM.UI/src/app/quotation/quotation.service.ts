import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../_services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Quotation } from './quotation';

@Injectable()
export class QuotationService {
  private basicAction = 'quotations/';

  constructor(private http: HttpClient, private backend: BackendService) { }

  getQuotations(): Observable<Quotation[]> {
    return this.backend.getAll(this.basicAction)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getQuotation(id: number): Observable<Quotation> {
    if (id === 0) {
      return Observable.of(this.initializeQuotation());
    };
    const action = `${this.basicAction}${id}`;
    return this.backend.getById(action)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteQuotation(id: number): Observable<Response> {

    const action = `${this.basicAction}${id}`;
    return this.backend.delete(action)
      .catch(this.handleError);
  }

  saveQuotation(quotation: Quotation): Observable<Quotation> {


    if (quotation.Quotationid === 0) {
      return this.createQuotation(quotation);
    }
    return this.updateQuotation(quotation);
  }

  private createQuotation(quotation: Quotation): Observable<Quotation> {
    quotation.Quotationid = undefined;
    return this.backend.create(this.basicAction, quotation)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private updateQuotation(quotation: Quotation): Observable<Quotation> {
    const action = `${this.basicAction}${quotation.Quotationid}`;
    return this.backend.update(action, quotation)
      .map(() => quotation)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    let body : any = response.json ? response.json() : response;
    return body.data ? body.data : (body || {});
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }

  initializeQuotation(): Quotation {
    // Return an initialized object
    return {
      Quotationid: 0,
      QuotationNo: null,
      QuotationDate: null,
      Name: null,
      PhoneNo: null,
      Email: null,
      CompanyName: null,
      SourceId: null,
      Amount: null,
      TermsAndCondition: null,
      QuotationStatusId: null,
    };
  }
}
