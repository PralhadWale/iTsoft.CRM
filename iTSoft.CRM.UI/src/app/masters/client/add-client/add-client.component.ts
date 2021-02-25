import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

import { AlertService } from 'src/app/_services';
import { ClientMaster } from '../client.model';
import { ClientService } from '../client.service';
import { ListService } from 'src/app/process/services/list.service';
import 'src/app/_extentions/ng-form.extensions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  @ViewChild("sidenav") sidenav: MatSidenav;
  @Input() clientMaster: ClientMaster;
  @Output() onClientSaved = new EventEmitter();

  errorMessage: any;
  requestTypeName: string;
  public IsCompleted :boolean = false;
  title : string = "Add Client";

  clientSelectListModel : any = new Object();
  fieldColspan: number = 6;
  minDate : Date = new Date(1800,1,1);
  maxDate : Date = new Date();

  constructor(
    private clientService : ClientService,
    private listService: ListService,
    private alertService: AlertService,
    private breakpointObserver: BreakpointObserver
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


  }

  ngOnChanges(changes: SimpleChanges) {
    this.SetClientDefaultData();
  }

  public SetClientDefaultData() {
    if (this.clientMaster == null || this.clientMaster.ClientId == null || this.clientMaster.ClientId == 0) {
      this.clientMaster = this.clientService.NewClient();
      this.title = "Add Client";
    }
    else {
      this.title = "Update Client";
    }

  }

  clearClientData(clientForm: NgForm) {
    
    this.clientMaster = this.clientService.NewClient();
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

 

  onSubmit(clientForm: NgForm) {
    if (clientForm && clientForm.valid) {
      if (isNaN(this.clientMaster.ClientId)) {
        this.alertService.showErrorMessage("Invalid request");
      }
      else {
        
        this.clientService.Save(this.clientMaster).subscribe(result => {
          {
            this.alertService.showSuccessMessage("Client Saved successfully");
            this.sidenav.close();
            this.clearClientData(clientForm);
            this.onClientSaved.emit();
          } 
        }, (error: any) => {
          { this.alertService.showSuccessMessage("Failed to save"); }
        });
      }
    }
  }
 
  onCancelClick(clientForm : NgForm)
  {
    this.clearClientData(clientForm);
    this.sidenav.close();
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
        this.fieldColspan = 6;
    }
}

}
