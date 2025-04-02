import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductComponent } from '../../Modals/modal-product/modal-product.component';
import { Product } from '../../../../Interfaces/product';
import { ProductService } from '../../../../Services/product.service';
import { UtilityService } from '../../../../Reusable/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, AfterViewInit{

  tableColumns: string[] = ['name', 'category', 'stock', 'price', 'state', 'actions'];
  dataStart: Product[] = [];
  dataListProduct = new MatTableDataSource(this.dataStart);
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _productService: ProductService,
    private _utilityService: UtilityService
  ) {}

  getProduct() {
    this._productService.list().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListProduct.data = data.value;
        } else {
          this._utilityService.displayAlert("No se encontraron datos", "Oops!");
        }
      },
      error: (e) => {
        console.error("Error al obtener los productos:", e);
      }
    });
  }

  ngOnInit(): void {
    this.getProduct();
  }

  ngAfterViewInit(): void {
    this.dataListProduct.paginator = this.tablePagination;
  }

  applyTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListProduct.filter = filterValue.trim().toLocaleLowerCase();
  }

  
  newProduct () {
    this.dialog.open(ModalProductComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === "true") this.getProduct();
    });
  }

  editProduct (product: Product) {
    this.dialog.open(ModalProductComponent, {
      disableClose: true,
      data: product
    }).afterClosed().subscribe(result => {
      if (result === "true") this.getProduct();
    });
  }

  deleteProduct (product: Product) {
    Swal.fire({
      title: '¿Desea eliminar el Producto?',
      text: product.name,
      icon: "warning",
      confirmButtonColor: '#FF8F00',
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No, volver'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.delete(product.idProduct).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilityService.displayAlert("El producto fue eliminado", "Eliminado!");
              this.getProduct();
            } else {
              this._utilityService.displayAlert("No se pudo eliminar el producto", "Error");
            }
          },
          error: (e) => {
            console.error("Error al eliminar el producto:", e);
          }
        });
      }
    });
  }
}
