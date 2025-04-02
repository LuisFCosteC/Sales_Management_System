// Importaciones necesarias de Angular y otros módulos
import { Component, OnInit, Inject } from '@angular/core';                  // Importa Component, OnInit y Inject de Angular core
import { FormBuilder, FormGroup, Validators } from '@angular/forms';        // Importa herramientas para manejar formularios reactivos
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';   // Importa herramientas para manejar diálogos de Angular Material

import { Category } from '../../../../Interfaces/category';
import { Product } from '../../../../Interfaces/product';
import { CategoryService } from '../../../../Services/category.service';
import { ProductService } from '../../../../Services/product.service';
import { UtilityService } from '../../../../Reusable/utility.service';

@Component({
  selector: 'app-modal-product',
  standalone: false,
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.css'
})
export class ModalProductComponent implements OnInit {
  
  // Propiedades del componente
  formsProduct: FormGroup;            
  titleAction: string = "Agregar";  
  buttonAction: string = "Guardar";    
  listCategory: Category[] = [];    

  constructor(
    private modalCurent: MatDialogRef<ModalProductComponent>,
    @Inject(MAT_DIALOG_DATA) public dataProduct: Product,
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _utilityService: UtilityService
  ) {
    this.formsProduct = this.fb.group({
      name: ["", Validators.required],
      idCategory: ["", Validators.required],
      stock: ["", Validators.required],
      price: ["", Validators.required],
      isActive: ['1', Validators.required],
    });

    if(this.dataProduct != null) {
      this.titleAction = "Editar";      // Cambia el título a "Editar"
      this.buttonAction = "Actualizar"; // Cambia el texto del botón a "Actualizar"
    }

    this._categoryService.list().subscribe({
      next: (data) => {
        if (data.status) this.listCategory = data.value;
      },
      error: (e) => {} // Manejo de errores (vacío en este caso)
    });
  }

  ngOnInit(): void {
    if (this.dataProduct != null) {
      this.formsProduct.patchValue({
        name: this.dataProduct.name,
        idCategory: this.dataProduct.idCategory,
        stock: this.dataProduct.stock,
        price: this.dataProduct.price,
        isActive: this.dataProduct.isActive.toString()
      });
    }
  }

  SaveEdit_Product() {
    const _product: Product = {
      idProduct: this.dataProduct == null ? 0 : this.dataProduct.idProduct,
      name: this.formsProduct.value.name,
      idCategory: this.formsProduct.value.idCategory,
      descriptionCategory: "",
      price: this.formsProduct.value.price,
      stock: this.formsProduct.value.stock,
      isActive: parseInt(this.formsProduct.value.isActive)
    };

    if (this.dataProduct == null) {
      this._productService.save(_product).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilityService.displayAlert("El producto fue registrado", "Exito");
            this.modalCurent.close("true");
          } else {
            this._utilityService.displayAlert("No se pudo registrar el producto", "Error");
          }
        },
        error: (e) => {}
      });
    } else {
      this._productService.edit(_product).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilityService.displayAlert("El producto fue editado", "Exito");
            this.modalCurent.close("true");
          } else {
            this._utilityService.displayAlert("No se pudo editar el producto", "Error");
          }
        },
        error: (e) => {}
      });
    }
}
}
