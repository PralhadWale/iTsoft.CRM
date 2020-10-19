// import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';


// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/observable/merge';
// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

// import { Organization } from './organization';
// import { OrganizationService } from './organization.service';

// import { NumberValidators } from '../shared/number.validator';
// import { GenericValidator } from '../shared/generic-validator';
// import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


// @Component({
//     selector: 'organization-form',
//     templateUrl: './organizationForm.component.html',
//     styles: [`
//     .title-spacer {
//         flex: 1 1 auto;
//       }
//     .form-field{
//         width: 100%;
//         margin-left: 20px;
//         margin-right: 20px;
//     }
//     .avatar-field {
//         left: 0;
//         margin: 0 auto;
//         position: absolute;
//         margin-left: 50px;
//     }
//     `]
// })
// export class OrganizationFormComponent implements OnInit, AfterViewInit, OnDestroy {
//     @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

//     pageTitle: string = 'Update Organization';
//     errorMessage: string;
//     organizationForm: FormGroup;
//     organization: Organization = <Organization>{};
//     private sub: Subscription;
//     showImage: boolean;
//     imageWidth: number = 100;
//     imageMargin: number = 2;
//     fieldColspan = 3;

//     displayMessage: { [key: string]: string } = {};
//     private genericValidator: GenericValidator;

//     private validationMessages: { [key: string]: { [key: string]: string } | {} } = {
//         OrganizationName: {
//             required: 'Organization  Name is required.',
//             minlength: 'Organization  name must be at least one characters.',
//             maxlength: 'Organization  name cannot exceed 100 characters.'
//         },
//         OrganizationCode: {
//             required: 'Organization  Code is required.',
//             minlength: 'Organization  Code must be at least one characters.',
//             maxlength: 'Organization  Code cannot exceed 100 characters.'
//         },
//         Description: {
//             required: 'Organization Description is required.',
//             minlength: 'Organization Description must be at least one characters.',
//             maxlength: 'Organization Description cannot exceed 200 characters.'
//         },
//     };

//     constructor(private fb: FormBuilder,
//         private route: ActivatedRoute,
//         private router: Router,
//         private organizationService: OrganizationService,
//         private breakpointObserver: BreakpointObserver
//     ) {
//         breakpointObserver.observe([
//             Breakpoints.HandsetLandscape,
//             Breakpoints.HandsetPortrait
//         ]).subscribe(result => {
//             this.onScreensizeChange(result);
//         });
//         this.genericValidator = new GenericValidator(this.validationMessages);

//     }

//     ngOnInit(): void {
//         this.organizationForm = this.fb.group({
//             OrganizationName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
//             OrganizationCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
//             Description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],

//         });

//         this.sub = this.route.params.subscribe(
//             params => {
//                 let OrganizationId = +params['OrganizationId'];
//                 this.getOrganization(OrganizationId);
//             }
//         );

//         this.sub.add(null);
//     }

//     ngOnDestroy(): void {
//         this.sub.unsubscribe();
//     }

//     ngAfterViewInit(): void {
//         const controlBlurs: Observable<any>[] = this.formInputElements
//             .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

//         Observable.merge(this.organizationForm.valueChanges, ...controlBlurs).debounceTime(500).subscribe(value => {
//             this.displayMessage = this.genericValidator.processMessages(this.organizationForm);
//         });
//     }

//     getOrganization(OrganizationId: number): void {
//         this.organizationService.getOrganization(OrganizationId)
//             .subscribe(
//                 (organization: Organization) => this.onOrganizationRetrieved(organization),
//                 (error: any) => this.errorMessage = <any>error
//             );
//     }

//     onOrganizationRetrieved(organization: Organization): void {
//         if (this.organizationForm) {
//             this.organizationForm.reset();
//         }
//         this.organization = organization;

//         if (this.organization.OrganizationId === 0) {
//             this.pageTitle = 'New Organization';
//         } else {
//             this.pageTitle = `Organization: ${this.organization.OrganizationName}`;
//         }

//         // Update the data on the form
//         this.organizationForm.patchValue({
//             OrganizationName: this.organization.OrganizationName,
//             OrganizationCode: this.organization.OrganizationCode,
//             Description: this.organization.Description
//         });
//     }

//     deleteOrganization(): void {
//         if (this.organization.OrganizationId === 0) {
//             // Don't delete, it was never saved.
//             this.onSaveComplete();
//         } else {
//             if (confirm(`Really delete the organization: ${this.organization.OrganizationName}?`)) {
//                 this.organizationService.deleteOrganization(this.organization.OrganizationId)
//                     .subscribe(
//                         () => this.onSaveComplete(),
//                         (error: any) => this.errorMessage = <any>error
//                     );
//             }
//         }
//     }

//     toggleImage(): void {
//         event.preventDefault();
//         this.showImage = !this.showImage;
//     }


//     saveCustomer(): void {
//         if (this.organizationForm.dirty && this.organizationForm.valid) {
//             // Copy the form values over the organization object values
//             const organization = Object.assign({}, this.organization, this.organizationForm.value);

//             this.organizationService.saveOrganization(organization)
//                 .subscribe(
//                     () => this.onSaveComplete(),
//                     (error: any) => this.errorMessage = <any>error
//                 );
//         } else if (!this.organizationForm.dirty) {
//             this.onSaveComplete();
//         }
//     }

//     onSaveComplete(): void {
//         // Reset the form to clear the flags
//         this.organizationForm.reset();
//         this.router.navigate(['/organizations']);
//     }

//     onScreensizeChange(result: any) {
//         // debugger
//         const isLess600 = this.breakpointObserver.isMatched('(max-width: 599px)');
//         const isLess1000 = this.breakpointObserver.isMatched('(max-width: 959px)');
//         console.log(
//             ` isLess600  ${isLess600} 
//             isLess1000 ${isLess1000}  `
//         )
//         if (isLess1000) {
//             if (isLess600) {
//                 this.fieldColspan = 12;
//             }
//             else {
//                 this.fieldColspan = 6;
//             }
//         }
//         else {
//             this.fieldColspan = 3;
//         }
//     }
// }



import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseCode } from '../core/models/ServiceResponse.model';
import { iTCRMAlertService } from '../core/services/ITSoftAlertService';
import { OrganizationService } from './organization.service';



@Component({
    selector: 'organization-form',
    templateUrl: './organizationForm.component.html',
    styles: [`
    .title-spacer {
        flex: 1 1 auto;
      }
    .form-field{
        width: 100%;
        margin-left: 20px;
        margin-right: 20px;
    }
    .avatar-field {
        left: 0;
        margin: 0 auto;
        position: absolute;
        margin-left: 50px;
    }
    `]
})
export class OrganizationFormComponent {
    fieldColspan = 3;
    pageTitle: string = 'Update Organization';
    displayMessage: { [key: string]: string } = {};

    submitted = false;
    organizationForm: FormGroup;
    organization_Form: any;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private alertService: iTCRMAlertService,
        //private selectListService: SelectListService,
        private organizationService: OrganizationService
    ) {
        //this.LoadDropDown();
    }

    ngOnInit() {
        this.CreateForm();
    }

    CreateForm() {
        this.organizationForm = this.formBuilder.group({
            OrganizationId: [''],
            OrganizationName: ['', Validators.required],
            OrganizationCode: ['', Validators.required],
            Description: ['', Validators.required],
            TariffId: [''],
            Website: ['', Validators.required],
            EmailId: ['', Validators.required],
            MobileNo: ['', [Validators.required, Validators.pattern('[0-9]+')]],
            PhoneNo: ['', Validators.pattern('[0-9]+')],
            Address: ['', Validators.required],
            District: ['', Validators.required],
            State: [''],
            Pincode: ['']
        })
        this.organization_Form = this.organizationForm.controls;
    }

    // LoadDropDown() {
    //     this.organizationListModel = new OrganizationListModel();
    //     let result = this.selectListService.OrganizationDropDownLists().subscribe(
    //         (result: any) => {
    //             let serviceResponse = result.Value;
    //             if (serviceResponse.ResponseCode == ResponseCode.Success) {
    //                 this.organizationListModel = serviceResponse.ResponseData;
    //             }
    //             else if (serviceResponse.ResponseCode == ResponseCode.DataBaseError) {
    //                 this.alertService.ShowErrorMessage('Failed to load drop down data due to service  error.');
    //             }
    //             else {
    //                 this.alertService.ShowErrorMessage('Failed to load drop down data due to application error.');
    //             }
    //         },
    //         (error: any) => {
    //             this.alertService.ShowErrorMessage('Failed to load drop down data due to service error.');
    //         }
    //     );
    // }

    saveOrganization() {
        try {
            this.submitted = true;
            if (this.organizationForm.valid) {
                let organizationdata = this.organizationForm.value;
                this.organizationService.Save(organizationdata).subscribe(
                    (result: any) => {
                        let serviceResponse = result.Value;
                        if (serviceResponse.ResponseCode == ResponseCode.Success) {
                            this.alertService.ShowSuccessMessage(" organization data saved successfully.");
                            this.ResetUserForm();
                        }
                        else {
                            this.alertService.ShowErrorMessage("Failed to save due to application error.");
                        }
                    },
                    (error: any) => {
                        this.alertService.ShowErrorMessage("Failed to save due to service error.");
                    }
                );
            }
        }
        catch (e) {
            this.alertService.ShowErrorMessage("Failed to save due to application error");
        }
    }

    ResetUserForm() {
        this.organizationForm.reset();
    }


}