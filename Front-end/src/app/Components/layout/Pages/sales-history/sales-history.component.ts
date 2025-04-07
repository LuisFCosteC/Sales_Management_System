// Importación de módulos y componentes necesarios
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

// Importación de componentes personalizados
import { ModalDetailSalesComponent } from '../../Modals/modal-detail-sales/modal-detail-sales.component';
import { Sales } from '../../../../Interfaces/sales';
import { SaleService } from '../../../../Services/sale.service';
import { UtilityService } from '../../../../Reusable/utility.service';

// Configuración personalizada de formatos de fecha para Angular Material
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
  }
}

// Decorador del componente
@Component({
  selector: 'app-sales-history',
  standalone: false,
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS } // Proveedor del formato de fecha
  ]
})
export class SalesHistoryComponent implements OnInit, AfterViewInit {

  // FormGroup para el formulario de búsqueda
  searchForm: FormGroup;
  
  // Opciones para el campo de búsqueda
  searchOptions: any[] = [
    { value: "date", description: "Por Fechas" },
    { value: "number", description: "Numero Venta" }
  ]
  
  // Columnas que se mostrarán en la tabla
  tableColumns: string[] = ['dateRegistration', 'salesNumber', 'paymentType', 'total', 'actions'];
  
  // Datos iniciales para la tabla
  startData: Sales[] = [];
  
  // Fuente de datos para la tabla Material
  salesListData = new MatTableDataSource(this.startData);
  
  // Referencia al paginador de la tabla
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  // Constructor del componente
  constructor(
    private fb: FormBuilder, // Para crear formularios reactivos
    private dialog: MatDialog, // Para abrir modales
    private _saleService: SaleService, // Servicio para manejar ventas
    private _utilityService: UtilityService // Servicio de utilidades
  ) {
    // Inicialización del formulario de búsqueda
    this.searchForm = this.fb.group({
      searchBy: ['date'], // Campo para seleccionar tipo de búsqueda
      number: [''], // Número de venta para búsqueda
      startDate: [''], // Fecha de inicio para búsqueda por rango
      endDate: [''] // Fecha de fin para búsqueda por rango
    });

    // Suscripción a cambios en el campo searchBy para resetear otros campos
    this.searchForm.get("searchBy")?.valueChanges.subscribe((value) => {
      this.searchForm.patchValue({
        number: "",
        startDate: "",
        endDate: ""
      })
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.searchSales(); // Realiza una búsqueda inicial
  }

  // Método que se ejecuta después de que la vista se ha inicializado
  ngAfterViewInit(): void {
    // Asignamos el paginador a la tabla
    this.salesListData.paginator = this.tablePagination;
  }

  // Método para aplicar filtro a la tabla
  applyTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.salesListData.filter = filterValue.trim().toLocaleLowerCase();
  }

  // Método para buscar ventas según los criterios del formulario
  searchSales() {
    let _startDate: string = "";
    let _endDate: string = "";

    // Si la búsqueda es por fecha, validamos y formateamos las fechas
    if (this.searchForm.value.searchBy == "date") {
      _startDate = moment(this.searchForm.value.startDate).format("DD/MM/YYYY");
      _endDate = moment(this.searchForm.value.endDate).format("DD/MM/YYYY");

      // Validación de fechas
      if (_startDate == "Invalid date" || _endDate == "Invalid date") {
        this._utilityService.displayAlert("Debe ingresar ambas fechas", "Oops");
        return;
      }
    }

    // Llamada al servicio para obtener el historial de ventas
    this._saleService.history(
      this.searchForm.value.searchBy, // Tipo de búsqueda
      this.searchForm.value.number,   // Número de venta (si aplica)
      _startDate,                    // Fecha inicio (si aplica)
      _endDate                       // Fecha fin (si aplica)
    ).subscribe({
      next: (data) => {
        if (data.status)
          this.salesListData = data.value; // Asignamos los datos si hay resultados
        else
          this._utilityService.displayAlert("No se encontraron datos", "Oops")
      },
      error: (e) => { console.log(e) },
    })
  }

  // Método para ver el detalle de una venta en un modal
  seeDetailSales(_sales: Sales) {
    this.dialog.open(ModalDetailSalesComponent, {
      data: _sales, // Pasamos los datos de la venta al modal
      disableClose: true, // El modal no se puede cerrar haciendo clic fuera
      width: "1000px", // Ancho del modal
    })
  }
}