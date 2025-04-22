// Importaciones necesarias de Angular
import { NgModule } from '@angular/core';                             // Importa el decorador NgModule
import { RouterModule, Routes } from '@angular/router';               // Importa RouterModule y Routes para la configuración de rutas
import { log } from 'console';                                        // Importa la función log de la consola (aunque no se utiliza en este código)
import { LoginComponent } from './Components/login/login.component';  // Importa el componente de inicio de sesión

// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },                                                     // Ruta por defecto que redirige a LoginComponent
  { path: 'login', component: LoginComponent },                                                                   // Ruta para acceder al componente de inicio de sesión
  { path: 'pages', loadChildren: () => import('./Components/layout/layout.module').then(m => m.LayoutModule) },   // Ruta que carga de forma diferida el módulo de diseño (layout)
  { path: '**', redirectTo: 'login', pathMatch: 'full' },                                                         // Ruta comodín que redirige a LoginComponent si no se encuentra la ruta solicitada
];

// Decorador NgModule que define el módulo de enrutamiento
@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Importa RouterModule y configura las rutas definidas
  exports: [RouterModule]                   // Exporta RouterModule para que esté disponible en toda la aplicación
})
// Exporta la clase AppRoutingModule que contiene la configuración de rutas
export class AppRoutingModule { }