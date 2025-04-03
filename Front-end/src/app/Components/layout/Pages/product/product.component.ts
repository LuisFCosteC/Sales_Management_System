// Importación de módulos y componentes necesarios
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; // Para manejar datos de tabla
import { MatPaginator } from '@angular/material/paginator'; // Para paginación
import { MatDialog } from '@angular/material/dialog'; // Para diálogos modales
import { ModalProductComponent } from '../../Modals/modal-product/modal-product.component'; // Componente de modal
import { Product } from '../../../../Interfaces/product'; // Interfaz de producto
import { ProductService } from '../../../../Services/product.service'; // Servicio de productos
import { UtilityService } from '../../../../Reusable/utility.service'; // Servicio de utilidades
import Swal from 'sweetalert2'; // Para alertas bonitas

// Decorador del componente
@Component({
  selector: 'app-product', // Selector para usar en templates
  standalone: false, // No es un componente standalone
  templateUrl: './product.component.html', // Ruta del template HTML
  styleUrl: './product.component.css' // Ruta del archivo CSS
})
export class ProductComponent implements OnInit, AfterViewInit {
  // Columnas que se mostrarán en la tabla
  tableColumns: string[] = ['name', 'category', 'stock', 'price', 'state', 'actions'];
  
  // Datos iniciales vacíos para la tabla
  dataStart: Product[] = [];
  
  // Fuente de datos para la tabla Material
  dataListProduct = new MatTableDataSource(this.dataStart);
  
  // Referencia al paginador de la tabla
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  // Inyección de dependencias en el constructor
  constructor(
    private dialog: MatDialog, // Para abrir modales
    private _productService: ProductService, // Servicio de productos
    private _utilityService: UtilityService // Servicio de utilidades
  ) {}

  // Método para obtener los productos del servicio
  getProduct() {
    this._productService.list().subscribe({
      next: (data) => {
        if (data.status) {
          // Si hay datos, los asignamos a la tabla
          this.dataListProduct.data = data.value;
        } else {
          // Si no hay datos, mostramos alerta
          this._utilityService.displayAlert("No se encontraron datos", "Oops!");
        }
      },
      error: (e) => {
        // Manejo de errores
        console.error("Error al obtener los productos:", e);
      }
    });
  }

  // Hook que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.getProduct(); // Cargamos los productos
  }

  // Hook que se ejecuta después de inicializar la vista
  ngAfterViewInit(): void {
    // Asignamos el paginador a la tabla
    this.dataListProduct.paginator = this.tablePagination;
  }

  // Método para filtrar la tabla
  applyTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListProduct.filter = filterValue.trim().toLocaleLowerCase();
  }

  // Método para abrir modal de nuevo producto
  newProduct() {
    this.dialog.open(ModalProductComponent, {
      disableClose: true // Evita que se cierre haciendo click fuera
    }).afterClosed().subscribe(result => {
      // Si el resultado es true, refrescamos los productos
      if (result === "true") this.getProduct();
    });
  }

  // Método para abrir modal de edición de producto
  editProduct(product: Product) {
    this.dialog.open(ModalProductComponent, {
      disableClose: true,
      data: product // Pasamos el producto a editar
    }).afterClosed().subscribe(result => {
      // Si el resultado es true, refrescamos los productos
      if (result === "true") this.getProduct();
    });
  }

  // Método para eliminar un producto con confirmación
  deleteProduct(product: Product) {
    // Mostramos alerta de confirmación
    Swal.fire({
      title: '¿Desea eliminar el Producto?',
      text: product.name, // Mostramos el nombre del producto
      icon: "warning", // Icono de advertencia
      confirmButtonColor: '#FF8F00', // Color naranja
      confirmButtonText: "Si, eliminar",
      showCancelButton: true, // Mostramos botón de cancelar
      cancelButtonColor: '#3085d6', // Color azul
      cancelButtonText: 'No, volver'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si confirma, llamamos al servicio para eliminar
        this._productService.delete(product.idProduct).subscribe({
          next: (data) => {
            if (data.status) {
              // Si se eliminó correctamente
              this._utilityService.displayAlert("El producto fue eliminado", "Eliminado!");
              this.getProduct(); // Refrescamos la lista
            } else {
              // Si hubo error en el servidor
              this._utilityService.displayAlert("No se pudo eliminar el producto", "Error");
            }
          },
          error: (e) => {
            // Error en la petición
            console.error("Error al eliminar el producto:", e);
          }
        });
      }
    });
  }
}