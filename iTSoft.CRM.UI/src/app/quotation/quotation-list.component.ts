import { Component, OnInit, ViewChild } from '@angular/core';

import { Quotation } from './quotation';
import { QuotationService } from './quotation.service';
import { PagerService } from '../_services';
import { ConfirmDialog } from '../shared';
import * as _ from 'lodash';

import {MatDialog} from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'quotation-list',
    templateUrl: './quotation-list.component.html',
    styleUrls: ['./quotation-list.component.css'],
    providers: [ConfirmDialog]
})
export class QuotationListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    pageTitle: string = 'Quotations';
    imageWidth: number = 30;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: any = {};
    errorMessage: string;

    quotations: Quotation[];
    quotationList: Quotation[]; //
    displayedColumns = ["Phone", "Name", "CompanyName", "Date", "Service", "Amount", "Stage","Status","Quotationid"];
    dataSource: any = null;
    pager: any = {};
    pagedItems: any[];
    searchFilter: any = {
        Phone: "",
        Name: "",
        CompanyName: "",
        QuotationNo: ""
    };
    selectedOption: string;


    constructor(
        private quotationService: QuotationService,
        // private pagerService: PagerService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    freshDataList(quotations: Quotation[]) {
        this.quotations = quotations;

        this.dataSource = new MatTableDataSource(this.quotations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        this.quotationService.getQuotations()
            .subscribe(quotations => {
                this.freshDataList(quotations);
            },
            error => this.errorMessage = <any>error);

        this.searchFilter = {};
        this.listFilter = {};
    }

    getQuotations(pageNum?: number) {
        this.quotationService.getQuotations()
            .subscribe(quotations => {
                this.freshDataList(quotations);
            },
            error => this.errorMessage = <any>error);
    }

    searchQuotations(filters: any) {
        if (filters) {
            this.quotationService.getQuotations()
                .subscribe(quotations => {
                    this.quotations = quotations;
                    console.log(this.quotations.length)
                    this.quotations = this.quotations.filter((quotation: Quotation) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                                quotation[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                        })
                        return match;
                    });
                    this.freshDataList(quotations);
                },
                error => this.errorMessage = <any>error);
        }

    }

    resetListFilter() {
        this.listFilter = {};
        this.getQuotations();
    }

    reset() {
        this.listFilter = {};
        this.searchFilter = {};
        this.getQuotations();

    }

    resetSearchFilter(searchPanel: any) {
        searchPanel.toggle();
        this.searchFilter = {};
        this.getQuotations();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 1500,
        });
    }

    openDialog(id: number) {
        let dialogRef = this.dialog.open(ConfirmDialog,
            { data: { title: 'Dialog', message: 'Are you sure to delete this item?' } });
        dialogRef.disableClose = true;


        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;

            if (this.selectedOption === dialogRef.componentInstance.ACTION_CONFIRM) {
                this.quotationService.deleteQuotation(id).subscribe(
                    () => {
                        this.quotationService.getQuotations()
                            .subscribe(quotations => {
                                this.freshDataList(quotations);
                            },
                            error => this.errorMessage = <any>error);
                        this.openSnackBar("The item has been deleted successfully. ", "Close");
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        console.log(this.errorMessage);
                        this.openSnackBar("This item has not been deleted successfully. Please try again.", "Close");
                    }
                );
            }
        });
    }



}
