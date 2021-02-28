import { Component, OnInit, ViewChild } from '@angular/core';

import { Organization } from './organization';
import { OrganizationService } from './organization.service';
import { ConfirmDialog } from '../shared';

import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'organization-list',
    templateUrl: './organizationList.component.html',
    styleUrls: ['./organizationList.component.css'],
    providers: [ConfirmDialog]
})
export class OrganizationListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    pageTitle: string = 'Organizations';
    imageWidth: number = 30;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: any = {};
    errorMessage: string;

    organizations: Organization[];
    organizationList: Organization[]; //
    displayedColumns = ["OrganizationId", "OrganizationName", "OrganizationCode"];
    dataSource: any = null;
    pager: any = {};
    pagedItems: any[];
    searchFilter: any = {
        OrganizationName: "",
        OrganizationCode: "",
    };
    selectedOption: string;


    constructor(
        private organizationService: OrganizationService,
        // private pagerService: PagerService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    freshDataList(organizations: Organization[]) {
        this.organizations = organizations;

        this.dataSource = new MatTableDataSource(this.organizations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        // this.organizationService.getOrganizations()
        this.organizationService.GetAll()
            .subscribe(organizations => {
                this.freshDataList(organizations);
            },
            error => this.errorMessage = <any>error);

        this.searchFilter = {};
        this.listFilter = {};
    }

    getOrganizations(pageNum?: number) {
        // this.organizationService.getOrganizations()
        this.organizationService.GetAll()
            .subscribe(organizations => {
                this.freshDataList(organizations);
            },
            error => this.errorMessage = <any>error);
    }

    searchOrganizations(filters: any) {
        if (filters) {
            //this.organizationService.getOrganizations()
            this.organizationService.GetAll()
                .subscribe(organizations => {
                    this.organizations = organizations;
                    console.log(this.organizations.length)
                    this.organizations = this.organizations.filter((organization: Organization) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                            organization[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                        })
                        return match;
                    });
                    this.freshDataList(organizations);
                },
                error => this.errorMessage = <any>error);
        }

    }

    resetListFilter() {
        this.listFilter = {};
        this.getOrganizations();
    }

    reset() {
        this.listFilter = {};
        this.searchFilter = {};
        this.getOrganizations();

    }

    resetSearchFilter(searchPanel: any) {
        searchPanel.toggle();
        this.searchFilter = {};
        this.getOrganizations();
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
                // this.organizationService.deleteOrganization(id).subscribe(
                    this.organizationService.Delete(id).subscribe(
                    () => {
                        // this.organizationService.getOrganizations()
                        this.organizationService.GetAll()
                            .subscribe(organizations => {
                                this.freshDataList(organizations);
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
