// Importaciones necesarias para el componente
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';  // Importa decoradores y funcionalidades básicas de Angular
import { FormBuilder, FormGroup } from '@angular/forms';                      // Importa clases para manejo de formularios reactivos
import { MatTableDataSource } from '@angular/material/table';                 // Importa DataSource para manejar datos en tablas de Material
import { MatPaginator } from '@angular/material/paginator';                   // Importa componente de paginación para tablas
import { MatDialog } from '@angular/material/dialog';                         // Importa servicio para manejar diálogos modales

import { MAT_DATE_FORMATS } from '@angular/material/core';  // Importa configuraciones de formato de fecha para Material
import moment from 'moment';                                // Importa librería para manejo de fechas

import { ModalDetailSalesComponent } from '../../Modals/modal-detail-sales/modal-detail-sales.component';   // Importa componente de modal para detalles de venta
import { Sales } from '../../../../Interfaces/sales';                                                       // Importa interfaz que define la estructura de datos de ventas
import { SaleService } from '../../../../Services/sale.service';                                            // Importa servicio para manejar operaciones de ventas
import { UtilityService } from '../../../../Reusable/utility.service';                                      // Importa servicio con utilidades comunes

// Configuración de formatos de fecha para Angular Material
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Formato de fecha al parsear
  },
  display: {
    dateInput: 'DD/MM/YYYY',    // Formato de fecha al mostrar
    monthYearLabel: 'MMM YYYY', // Formato para etiquetas de mes y año
  }
}

// Decorador que define el componente
@Component({
  selector: 'app-sales-history',                  // Selector del componente
  standalone: false,                              // Indica que no es un componente independiente
  templateUrl: './sales-history.component.html',  // Ruta de la plantilla HTML
  styleUrls: ['./sales-history.component.css'],   // Ruta de los estilos CSS
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS } // Provee la configuración de formatos de fecha
  ]
})
// Clase del componente que implementa OnInit y AfterViewInit
export class SalesHistoryComponent implements OnInit, AfterViewInit {

  searchForm: FormGroup;                              // Formulario reactivo para búsquedas
  searchOptions: any[] = [                            // Opciones de búsqueda disponibles
    { value: "date", description: "Por Fechas" },     // Búsqueda por rango de fechas
    { value: "number", description: "Numero Venta" }  // Búsqueda por número de venta
  ]
  tableColumns: string[] = ['dateRegistration', 'salesNumber', 'paymentType', 'total', 'actions'];  // Columnas de la tabla
  salesListData = new MatTableDataSource<Sales>([]);                                                // Fuente de datos para la tabla, inicializada vacía
  
  @ViewChild(MatPaginator) tablePagination!: MatPaginator; // Referencia al paginador de la tabla

  // Constructor del componente con inyección de dependencias
  constructor(
    private fb: FormBuilder,                  // Servicio para construir formularios reactivos
    private dialog: MatDialog,                // Servicio para manejar diálogos modales
    private _saleService: SaleService,        // Servicio para operaciones de ventas
    private _utilityService: UtilityService   // Servicio de utilidades comunes
  ) {
    // Inicialización del formulario de búsqueda con valores por defecto
    this.searchForm = this.fb.group({
      searchBy: ['date'],   // Método de búsqueda predeterminado
      number: [''],         // Campo para número de venta
      startDate: [''],      // Fecha de inicio para búsqueda por rango
      endDate: ['']         // Fecha de fin para búsqueda por rango
    });

    // Suscripción a cambios en el método de búsqueda
    this.searchForm.get("searchBy")?.valueChanges.subscribe((value) => {
      // Limpia los campos cuando cambia el método de búsqueda
      this.searchForm.patchValue({
        number: "",
        startDate: "",
        endDate: ""
      });
    });
  }

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
  }

  // Método del ciclo de vida que se ejecuta después de inicializar la vista
  ngAfterViewInit(): void {
    this.salesListData.paginator = this.tablePagination; // Asigna el paginador a la fuente de datos
  }

  // Método para validar si la búsqueda es válida según los campos completados
  isSearchValid(): boolean {
    const form = this.searchForm;
    const searchBy = form.get('searchBy')?.value;     // Obtiene el método de búsqueda seleccionado
    const number = form.get('number')?.value;         // Obtiene el número de venta ingresado
    const startDate = form.get('startDate')?.value;   // Obtiene la fecha de inicio
    const endDate = form.get('endDate')?.value;       // Obtiene la fecha de fin

    if (searchBy === 'number') {
      return !!number;                  // Valida si hay número ingresado para búsqueda por número
    } else if (searchBy === 'date') {
      return !!startDate && !!endDate;  // Valida si ambas fechas están ingresadas para búsqueda por rango
    }
    return false;
  }

  // Método para realizar la búsqueda de ventas
  searchSales() {
    // Verifica primero si la búsqueda es válida
    if (!this.isSearchValid()) {
      return; // Sale del método si la búsqueda no es válida
    }

    let _startDate: string = "";
    let _endDate: string = "";

    // Formatea las fechas si la búsqueda es por rango
    if (this.searchForm.value.searchBy === "date") {
      _startDate = moment(this.searchForm.value.startDate).format("DD/MM/YYYY");
      _endDate = moment(this.searchForm.value.endDate).format("DD/MM/YYYY");
    }

    // Llama al servicio para obtener el historial de ventas
    this._saleService.history(
      this.searchForm.value.searchBy,   // Método de búsqueda
      this.searchForm.value.number,     // Número de venta (si aplica)
      _startDate,                       // Fecha de inicio formateada
      _endDate                          // Fecha de fin formateada
    ).subscribe({
      next: (data) => {
        // Procesa la respuesta exitosa
        if (data.status && data.value && data.value.length > 0) {
          this.salesListData.data = data.value; // Asigna los datos a la tabla
          if (this.salesListData.paginator) {
            this.salesListData.paginator.firstPage(); // Vuelve a la primera página
          }
        } else {
          // Muestra alerta si no se encontraron datos
          this._utilityService.displayAlert("No se encontraron datos", "Oops");
          this.salesListData.data = []; // Limpia la tabla
        }
      },
      error: (e) => {
        console.error(e); // Registra el error en consola
        this._utilityService.displayAlert("Error al obtener los datos", "Error"); // Muestra alerta de error
        this.salesListData.data = []; // Limpia la tabla
      }
    });
  }

  // Método para abrir el modal con detalles de una venta
  seeDetailSales(_sales: Sales) {
    this.dialog.open(ModalDetailSalesComponent, {
      data: _sales,         // Pasa los datos de la venta seleccionada
      disableClose: true,   // Evita que el modal se cierre al hacer clic fuera
      width: "1000px",      // Ancho del modal
    });
  }
}