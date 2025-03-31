// Importaciones necesarias de Angular y otros módulos
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../Interfaces/login';                     // Interfaz para la estructura del objeto de inicio de sesión
import { UsersService } from '../../Services/users.service';        // Servicio para manejar la lógica de usuarios
import { UtilityService } from '../../Reusable/utility.service';    // Servicio para utilidades como alertas y manejo de sesión

// Decorador que define el componente
@Component({
  selector: 'app-login',                    // Selector del componente
  standalone: false,                        // Indica que este componente no es independiente
  templateUrl: './login.component.html',    // Ruta de la plantilla HTML
  styleUrl: './login.component.css'         // Ruta del archivo de estilos CSS
})

// Clase del componente de inicio de sesión
export class LoginComponent implements OnInit {

  // Propiedades del componente
  loginForm: FormGroup;         // Grupo de formularios para manejar el formulario de inicio de sesión
  hidePassword: boolean = true; // Controla la visibilidad de la contraseña
  showLoading: boolean = false; // Controla la visualización de un indicador de carga

  // Constructor del componente
  constructor(
    private fb: FormBuilder,                // Inyección de FormBuilder para crear formularios
    private router: Router,                 // Inyección del servicio Router para la navegación
    private _usersService: UsersService,    // Inyección del servicio de usuarios
    private _utilityService: UtilityService // Inyección del servicio de utilidades
  ) {
    // Inicialización del formulario de inicio de sesión
    this.loginForm = this.fb.group({
      email: ['', Validators.required],     // Campo de email, requerido
      password: ['', Validators.required],  // Campo de contraseña, requerido
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    
  }

  // Método para manejar el inicio de sesión
  login() {
    this.showLoading = true;                    // Muestra el indicador de carga
    const request: Login = {                    // Crea un objeto de solicitud con los valores del formulario
      email: this.loginForm.value.email,        // Obtiene el email del formulario
      password: this.loginForm.value.password   // Obtiene la contraseña del formulario
    };

    // Llama al método de inicio de sesión del servicio de usuarios
    this._usersService.login(request).subscribe({
      next: (data) => {                                       // Maneja la respuesta exitosa
        if(data.status){                                      // Verifica si el inicio de sesión fue exitoso
          this._utilityService.saveUserSession(data.value);   // Guarda la sesión del usuario
          this.router.navigate(["pages"]);                   // Navega a la ruta "pages"
        } else {
          this._utilityService.displayAlert("No se encontraron coincidencias", "Opps!");  // Muestra una alerta si no se encontraron coincidencias
        }
      },
      complete: () => {
        this.showLoading = false;   // Oculta el indicador de carga al completar la solicitud
      },
      error: () => {
        this._utilityService.displayAlert("Hubo un error", "Opps!");  // Muestra una alerta en caso de error
      }
    });
  }
}
