// Importaciones necesarias de Angular
import { NgModule } from '@angular/core';                                       // Importa el decorador NgModule para definir un módulo
import { CommonModule } from '@angular/common';                                 // Importa CommonModule que proporciona funcionalidades comunes de Angular
import { ReactiveFormsModule, FormsModule } from '@angular/forms';              // Importa módulos para trabajar con formularios reactivos y formularios basados en plantillas
import { HttpClientModule } from '@angular/common/http';                        // Importa HttpClientModule para realizar solicitudes HTTP

// Importaciones de componentes de Angular Material
import { MatCardModule } from '@angular/material/card';                         // Módulo para tarjetas
import { MatInputModule } from '@angular/material/input';                       // Módulo para campos de entrada
import { MatSelectModule } from '@angular/material/select';                     // Módulo para listas desplegables
import { MatProgressBarModule } from '@angular/material/progress-bar';          // Módulo para barras de progreso
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  // Módulo para spinners de progreso
import { MatGridListModule } from '@angular/material/grid-list';                // Módulo para listas en cuadrícula

// Importaciones de contenedores de Angular Material
import { LayoutModule } from '@angular/cdk/layout';                             // Módulo para diseño responsivo
import { MatToolbarModule } from '@angular/material/toolbar';                   // Módulo para barras de herramientas
import { MatSidenavModule } from '@angular/material/sidenav';                   // Módulo para paneles laterales
import { MatButtonModule } from '@angular/material/button';                     // Módulo para botones
import { MatIconModule } from '@angular/material/icon';                         // Módulo para iconos
import { MatListModule } from '@angular/material/list';                         // Módulo para listas

// Importaciones de tablas de Angular Material
import { MatTableModule } from '@angular/material/table';                       // Módulo para tablas
import { MatPaginatorModule } from '@angular/material/paginator';               // Módulo para paginación de tablas
import { MatSortModule } from '@angular/material/sort';                         // Módulo para ordenación de tablas
import { MatDialogModule } from '@angular/material/dialog';                     // Módulo para diálogos modales
import { MatSnackBarModule } from '@angular/material/snack-bar';                // Módulo para notificaciones tipo "snack bar"
import { MatTooltipModule } from '@angular/material/tooltip';                   // Módulo para tooltips
import { MatAutocompleteModule } from '@angular/material/autocomplete';         // Módulo para autocompletar
import { MatDatepickerModule } from '@angular/material/datepicker';             // Módulo para selectores de fecha

// Importaciones de módulos de fechas de Angular Material
import { MatNativeDateModule } from '@angular/material/core';                   // Módulo para soporte de fechas nativas
import { MomentDateModule } from '@angular/material-moment-adapter';            // Módulo para soporte de fechas con Moment.js

// Definición del módulo compartido
@NgModule({
  declarations: [],         // Aquí se pueden declarar componentes, directivas y pipes (en este caso está vacío)
  imports: [CommonModule],  // Importa CommonModule para funcionalidades comunes
  exports: [
    // Exporta módulos comunes de Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Exporta componentes de Angular Material
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,

    // Exporta contenedores de Angular Material
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    
    // Exporta tablas de Angular Material
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDatepickerModule,

    // Exporta módulos de fechas de Angular Material
    MatNativeDateModule,
    MomentDateModule,
  ],
  providers: [
    // Proveedores de módulos de fechas
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
  ],
})
// Exporta la clase SharedModule que agrupa y comparte módulos comunes y de Angular Material
export class SharedModule {}