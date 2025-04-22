// Importaciones necesarias de Angular y otros servicios
import { Component, OnInit } from '@angular/core';                // Importa el decorador Component y la interfaz OnInit
import { Router } from '@angular/router';                         // Importa el servicio Router para la navegación
import { Menu } from '../../Interfaces/menu';                     // Importa la interfaz Menu que define la estructura de un menú
import { MenuService } from '../../Services/menu.service';        // Importa el servicio para gestionar menús
import { UtilityService } from '../../Reusable/utility.service';  // Importa un servicio utilitario para funciones comunes

// Decorador Component que define el componente Layout
@Component({
  selector: 'app-layout',                   // Selector del componente que se usará en las plantillas
  standalone: false,                        // Indica que este componente no es independiente
  templateUrl: './layout.component.html',   // Ruta al archivo de plantilla HTML del componente
  styleUrl: './layout.component.css'        // Ruta al archivo de estilos CSS del componente
})
// Clase del componente Layout que implementa OnInit
export class LayoutComponent implements OnInit {
  // Propiedades del componente
  listMenus: Menu[] = [];   // Arreglo para almacenar la lista de menús
  fullName: string = '';    // Almacena el nombre completo del usuario
  rolUsers: string = '';    // Almacena la descripción del rol del usuario

  // Constructor del componente que inyecta los servicios necesarios
  constructor(
    private router: Router,                   // Inyecta el servicio Router para la navegación
    private _menuService: MenuService,        // Inyecta el servicio MenuService para gestionar menús
    private _utilityService: UtilityService   // Inyecta el servicio UtilityService para funciones comunes
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtiene la sesión del usuario actual
    const user = this._utilityService.gateUserSession();

    // Verifica si hay un usuario en la sesión
    if (user != null) {
      this.fullName = user.fullName;          // Asigna el nombre completo del usuario
      this.rolUsers = user.roleDescription;   // Asigna la descripción del rol del usuario
      // Llama al servicio de menús para obtener la lista de menús del usuario
      this._menuService.list(user.idUsers).subscribe({
        next: (data) => {
          // Si la respuesta es exitosa, asigna la lista de menús
          if (data.status) this.listMenus = data.value;
        },
        error: (e) => {
          // Manejo de errores (actualmente vacío)
        }
      });
    }
  }

  // Método para cerrar sesión del usuario
  logOff() {
    this._utilityService.deleteUserSession(); // Elimina la sesión del usuario
    this.router.navigate(['login']); // Redirige al usuario a la página de inicio de sesión
  }
}