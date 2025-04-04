// Importaciones necesarias de Angular y otros módulos
import { Component, OnInit, Inject } from '@angular/core';                  // Importa Component, OnInit y Inject de Angular core
import { MAT_DIALOG_DATA } from '@angular/material/dialog';   // Importa herramientas para manejar diálogos de Angular Material
import { Sales } from '../../../../Interfaces/sales';
import { DetailSales } from '../../../../Interfaces/detail-sales';

@Component({
  selector: 'app-modal-detail-sales',
  standalone: false,
  templateUrl: './modal-detail-sales.component.html',
  styleUrl: './modal-detail-sales.component.css'
})
export class ModalDetailSalesComponent implements OnInit{

  dateRegistration: string = "";
  salesNumber: string = "";
  paymentType: string = "";
  totalText: string = "";
  detailSales: DetailSales[]=[];
  tableColumns: string[] = ['product', 'quantity', 'price', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public _sales: Sales) {
    this.dateRegistration = _sales.dateRegistration!;
    this.salesNumber = _sales.salesNumber!;
    this.paymentType = _sales.paymentType;
    this.totalText = _sales.totalText;
    this.detailSales = _sales.detailSales;
  }

  ngOnInit(): void {
      
  }
}
