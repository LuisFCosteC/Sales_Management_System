import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

import { ModalDetailSalesComponent } from '../../Modals/modal-detail-sales/modal-detail-sales.component';
import { Sales } from '../../../../Interfaces/sales';
import { SaleService } from '../../../../Services/sale.service';
import { UtilityService } from '../../../../Reusable/utility.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
  }
}

@Component({
  selector: 'app-sales-history',
  standalone: false,
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class SalesHistoryComponent implements OnInit, AfterViewInit {

  searchForm: FormGroup;
  searchOptions: any[] = [
    { value: "date", description: "Por Fechas" },
    { value: "number", description: "Numero Venta" }
  ]
  tableColumns: string[] = ['dateRegistration', 'salesNumber', 'paymentType', 'total', 'actions'];
  salesListData = new MatTableDataSource<Sales>([]);
  
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
      });
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.salesListData.paginator = this.tablePagination;
  }

  isSearchValid(): boolean {
    const form = this.searchForm;
    const searchBy = form.get('searchBy')?.value;
    const number = form.get('number')?.value;
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;

    if (searchBy === 'number') {
      return !!number;
    } else if (searchBy === 'date') {
      return !!startDate && !!endDate;
    }
    return false;
  }

  searchSales() {
    // Verificar primero si la búsqueda es válida
    if (!this.isSearchValid()) {
      return;
    }

    let _startDate: string = "";
    let _endDate: string = "";

    if (this.searchForm.value.searchBy === "date") {
      _startDate = moment(this.searchForm.value.startDate).format("DD/MM/YYYY");
      _endDate = moment(this.searchForm.value.endDate).format("DD/MM/YYYY");
    }

    this._saleService.history(
      this.searchForm.value.searchBy,
      this.searchForm.value.number,
      _startDate,
      _endDate
    ).subscribe({
      next: (data) => {
        if (data.status && data.value && data.value.length > 0) {
          this.salesListData.data = data.value;
          if (this.salesListData.paginator) {
            this.salesListData.paginator.firstPage();
          }
        } else {
          // Mostrar mensaje solo si se realizó una búsqueda válida
          this._utilityService.displayAlert("No se encontraron datos", "Oops");
          this.salesListData.data = [];
        }
      },
      error: (e) => {
        console.error(e);
        this._utilityService.displayAlert("Error al obtener los datos", "Error");
        this.salesListData.data = [];
      }
    });
  }

  seeDetailSales(_sales: Sales) {
    this.dialog.open(ModalDetailSalesComponent, {
      data: _sales,
      disableClose: true,
      width: "1000px",
    });
  }
}