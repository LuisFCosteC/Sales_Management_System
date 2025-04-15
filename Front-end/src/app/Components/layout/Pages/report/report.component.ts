// Importación de módulos y componentes necesarios
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';
import * as XLSX from 'xlsx'

import { Report } from '../../../../Interfaces/report';
import { SaleService } from '../../../../Services/sale.service';
import { UtilityService } from '../../../../Reusable/utility.service';

// Configuración personalizada de formatos de fecha para Angular Material
export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
  }
}

@Component({
  selector: 'app-report',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS } // Proveedor del formato de fecha
  ]
})

export class ReportComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;

  salesListReport: Report[] = [];

  // Columnas que se mostrarán en la tabla
  tableColumns: string[] = ['dateRegistration', 'salesNumber', 'paymentType', 'totalSales', 'product', 'quantity', 'price', 'total'];

  dataSalesReport = new MatTableDataSource(this.salesListReport);

  // Referencia al paginador de la tabla
  @ViewChild(MatPaginator)tablePagination!:MatPaginator;

  constructor(
    private fb: FormBuilder, // Para crear formularios reactivos
    private _saleService: SaleService, // Servicio para manejar ventas
    private _utilityService: UtilityService // Servicio de utilidades
  ) {
    // Inicialización del formulario de búsqueda
    this.filterForm = this.fb.group({
      startDate: ['', Validators.required], // Fecha de inicio para búsqueda por rango
      endDate: ['', Validators.required] // Fecha de fin para búsqueda por rango
    });
  }

  ngOnInit(): void {
  }

  // Método que se ejecuta después de que la vista se ha inicializado
  ngAfterViewInit(): void {
    // Asignamos el paginador a la tabla
    this.dataSalesReport.paginator = this.tablePagination;
  }

  searchSales() {
    const _startDate = moment(this.filterForm.value.startDate).format("DD/MM/YYYY");
    const _endDate = moment(this.filterForm.value.endDate).format("DD/MM/YYYY");
  
    // Validación de fechas
    if (_startDate == "Invalid date" || _endDate == "Invalid date") {
      this._utilityService.displayAlert("Debe ingresar ambas fechas", "Oops");
      return;
    }
  
    this._saleService.report(
      _startDate,
      _endDate
    ).subscribe({
      next: (data) => {
        if (data.status) {
          this.salesListReport = data.value;
          this.dataSalesReport.data = data.value;
  
          // Verificar si no hay ventas
          if (this.salesListReport.length === 0) {
            this._utilityService.displayAlert("No se encontraron datos", "Oops!");
          }
        } else {
          this.salesListReport = [];
          this.dataSalesReport.data = [];
          this._utilityService.displayAlert("No se encontraron datos", "Oops!");
        }
      },
      error: (e) => {
        // Manejo de errores
        console.error("Error al obtener los productos:", e);
      }
    });
  }

  exportExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.salesListReport);

    XLSX.utils.book_append_sheet(wb, ws, "Reporte de Ventas");
    XLSX.writeFile(wb, `Reporte de Ventas ${moment().format("DD/MM/YYYY")}.xlsx`);
  }
}
