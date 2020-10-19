import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Quotation } from './quotation';
import { QuotationService } from './quotation.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TableColumnModel } from '../shared/table-layout/it-mat-table.component';


@Component({
    selector: 'quotation-form',
    templateUrl: './quotation-form.component.html',
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
export class QuotationFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Update Quotation';
    errorMessage: string;
    quotationForm: FormGroup;
    quotation: Quotation = <Quotation>{};
    private sub: Subscription;
    showImage: boolean;
    imageWidth: number = 100;
    imageMargin: number = 2;
    fieldColspan = 3;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private genericValidator: GenericValidator;

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    private validationMessages: { [key: string]: { [key: string]: string } | {} } = {
      
    };

    followUpList : Array<any>;
    followUpTableSchema : Array<TableColumnModel> = [];

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private quotationService: QuotationService,
        private breakpointObserver: BreakpointObserver
    ) {
        this.SetTableSchema();
        breakpointObserver.observe([
            Breakpoints.HandsetLandscape,
            Breakpoints.HandsetPortrait
        ]).subscribe(result => {
            // console.log(result)
            this.onScreensizeChange(result);
        });
        this.genericValidator = new GenericValidator(this.validationMessages);

    }

    ngOnInit(): void {
        this.quotationForm = this.fb.group({
            QuotationDate:[''],
            QuotationNo:[''],
            Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            CompanyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            PhoneNo: ['', Validators.maxLength(12)],
            Email: ['', Validators.maxLength(100)],
            SourceId: [''],
            Amount: [''],
            TermsAndCondition: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(2000)]],
        });

        // Read the quotation Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getQuotation(id);
            }
        );

        this.sub.add(null);
    }

    SetTableSchema() {
        this.followUpTableSchema =
         [
           { ColumnField:"Date" , ColumnHeader:"Date" , Type:"date" },
           { ColumnField:"FollowUpDate" , ColumnHeader:"FollowUp Date" , Type:"date" },
           { ColumnField:"State" , ColumnHeader:"State" , Type:"text" },
           { ColumnField:"Status" , ColumnHeader:"Deal Status" , Type:"text" },
           { ColumnField:"Comment" , ColumnHeader:"Comment" , Type:"text" },
           { ColumnField:"Remark" , ColumnHeader:"Remark" , Type:"text" },
           { ColumnField:"EmployeeName" , ColumnHeader:"Employee Name" , Type:"text" },
           { ColumnField:"Attempt" , ColumnHeader:"Attempt" , Type:"text" },
           { ColumnField:"ClientRating" , ColumnHeader:"Client Rating" , Type:"text" },
           {ColumnField:"$$edit",ColumnHeader:"",Type:"text"}
         ];
    
    
         this.followUpList = [{Date:Date(),FollowUpDate:Date(),DealStatus:"Completed",EmployeeName:"Pralhad",Attempt:1,Comment:"",Remark:"",ClientRating:10}]
      }

    ngOnDestroy(): void {
        //this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.quotationForm.valueChanges, ...controlBlurs).debounceTime(500).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.quotationForm);
        });
    }

    getQuotation(id: number): void {
        this.quotationService.getQuotation(id)
            .subscribe(
                (quotation: Quotation) => this.onQuotationRetrieved(quotation),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onQuotationRetrieved(quotation: Quotation): void {
        if (this.quotationForm) {
            this.quotationForm.reset();
        }
        this.quotation = quotation;

        if (this.quotation.Quotationid === 0) {
            this.pageTitle = 'New Quotation';
        } else {
            this.pageTitle = `Quotation: ${this.quotation.Name}`;
        }

        // // Update the data on the form
        // this.quotationForm.patchValue({
        //     firstname: this.quotation.firstname,
        //     lastname: this.quotation.lastname,
        //     email: this.quotation.email,
        //     rewards: this.quotation.rewards,
        //     phone: this.quotation.phone,
        //     mobile: this.quotation.mobile,
        //     membership: this.quotation.membership
        // });
    }

    deleteQuotation(): void {
        if (this.quotation.Quotationid === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the quotation: ${this.quotation.Name}?`)) {
                this.quotationService.deleteQuotation(this.quotation.Quotationid)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    toggleImage(): void {
        event.preventDefault();
        this.showImage = !this.showImage;
    }


    saveQuotation(): void {
        if (this.quotationForm.dirty && this.quotationForm.valid) {
            // Copy the form values over the quotation object values
            const quotation = Object.assign({}, this.quotation, this.quotationForm.value);

            this.quotationService.saveQuotation(quotation)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.quotationForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.quotationForm.reset();
        this.router.navigate(['/quotations']);
    }

    onScreensizeChange(result: any) {
        // debugger
        const isLess600 = this.breakpointObserver.isMatched('(max-width: 599px)');
        const isLess1000 = this.breakpointObserver.isMatched('(max-width: 959px)');
        console.log(
            ` isLess600  ${isLess600} 
            isLess1000 ${isLess1000}  `
        )
        if (isLess1000) {
            if (isLess600) {
                this.fieldColspan = 12;
            }
            else {
                this.fieldColspan = 6;
            }
        }
        else {
            this.fieldColspan = 3;
        }
    }
}
