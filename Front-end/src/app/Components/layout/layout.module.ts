// Importaciones necesarias de Angular
import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo
import { CommonModule } from '@angular/common'; // Importa CommonModule que proporciona funcionalidades comunes de Angular

// Importaciones de módulos y componentes específicos del layout
import { LayoutRoutingModule } from './layout-routing.module';                                          // Importa el módulo de enrutamiento específico para el layout
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';                           // Importa el componente del panel de control
import { UsersComponent } from './Pages/users/users.component';                                         // Importa el componente para gestionar usuarios
import { ProductComponent } from './Pages/product/product.component';                                   // Importa el componente para gestionar productos
import { SalesComponent } from './Pages/sales/sales.component';                                         // Importa el componente para gestionar ventas
import { SalesHistoryComponent } from './Pages/sales-history/sales-history.component';                  // Importa el componente para mostrar el historial de ventas
import { ReportComponent } from './Pages/report/report.component';                                      // Importa el componente para generar reportes
import { SharedModule } from '../../Reusable/shared/shared.module';                                     // Importa el módulo compartido que contiene componentes y servicios reutilizables
import { ModalUsersComponent } from './Modals/modal-users/modal-users.component';                       // Importa el componente modal para gestionar usuarios
import { ModalProductComponent } from './Modals/modal-product/modal-product.component';                 // Importa el componente modal para gestionar productos
import { ModalDetailSalesComponent } from './Modals/modal-detail-sales/modal-detail-sales.component';   // Importa el componente modal para mostrar detalles de ventas

// Definición del módulo de layout
@NgModule({
  declarations: [
    // Declara los componentes que pertenecen a este módulo
    DashBoardComponent,         // Componente del panel de control
    UsersComponent,             // Componente para gestionar usuarios
    ProductComponent,           // Componente para gestionar productos
    SalesComponent,             // Componente para gestionar ventas
    SalesHistoryComponent,      // Componente para mostrar el historial de ventas
    ReportComponent,            // Componente para generar reportes
    ModalUsersComponent,        // Componente modal para gestionar usuarios
    ModalProductComponent,      // Componente modal para gestionar productos
    ModalDetailSalesComponent   // Componente modal para mostrar detalles de ventas
  ],
  imports: [
    // Importa otros módulos necesarios para este módulo
    CommonModule,         // Módulo común de Angular
    LayoutRoutingModule,  // Módulo de enrutamiento específico para el layout
    SharedModule          // Módulo compartido que contiene componentes y servicios reutilizables
  ]
})
// Exporta la clase LayoutModule que agrupa los componentes y módulos relacionados con el layout
export class LayoutModule { }