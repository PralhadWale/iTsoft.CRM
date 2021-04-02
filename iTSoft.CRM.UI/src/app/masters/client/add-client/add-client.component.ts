import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

import { AlertService } from 'src/app/_services';
import { ClientMaster } from '../client.model';
import { ClientService } from '../client.service';
import { ListService } from 'src/app/process/services/list.service';
import 'src/app/_extentions/ng-form.extensions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ClientViewModel } from 'src/app/_models/clientViewModel';
import { ContactPersonMaster } from 'src/app/_models/contactPerson';
import { OrganizationMaster } from 'src/app/_models/organization';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfilService } from 'src/app/_services/userProfile.Service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styles: [`
  .title-spacer {
      flex: 1 1 auto;
    }
  .form-field{
      width: 100%;
      margin-left: 20px;
      margin-right: 20px;
    }
    .mat-tab-label {
      border: 1px solid palevioletred;
      border-top-left-radius: .95rem;
      border-top-right-radius: .95rem;
     width: 200px;
  }
  
  .mat-tab-label-active {
     color: #495057;
      background-color: #fff;
      border-color: #dee2e6 #dee2e6 #fff;
     
  }
  
  .mat-ink-bar {
    display: none;
  }
    `],
})
export class AddClientComponent implements OnInit {

  errorMessage: any;
  public IsCompleted: boolean = false;
  title: string = "Add Client";

  clientSelectListModel: any = new Object();
  fieldColspan: number = 3;
  minDate: Date = new Date(1800, 1, 1);
  maxDate: Date = new Date();

  client: ClientViewModel = new ClientViewModel();
  pageTitle: string;
  constructor(
    private clientService: ClientService,
    private listService: ListService,
    private alertService: AlertService,
    private breakpointObserver: BreakpointObserver,
    private router : Router,
    public userProfileService: UserProfilService,
    private route: ActivatedRoute,
  ) {
    this.SetClientDefaultData();
    this.LoadSelectListData();

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      // console.log(result)
      this.onScreensizeChange(result);
    });

  }


  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getClientDetails(id);
      }
    );

  }

  ngOnChanges(changes: SimpleChanges) {
    this.SetClientDefaultData();
  }

  public SetClientDefaultData() {
    this.client = new ClientViewModel();

  }

  clearClientData(clientForm: NgForm) {

    this.SetClientDefaultData();
    clientForm.resetValidation();
    clientForm.reset();
    clientForm.form.reset();

  }



  LoadSelectListData() {
    this.listService
      .GetClientSelectList()
      .subscribe(
        (result) => {
          this.clientSelectListModel = result.Value.ResponseData;
        },
        (error: any) => (this.errorMessage = <any>error)
      );
  }


  getClientDetails(clientId: number): void {
    if (clientId > 0) {
      this.clientService
        .FindClient(clientId)
        .subscribe(
          (result) => {
            var data = <ClientViewModel>result.Value.ResponseData;
            this.onClientRetrieved(data)
          },
          (error: any) => (this.alertService.showErrorMessage(error))
        );
    }
    else 
    {
      this.onClientRetrieved(this.client);
    }
  }



  onSubmit(clientForm: NgForm) {
    if (clientForm && clientForm.valid) {

        if (this.client.ClientMaster.ClientSourceId == null || this.client.ClientMaster.ClientSourceId < 1) {
          this.client.ClientMaster.ClientSourceId = 2; // Website
        }

        this.clientService.Save(this.client).subscribe(result => {
          {
            this.alertService.showSuccessMessage("Client Saved successfully");
            this.clearClientData(clientForm);
            this.router.navigate(['clients']);
          }
        }, (error: any) => {
          { this.alertService.showSuccessMessage("Failed to save"); }
        });
    }
  }

  
  onClientRetrieved(data: ClientViewModel) {
    this.client = data;

    if (this.client.ClientMaster.ClientTypeId) {
      this.client.ClientMaster.ClientTypeId = this.client.ClientMaster.ClientTypeId.toString();
    }
    if (this.client.ContactPersonMasters && this.client.ContactPersonMasters.length > 0) {
      this.client.ContactPersonMaster = this.client.ContactPersonMasters[0];
    }
    else {
      this.client.ContactPersonMaster = new ContactPersonMaster();
    }

    if (this.client.ClientMaster.ClientId == undefined || this.client.ClientMaster.ClientId === 0) {
      this.pageTitle = "Add Client";
    }
    else {
      this.pageTitle = 'Update Client';

    }

    if (this.client.OrganizationMaster == null) {
      this.client.OrganizationMaster = new OrganizationMaster();
    }

  }


  onCancelClick(clientForm: NgForm) {
    this.router.navigate(['clients']);
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


