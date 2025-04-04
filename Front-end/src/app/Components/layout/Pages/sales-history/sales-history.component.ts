// Importaciones necesarias para el componente
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';  // Importa Component, OnInit, AfterViewInit y ViewChild de Angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms';          // Importa herramientas para manejar formularios reactivos
import { MatTableDataSource } from '@angular/material/table';                 // Importa MatTableDataSource para gestionar datos en tablas
import { MatPaginator } from '@angular/material/paginator';                   // Importa MatPaginator para paginar los datos en la tabla
import { MatDialog } from '@angular/material/dialog';                         // Importa MatDialog para abrir diálogos modales

import {  MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { ModalDetailSalesComponent } from '../../Modals/modal-detail-sales/modal-detail-sales.component';
import { Sales } from '../../../../Interfaces/sales';
import { SaleService } from '../../../../Services/sale.service';
import { UtilityService } from '../../../../Reusable/utility.service';

@Component({
  selector: 'app-sales-history',
  standalone: false,
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.css'
})
export class SalesHistoryComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
      
  }
}
