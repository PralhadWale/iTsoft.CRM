// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BackendService } from '../_services'
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/of';

// import { Organization } from './organization';

// @Injectable()
// export class OrganizationService {
//     private basicAction = 'organizations/';

//     constructor(private http: HttpClient, private backend: BackendService) { }

//     getOrganizations(): Observable<Organization[]> {
//         return this.backend.getAll(this.basicAction)
//             .map(this.extractData)
//             .catch(this.handleError);
//     }

//     getOrganization(id: number): Observable<Organization> {
//         if (id === 0) {
//             //return Observable.of(this.initializeOrganization());
//         };
//         const action = `${this.basicAction}${id}`;
//         return this.backend.getById(action)
//             .map(this.extractData)
//             .catch(this.handleError);
//     }

//     deleteOrganization(id: number): Observable<Response> {

//         const action = `${this.basicAction}${id}`;
//         return this.backend.delete(action)
//             .catch(this.handleError);
//     }

//     saveOrganization(organization: Organization): Observable<Organization> {


//         if (organization.OrganizationId === 0) {
//             return this.createOrganization(organization);
//         }
//         return this.updateOrganization(organization);
//     }

//     private createOrganization(organization: Organization): Observable<Organization> {
//         organization.OrganizationId = undefined;
//         return this.backend.create(this.basicAction, organization)
//             .map(this.extractData)
//             .catch(this.handleError);
//     }

//     private updateOrganization(organization: Organization): Observable<Organization> {
//         const action = `${this.basicAction}${organization.OrganizationId}`;
//         return this.backend.update(action, organization)
//             .map(() => organization)
//             .catch(this.handleError);
//     }

//     private extractData(response: Response) {
//         let body: any = response.json ? response.json() : response;
//         return body.data ? body.data : (body || {});
//     }

//     private handleError(error: Response): Observable<any> {
//         // in a real world app, we may send the server to some remote logging infrastructure
//         // instead of just logging it to the console
//         console.error(error);
//         return Observable.throw(error.json() || 'Server error');
//     }

//     // initializeOrganization(): Organization {
//     //     // Return an initialized object
//     //     return {
//     //         OrganizationId: 0,
//     //         OrganizationName: null,
//     //         OrganizationCode: null,
//     //         Description: null,
//     //         TariffId: 0,
//     //         Website: null,
//     //         EmailId: null,
//     //         MobileNo: null,
//     //         PhoneNo: null,
//     //         Address: null,
//     //         District: null,
//     //         State: null,
//     //         Pincode: null,
//     //     };
//     // }

   
// }


import { Injectable } from '@angular/core';
import { iTCRMSettings } from '../core/models/iTSOFT.iTCRM.Configuration';
import { iTCRMAPIService } from '../core/services/ITSoftAPIService';
import { UserService } from '../shared/services/UserService';
import { Organization } from './organization';


@Injectable()

export class OrganizationService {

    constructor(private apiService: iTCRMAPIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/Organization/Save";
    getUrl: string = iTCRMSettings.Masters + "/Organization/GetAll";
    deleteURL: string = iTCRMSettings.Masters + "/Organization/Delete";
    getOrganizationListUrl: string = iTCRMSettings.Masters + "/Organization/FindOrganization";

    Save(organizationMaster: Organization) {

        // organizationMaster.AddedBy = this.userService.GetUserId();
        // organizationMaster.UpdatedBy = this.userService.GetUserId();
        organizationMaster.AddedDate = new Date(Date.now());
        organizationMaster.UpdatedDate = new Date(Date.now());

        return this.apiService.POST(this.URLSave, organizationMaster);
    }

    GetAll() {
        return this.apiService.POST(this.getUrl, '');
    }

    // Delete(organizationMaster: Organization) {
    //     return this.apiService.POST(this.deleteURL, organizationMaster);
    // }
    Delete(OrganizationId: number) {
        return this.apiService.POST(this.deleteURL, OrganizationId);
    }

    FindOrganization(OrganizationId: number) {
        return this.apiService.GETData(this.getOrganizationListUrl + "?OrganizationId=" + OrganizationId);
    }
}