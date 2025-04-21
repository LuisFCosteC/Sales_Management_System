// Importaciones necesarias de Angular y otros módulos
import { Component, OnInit, Inject } from '@angular/core';          // Importa los decoradores y funciones básicas de Angular
import { MAT_DIALOG_DATA } from '@angular/material/dialog';         // Importa la inyección de datos para diálogos de Material
import { Sales } from '../../../../Interfaces/sales';               // Importa la interfaz de ventas
import { DetailSales } from '../../../../Interfaces/detail-sales';  // Importa la interfaz de detalles de venta

// Decorador @Component que define los metadatos del componente
@Component({
  selector: 'app-modal-detail-sales',                   // Selector para usar este componente en plantillas
  standalone: false,                                    // Indica que no es un componente standalone (usa módulos tradicionales)
  templateUrl: './modal-detail-sales.component.html',   // Ruta a la plantilla HTML
  styleUrl: './modal-detail-sales.component.css'        // Ruta a los estilos CSS
})
export class ModalDetailSalesComponent implements OnInit {
  
  // Propiedades del componente:
  dateRegistration: string = "";    // Almacena la fecha de registro de la venta
  salesNumber: string = "";         // Almacena el número/nombre de la venta
  paymentType: string = "";         // Almacena el tipo de pago utilizado
  totalText: string = "";           // Almacena el total de la venta en formato texto
  detailSales: DetailSales[] = [];  // Arreglo para almacenar los detalles de los productos vendidos
  
  // Columnas a mostrar en la tabla de detalles
  tableColumns: string[] = ['product', 'quantity', 'price', 'total'];

  // Constructor del componente que recibe los datos de la venta a través del diálogo
  constructor(@Inject(MAT_DIALOG_DATA) public _sales: Sales) {
    // Inicializa las propiedades con los datos de la venta recibida
    this.dateRegistration = _sales.dateRegistration!;   // Asigna fecha (con operador ! para indicar que no es null)
    this.salesNumber = _sales.salesNumber!;             // Asigna número de venta
    this.paymentType = _sales.paymentType;              // Asigna tipo de pago
    this.totalText = _sales.totalText;                  // Asigna total en texto
    this.detailSales = _sales.detailSales;              // Asigna detalles de los productos
  }

  // Método del ciclo de vida OnInit (se ejecuta después del constructor)
  ngOnInit(): void {
  }
}