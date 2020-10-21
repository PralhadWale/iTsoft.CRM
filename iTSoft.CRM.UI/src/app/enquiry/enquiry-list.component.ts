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
import { RequestService } from '../process/services/request.service';
import { RequestDetails } from '../_models/requestdetails';
import { RequestSerchParameters } from '../_models/Requestserchparameters';
import { RequestType } from '../_models/requesttype';
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
  enquiries: RequestDetails[];
  enquiryList: RequestDetails[]; //
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
    private requestService: RequestService,
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

  

  ngOnInit(): void {
  

    this.searchFilter = {};
    this.listFilter = {};
  }

 

  searchEnquiries(searchFilter)
  {
    this.getEnquiries();
  }
  
  resetListFilter() {
    this.listFilter = {};
    this.getEnquiries();
  }

  reset() {
    this.listFilter = {};
    this.searchFilter = {};

    this.getEnquiries();
  }

  resetSearchFilter(searchPanel: any) {
    searchPanel.toggle();
    this.searchFilter = {};
    this.getEnquiries();
  }

  
  getEnquiries() {

    let filter = new RequestSerchParameters();
    filter.RequestTypeId = <number>RequestType.Enquiry;
    // filter.FromDate = new Date(2020,10,1);
    // filter.ToDate = new Date(2021,10,1);
    this.requestService.Search(filter).subscribe(result => {
      this.freshDataList(result.Value.ResponseData);

    }, error => { console.log(error);});

    // this.requestService.Load(1).subscribe(result => {
    //   this.freshDataList(result.Value.ResponseData);

    // }, error => (this.errorMessage = <any>error));
  }

  freshDataList(enquiries: RequestDetails[]) {
    this.enquiryList = enquiries;
    this.dataSource = new MatTableDataSource(this.enquiryList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    
}
