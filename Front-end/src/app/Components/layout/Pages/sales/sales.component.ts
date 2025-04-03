import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../../Services/product.service';
import { SaleService } from '../../../../Services/sale.service';
import { UtilityService } from '../../../../Reusable/utility.service';
import { Product } from '../../../../Interfaces/product';
import { Sales } from '../../../../Interfaces/sales';
import { DetailSales } from '../../../../Interfaces/detail-sales';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-sales',
  standalone: false,
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{

  listProducts: Product[] = [];
  listProductsFilter: Product[] = [];
  listProductsForSale: DetailSales[] = [];
  lockRegisterButton: boolean = false;
  selectedProduct!: Product;
  defaultPaymentType: string = 'Efectivo';
  totalPayable: number = 0;
  productSalesForm: FormGroup;
  tableColumns: string[] = ['product', 'quantity', 'price', 'total', 'actions'];
  dataDetailSales = new MatTableDataSource(this.listProductsForSale);

  returnProductByFilter(search:any):Product[]{
    const valueSearched = typeof search === "string" ? search.toLowerCase() : search.name.toLocaleLowerCase();
    return this.listProducts.filter(item => item.name.toLowerCase().includes(valueSearched));
  }

  constructor(
    private fb: FormBuilder,
    private _productService : ProductService,
    private _saleService : SaleService,
    private _utilityService : UtilityService,
  ) {
    this.productSalesForm = this.fb.group({
      product: ["", Validators.required],
      quantity: ["", Validators.required],
    });

    this._productService.list().subscribe({
      next: (data) => {
        if (data.status){
          const list = data.value as Product[];
          this.listProducts = list.filter(p => p.isActive == 1 && p.stock > 0);
        }
      },
      error: (e) => {}
    });

    this.productSalesForm.get('product')?.valueChanges.subscribe(value => {
      this.listProductsFilter = this.returnProductByFilter(value);
    });
  }

  ngOnInit(): void {
  }

  showProduct(product: Product):string{
    return product.name;
  }

  productForSale(event:any){
    this.selectedProduct = event.option.value;
  }

  addProductForSale(){
    const _quantity: number = this.productSalesForm.value.quantity;
    const _price: number = parseFloat(this.selectedProduct.price) ;
    const _total: number = _quantity * _price;
    this.totalPayable = this.totalPayable + _total;

    this.listProductsForSale.push({
      idProduct : this.selectedProduct.idProduct,
      descriptionProduct : this.selectedProduct.name,
      quantity : _quantity,
      priceText : String(_price.toFixed(2)),
      totalText : String(_total.toFixed(2)),
    })

    this.dataDetailSales = new MatTableDataSource(this.listProductsForSale);

    this.productSalesForm.patchValue({
      product:'',
      quantity:''
    })
  }

  deleteProduct(detail: DetailSales){
    this.totalPayable = this.totalPayable - parseFloat(detail.totalText),
    this.listProductsForSale = this.listProductsForSale.filter(p => p.idProduct != detail.idProduct);
    this.dataDetailSales = new MatTableDataSource(this.listProductsForSale);
  }

  registerSale(){
    if(this.listProductsForSale.length > 0){
      this.lockRegisterButton = true;
      const request: Sales = {
        paymentType: this.defaultPaymentType,
        totalText: String(this.totalPayable.toFixed(2)),
        detailSales: this.listProductsForSale
      }

      this._saleService.register(request).subscribe({
        next: (response) => {
          if(response.status){
            this.totalPayable = 0.00;
            this.listProductsForSale = [];
            this.dataDetailSales = new MatTableDataSource(this.listProductsForSale);
            Swal.fire({
              icon: 'success',
              title: 'Venta Registrada!',
              text: `Numero de venta: ${response.value.salesNumber}`
            })
          } else {
            this._utilityService.displayAlert("No se pudo registrar la venta", "Oops");
          }
        },
        complete:()=>{
          this.lockRegisterButton = false;
        },
        error:(e) => {console.log}
      })
    }
  }
}
