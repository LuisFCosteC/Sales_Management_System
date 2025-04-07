import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

import { ModalDetailSalesComponent } from '../../Modals/modal-detail-sales/modal-detail-sales.component';
import { Sales } from '../../../../Interfaces/sales';
import { SaleService } from '../../../../Services/sale.service';
import { UtilityService } from '../../../../Reusable/utility.service';
import { parse } from 'node:path';

export const MY_DATE_FORMATS = {
  parse:{
    dateInput: 'DD/MM/YYYY',
  },
  display:{
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
  }
}

@Component({
  selector: 'app-sales-history',
  standalone: false,
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.css',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class SalesHistoryComponent implements OnInit, AfterViewInit {

  searchForm: FormGroup;
  searchOptions: any[] = [
    {value: "date", description: "Por Fechas"},
    {value: "number", description: "Numero Venta"}
  ]
  tableColumns: string[] = ['dateRegistration', 'salesNumber', 'paymentType', 'total', 'actions'];
  startData: Sales[] = [];
  salesListData = new MatTableDataSource(this.startData);
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _saleService: SaleService,
    private _utilityService: UtilityService
  ) {
    this.searchForm = this.fb.group({
      searchBy: ['date'],
      number: [''],
      startDate: [''],
      endDate: ['']
    });

    this.searchForm.get("searchBy")?.valueChanges.subscribe((value) => {
      this.searchForm.patchValue({
        number: "",
        startDate: "",
        endDate: ""
      })
    });
  }

  ngOnInit(): void {
    this.searchSales();
  }

  // Hook que se ejecuta después de inicializar la vista
  ngAfterViewInit(): void {
    // Asignamos el paginador a la tabla
    this.salesListData.paginator = this.tablePagination;
  }

  // Método para aplicar un filtro a la tabla
  applyTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;       // Obtiene el valor del filtro desde el evento
    this.salesListData.filter = filterValue.trim().toLocaleLowerCase(); // Aplica el filtro a la fuente de datos
  }

  searchSales() {
    let _startDate: string = "";
    let _endDate: string = "";

    if(this.searchForm.value.searchBy == "date") {
      _startDate = moment(this.searchForm.value.startDate).format("DD/MM/YYYY");
      _endDate = moment(this.searchForm.value.endDate).format("DD/MM/YYYY");

      if(_startDate == "Invalid date" || _endDate == "Invalid date") {
        this._utilityService.displayAlert("Debe ingresar ambas fechas", "Oops");
        return;
      }
    }

    this._saleService.history(
      this.searchForm.value.searchBy,
      this.searchForm.value.number,
      _startDate,
      _endDate
    ).subscribe({
      next: (data) => {
        if(data.status)
          this.salesListData = data.value;
        else
          this._utilityService.displayAlert("No se encontraron datos", "Oops")
      },
      error:(e) => {console.log(e)},
    })
  }

  seeDetailSales(_sales: Sales){
    this.dialog.open(ModalDetailSalesComponent,{
      data: _sales,
      disableClose: true,
      width: "1000px",
    })
  }
}
