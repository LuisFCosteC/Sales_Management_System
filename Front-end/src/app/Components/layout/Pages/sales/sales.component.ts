// Importación de módulos y dependencias necesarias
import { Component, OnInit } from '@angular/core'; // Componente base de Angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para manejo de formularios
import { MatTableDataSource } from '@angular/material/table'; // Para manejar datos en tablas Material
import { ProductService } from '../../../../Services/product.service'; // Servicio para productos
import { SaleService } from '../../../../Services/sale.service'; // Servicio para ventas
import { UtilityService } from '../../../../Reusable/utility.service'; // Servicio de utilidades
import { Product } from '../../../../Interfaces/product'; // Interfaz de producto
import { Sales } from '../../../../Interfaces/sales'; // Interfaz de venta
import { DetailSales } from '../../../../Interfaces/detail-sales'; // Interfaz de detalle de venta
import Swal from 'sweetalert2'; // Para alertas visuales

// Decorador que define el componente
@Component({
  selector: 'app-sales', // Selector para usar en templates
  standalone: false, // Indica que no es un componente standalone
  templateUrl: './sales.component.html', // Ruta del template HTML
  styleUrl: './sales.component.css' // Ruta del archivo CSS
})
export class SalesComponent implements OnInit {

  // Propiedades del componente

  listProducts: Product[] = [];  // Lista completa de productos disponibles
  listProductsFilter: Product[] = [];  // Lista de productos filtrados para búsqueda
  listProductsForSale: DetailSales[] = [];  // Lista de productos seleccionados para la venta
  lockRegisterButton: boolean = false;  // Bandera para bloquear el botón de registro durante una operación
  selectedProduct!: Product;  // Producto actualmente seleccionado
  defaultPaymentType: string = 'Efectivo';  // Tipo de pago por defecto
  totalPayable: number = 0;  // Total a pagar en la venta
  productSalesForm: FormGroup;  // Formulario para agregar productos a la venta
  tableColumns: string[] = ['product', 'quantity', 'price', 'total', 'actions'];  // Columnas a mostrar en la tabla de productos
  dataDetailSales = new MatTableDataSource(this.listProductsForSale);  // Fuente de datos para la tabla de productos en la venta

  /**
   * Método para filtrar productos basado en un criterio de búsqueda
   * @param search Puede ser un string o un objeto Product
   * @returns Lista de productos filtrados
   */
  returnProductByFilter(search: any): Product[] {
    // Normaliza el valor de búsqueda a minúsculas
    const valueSearched = typeof search === "string" ? search.toLowerCase() : search.name.toLocaleLowerCase();
    // Filtra los productos cuyo nombre incluya el valor buscado
    return this.listProducts.filter(item => item.name.toLowerCase().includes(valueSearched));
  }

  // Constructor del componente
  constructor(
    private fb: FormBuilder, // Para construir formularios reactivos
    private _productService: ProductService, // Servicio de productos
    private _saleService: SaleService, // Servicio de ventas
    private _utilityService: UtilityService, // Servicio de utilidades
  ) {
    // Inicialización del formulario con validadores
    this.productSalesForm = this.fb.group({
      product: ["", Validators.required], // Campo requerido
      quantity: ["", Validators.required], // Campo requerido
    });

    // Carga inicial de productos disponibles
    this._productService.list().subscribe({
      next: (data) => {
        if (data.status) {
          const list = data.value as Product[];
          // Filtra solo productos activos y con stock disponible
          this.listProducts = list.filter(p => p.isActive == 1 && p.stock > 0);
        }
      },
      error: (e) => { } // Manejo básico de errores
    });

    // Suscripción a cambios en el campo de producto para filtrado en tiempo real
    this.productSalesForm.get('product')?.valueChanges.subscribe(value => {
      this.listProductsFilter = this.returnProductByFilter(value);
    });
  }

  // Método del ciclo de vida OnInit (no implementado en este caso)
  ngOnInit(): void {
  }

  /**
   * Método para mostrar el nombre del producto en el autocompletado
   * @param product El producto a mostrar
   * @returns El nombre del producto
   */
  showProduct(product: Product): string {
    return product.name;
  }

  /**
   * Método que se ejecuta al seleccionar un producto del autocompletado
   * @param event Evento de selección
   */
  productForSale(event: any) {
    this.selectedProduct = event.option.value; // Asigna el producto seleccionado
  }

  /**
   * Método para agregar un producto a la lista de venta
   */
  addProductForSale() {
    // Obtiene la cantidad del formulario
    const _quantity: number = this.productSalesForm.value.quantity;
    // Obtiene el precio del producto seleccionado
    const _price: number = parseFloat(this.selectedProduct.price);
    // Calcula el total para este producto
    const _total: number = _quantity * _price;
    // Actualiza el total general de la venta
    this.totalPayable = this.totalPayable + _total;

    // Agrega el producto a la lista de venta
    this.listProductsForSale.push({
      idProduct: this.selectedProduct.idProduct,
      descriptionProduct: this.selectedProduct.name,
      quantity: _quantity,
      priceText: String(_price.toFixed(2)), // Formatea a 2 decimales
      totalText: String(_total.toFixed(2)), // Formatea a 2 decimales
    })

    // Actualiza la fuente de datos de la tabla
    this.dataDetailSales = new MatTableDataSource(this.listProductsForSale);

    // Resetea los campos del formulario
    this.productSalesForm.patchValue({
      product: '',
      quantity: ''
    })
  }

  /**
   * Método para eliminar un producto de la lista de venta
   * @param detail Detalle de venta a eliminar
   */
  deleteProduct(detail: DetailSales) {
    // Resta el total del producto eliminado
    this.totalPayable = this.totalPayable - parseFloat(detail.totalText),
      // Filtra la lista para quitar el producto
      this.listProductsForSale = this.listProductsForSale.filter(p => p.idProduct != detail.idProduct);
    // Actualiza la fuente de datos de la tabla
    this.dataDetailSales = new MatTableDataSource(this.listProductsForSale);
  }

  /**
   * Método para registrar la venta completa
   */
  registerSale() {
    // Verifica que haya productos en la lista
    if (this.listProductsForSale.length > 0) {
      this.lockRegisterButton = true; // Bloquea el botón durante el registro

      // Prepara el objeto de venta para enviar al backend
      const request: Sales = {
        paymentType: this.defaultPaymentType,
        totalText: String(this.totalPayable.toFixed(2)), // Total formateado
        detailSales: this.listProductsForSale // Lista de productos
      }

      // Llama al servicio para registrar la venta
      this._saleService.register(request).subscribe({
        next: (response) => {
          if (response.status) {
            // Resetea los valores si la venta fue exitosa
            this.totalPayable = 0.00;
            this.listProductsForSale = [];
            this.dataDetailSales = new MatTableDataSource(this.listProductsForSale);
            
            // Muestra alerta de éxito
            Swal.fire({
              icon: 'success',
              title: 'Venta Registrada!',
              text: `Numero de venta: ${response.value.salesNumber}`
            })
          } else {
            // Muestra alerta de error
            this._utilityService.displayAlert("No se pudo registrar la venta", "Oops");
          }
        },
        complete: () => {
          this.lockRegisterButton = false; // Desbloquea el botón
        },
        error: (e) => { console.log } // Manejo básico de errores
      })
    }
  }
}