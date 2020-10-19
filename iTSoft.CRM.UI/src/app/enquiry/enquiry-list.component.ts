import { Component, OnInit, ViewChild } from "@angular/core";


import { EnquiryService } from "./enquiry.service";
import { PagerService } from "../_services";
import { ConfirmDialog } from "../shared";
import * as _ from "lodash";
import {MatSnackBar} from '@angular/material/snack-bar';

import {MatDialog} from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IEnquiryDetails } from './enquiry';
@Component({
  selector: 'enquiry-list',
  templateUrl: "./enquiry-list.component.html",
  styleUrls: ["./enquiry-list.component.css"],
  providers: [ConfirmDialog]
})
export class EnquiryListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageTitle: string = "Enquiry List";

  showImage: boolean = false;
  listFilter: any = {};
  errorMessage: string;
  enquiries: IEnquiryDetails[];
  enquiryList: IEnquiryDetails[]; //
  displayedColumns = ["EnquiryNo","Name", "Email","Phone","CompanyName","EnquiryDate" , "Source","Service","Amount","AlterNateNo", "State", "Website", "Address","EnquiryId"];
  dataSource: any = null; // new MatTableDataSource<Element>(ELEMENT_DATA);
  pager: any = {};
  pagedItems: any[];
  totalAmount: number;
  searchFilter: any = {
    Name: "",
    Email: "",
    Phone: "",
    EnquiryNo:""

  };
  selectedOption: string;



  constructor(
    private enquiryService: EnquiryService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  freshDataList(enquiries: IEnquiryDetails[]) {
    this.enquiryList = enquiries;
    // this.enquiryList = enquiry.map(e => {
    //   let order = e;
    //   e["customerName"] = e.customer.firstname + " " + e.customer.lastname;
    //   return order;
    // });
    this.dataSource = new MatTableDataSource(this.enquiryList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.enquiryService.getEnquirys().subscribe(enquiries => {
      this.freshDataList(enquiries);
    }, error => (this.errorMessage = <any>error));

    this.searchFilter = {};
    this.listFilter = {};
  }

  getEnquirys(pageNum?: number) {
    this.enquiryService.getEnquirys().subscribe(enquiries => {
      this.freshDataList(enquiries);

    }, error => (this.errorMessage = <any>error));
  }

  searchEnquiries(searchFilter)
  {

  }
  
  resetListFilter() {
    this.listFilter = {};
    this.getEnquirys();
  }

  reset() {
    this.listFilter = {};
    this.searchFilter = {};

    this.getEnquirys();
  }

  resetSearchFilter(searchPanel: any) {
    searchPanel.toggle();
    this.searchFilter = {};

    this.getEnquirys();
  }

  

    
}
