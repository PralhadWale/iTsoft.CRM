import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../_services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { EmployeeMaster } from './employeeMaster';

@Injectable()
export class EmployeeService {
    private basicAction = 'employees/';

    constructor(private http: HttpClient, private backend: BackendService) { }

    getEmployees(): Observable<EmployeeMaster[]> {
        return this.backend.getAll(this.basicAction)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getEmployee(id: number): Observable<EmployeeMaster> {
        if (id === 0) {
            return Observable.of(this.initializeEmployee());
        };
        const action = `${this.basicAction}${id}`;
        return this.backend.getById(action)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteEmployee(id: number): Observable<Response> {

        const action = `${this.basicAction}${id}`;
        return this.backend.delete(action)
            .catch(this.handleError);
    }

    saveEmployee(employeeMaster: EmployeeMaster): Observable<EmployeeMaster> {


        if (employeeMaster.EmployeeId === 0) {
            return this.createEmployee(employeeMaster);
        }
        return this.updateEmployee(employeeMaster);
    }

    private createEmployee(employeeMaster: EmployeeMaster): Observable<EmployeeMaster> {
        employeeMaster.EmployeeId = undefined;
        return this.backend.create(this.basicAction, employeeMaster)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private updateEmployee(employeeMaster: EmployeeMaster): Observable<EmployeeMaster> {
        const action = `${this.basicAction}${employeeMaster.EmployeeId}`;
        return this.backend.update(action, employeeMaster)
            .map(() => employeeMaster)
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body: any = response.json ? response.json() : response;
        return body.data ? body.data : (body || {});
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    initializeEmployee(): EmployeeMaster {
        // Return an initialized object
        return {
            EmployeeId: 0,
            FirstName: null,
            MiddleName: null,
            LastName: null,
            MobileNo1: null,
            MobileNo2: null,
            EmailId: null,
            Address1: null,
            Address2: null,
            PostalCode: null,
            AadharNo: null,
            UniqueID: null,
            LoginName: null,
            Password: null,
            IsActive: false,
            Role: null,
            DepartMent:null,
            AddedBy: 0,
            UpdatedBy: 0,
            TargetAmount:100,
            AddedDate: null,
            UpdatedDate: null
        };
    }
}
