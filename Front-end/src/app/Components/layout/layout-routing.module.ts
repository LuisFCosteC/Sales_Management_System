// Importaciones necesarias de Angular
import { NgModule } from '@angular/core';                                               // Importa el decorador NgModule para definir un módulo
import { RouterModule, Routes } from '@angular/router';                                 // Importa RouterModule y Routes para la configuración de rutas
import { LayoutComponent } from './layout.component';                                   // Importa el componente principal del layout
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';           // Importa el componente del panel de control
import { UsersComponent } from './Pages/users/users.component';                         // Importa el componente para gestionar usuarios
import { ProductComponent } from './Pages/product/product.component';                   // Importa el componente para gestionar productos
import { SalesComponent } from './Pages/sales/sales.component';                         // Importa el componente para gestionar ventas
import { SalesHistoryComponent } from './Pages/sales-history/sales-history.component';  // Importa el componente para mostrar el historial de ventas
import { ReportComponent } from './Pages/report/report.component';                      // Importa el componente para generar reportes

// Definición de las rutas de la aplicación
const routes: Routes = [{
  path: '',                     // Ruta base para el layout
  component: LayoutComponent,   // Componente que se renderiza en la ruta base
  children: [                   // Rutas hijas que se renderizan dentro del LayoutComponent
    { path: 'dashboard', component: DashBoardComponent },         // Ruta para el panel de control
    { path: 'users', component: UsersComponent },                 // Ruta para gestionar usuarios
    { path: 'product', component: ProductComponent },             // Ruta para gestionar productos
    { path: 'sales', component: SalesComponent },                 // Ruta para gestionar ventas
    { path: 'sales-history', component: SalesHistoryComponent },  // Ruta para mostrar el historial de ventas
    { path: 'report', component: ReportComponent },               // Ruta para generar reportes
  ]
}];

// Decorador NgModule que define el módulo de enrutamiento
@NgModule({
  imports: [RouterModule.forChild(routes)],   // Importa RouterModule y configura las rutas definidas
  exports: [RouterModule]                     // Exporta RouterModule para que esté disponible en otros módulos
})
// Exporta la clase LayoutRoutingModule que contiene la configuración de rutas para el layout
export class LayoutRoutingModule { }