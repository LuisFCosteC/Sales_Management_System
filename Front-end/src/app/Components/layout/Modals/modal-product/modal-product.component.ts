// Importación de módulos y dependencias necesarias
import { Component, OnInit, Inject } from '@angular/core';                  // Componentes básicos de Angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms';        // Utilidades para formularios reactivos
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';    // Componentes para diálogos de Material

// Importación de interfaces y servicios
import { Category } from '../../../../Interfaces/category';                  // Interfaz para categorías
import { Product } from '../../../../Interfaces/product';                    // Interfaz para productos
import { CategoryService } from '../../../../Services/category.service';     // Servicio para manejar categorías
import { ProductService } from '../../../../Services/product.service';       // Servicio para manejar productos
import { UtilityService } from '../../../../Reusable/utility.service';       // Servicio de utilidades comunes

// Decorador Componente con su configuración
@Component({
  selector: 'app-modal-product',              // Selector para usar este componente
  standalone: false,                          // No es un componente standalone
  templateUrl: './modal-product.component.html', // Ruta de la plantilla HTML
  styleUrl: './modal-product.component.css'   // Ruta del archivo CSS
})
export class ModalProductComponent implements OnInit {
  // Propiedades del componente
  formsProduct: FormGroup;                    // Formulario reactivo para el producto
  titleAction: string = "Agregar";            // Título por defecto para acciones (Agregar/Editar)
  buttonAction: string = "Guardar";           // Texto del botón por defecto (Guardar/Actualizar)
  listCategory: Category[] = [];              // Lista de categorías para el select

  // Constructor con inyección de dependencias
  constructor(
    private modalCurent: MatDialogRef<ModalProductComponent>, // Referencia al diálogo actual
    @Inject(MAT_DIALOG_DATA) public dataProduct: Product,     // Datos del producto inyectados
    private fb: FormBuilder,                // Constructor de formularios
    private _categoryService: CategoryService, // Servicio de categorías
    private _productService: ProductService,   // Servicio de productos
    private _utilityService: UtilityService    // Servicio de utilidades
  ) {
    // Inicialización del formulario con validaciones
    this.formsProduct = this.fb.group({
      name: ["", Validators.required],        // Campo nombre (requerido)
      idCategory: ["", Validators.required],  // Categoría (requerido)
      stock: ["", Validators.required],       // Stock (requerido)
      price: ["", Validators.required],       // Precio (requerido)
      isActive: ['1', Validators.required],   // Estado activo (requerido, por defecto '1')
    });

    // Si se recibe un producto (para edición), cambia los textos
    if(this.dataProduct != null) {
      this.titleAction = "Editar";           // Cambia título a "Editar"
      this.buttonAction = "Actualizar";       // Cambia texto del botón a "Actualizar"
    }

    // Carga las categorías disponibles
    this._categoryService.list().subscribe({
      next: (data) => {
        if (data.status) this.listCategory = data.value; // Si hay éxito, asigna las categorías
      },
      error: (e) => {}                         // Manejo de error (vacío en este caso)
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Si hay datos de producto (edición), llena el formulario
    if (this.dataProduct != null) {
      this.formsProduct.patchValue({
        name: this.dataProduct.name,
        idCategory: this.dataProduct.idCategory,
        stock: this.dataProduct.stock,
        price: this.dataProduct.price,
        isActive: this.dataProduct.isActive.toString() // Convierte a string el estado
      });
    }
  }

  // Método para guardar o editar un producto
  SaveEdit_Product() {
    // Crea objeto producto con los datos del formulario
    const _product: Product = {
      idProduct: this.dataProduct == null ? 0 : this.dataProduct.idProduct, // ID (0 si es nuevo)
      name: this.formsProduct.value.name,
      idCategory: this.formsProduct.value.idCategory,
      descriptionCategory: "", // Descripción vacía (se podría mejorar)
      price: this.formsProduct.value.price,
      stock: this.formsProduct.value.stock,
      isActive: parseInt(this.formsProduct.value.isActive) // Convierte a número el estado
    };

    // Si no hay dataProduct, es un nuevo producto
    if (this.dataProduct == null) {
      this._productService.save(_product).subscribe({
        next: (data) => {
          if (data.status) {
            // Muestra alerta de éxito y cierra el modal
            this._utilityService.displayAlert("El producto fue registrado", "Exito");
            this.modalCurent.close("true");
          } else {
            // Muestra alerta de error
            this._utilityService.displayAlert("No se pudo registrar el producto", "Error");
          }
        },
        error: (e) => {} // Manejo de error (vacío)
      });
    } else {
      // Si hay dataProduct, es una edición
      this._productService.edit(_product).subscribe({
        next: (data) => {
          if (data.status) {
            // Muestra alerta de éxito y cierra el modal
            this._utilityService.displayAlert("El producto fue editado", "Exito");
            this.modalCurent.close("true");
          } else {
            // Muestra alerta de error
            this._utilityService.displayAlert("No se pudo editar el producto", "Error");
          }
        },
        error: (e) => {} // Manejo de error (vacío)
      });
    }
  }
}