import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { TableEditableDialogComponent } from './table-editable-dialog.component';
import { HRADialogComponent } from '@shared/components/hra-dialog/hra-dialog.component';
import { TaxExemptionModel } from '@modules/employee/models/taxecemption';

@Component({
    selector: 'table-editable-layout',
    templateUrl: './table-editable-layout.component.html',
    styleUrls: ['./table-editable-layout.component.scss']
})

export class TableEditableLayoutComponent implements OnInit {
    @Input() displayedColumns;
    @Input() dataSource;
    @Input() message;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    constructor(private matDialog: MatDialog) { }

    ngOnInit(): void { }

    selectedRow(action, row) {
        if (action == "Show") {
            if (row.particulars == "HRA") {
                this.openHRADialog();
            }
        }
        else if (action == "Show" && row.action == "Delete") {

        }
    }

    openHRADialog() {
        let taxExemptionModel = new TaxExemptionModel();

        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "600px";
        dialogConfig.disableClose = true;
        dialogConfig.data = taxExemptionModel;
        const taxExemptionHRADialog = this.matDialog.open(HRADialogComponent, dialogConfig);

        taxExemptionHRADialog.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            let data = result;
        });
    }

    addRowData(row_obj) {
        var d = new Date();
        this.dataSource.push({
            id: d.getTime(),
            particulars: row_obj.particulars,
            spendamount: row_obj.spendamount,
            definedamount: row_obj.definedamount,
            qualifiedamount: row_obj.qualifiedamount,
        });
        this.table.renderRows();
    }

    updateRowData(row_obj) {
        this.dataSource = this.dataSource.filter((value, key) => {
            if (value.id == row_obj.id) {
                value.particulars = row_obj.particulars;
                value.spendamount = row_obj.spendamount;
                value.definedamount = row_obj.definedamount;
                value.qualifiedamount = row_obj.qualifiedamount;
            }
            return true;
        });
    }

    deleteRowData(row_obj) {
        this.dataSource = this.dataSource.filter((value, key) => {
            // return value.id != row_obj.id;
            if (value.id == row_obj.id) {
                value.spendamount = 0;
            }
            return true;
        });
    }

    openDialog(action, obj) {
        obj.action = action;
        const dialogRef = this.matDialog.open(TableEditableDialogComponent, {
            width: '400px',
            data: obj
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.event == 'Add') {
                this.addRowData(result.data);
            } else if (result.event == 'Update') {
                this.updateRowData(result.data);
            } else if (result.event == 'Delete') {
                this.deleteRowData(result.data);
            }
        });
    }
}
