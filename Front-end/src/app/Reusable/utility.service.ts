import { Injectable } from '@angular/core';                 // Importa el decorador Injectable de Angular core para crear un servicio.

import { MatSnackBar } from '@angular/material/snack-bar';  // Importa MatSnackBar para mostrar notificaciones en la aplicación.
import { Session } from '../Interfaces/session';            // Importa la interfaz Session que define la estructura de la sesión del usuario.

@Injectable({
  providedIn: 'root'        // Indica que este servicio está disponible en toda la aplicación.
})
export class UtilityService {

  constructor(private _snackBar: MatSnackBar) { }       // Inyecta MatSnackBar en el constructor para poder usarlo en el servicio.

  // Método para mostrar una alerta en forma de notificación.
  displayAlert(message: string, type: string) {
    this._snackBar.open(message, type, {      // Abre una notificación con el mensaje y tipo especificados.
      horizontalPosition: 'end',              // Posición horizontal de la notificación (derecha).
      verticalPosition: 'top',                // Posición vertical de la notificación (parte superior).
      duration: 3000,                         // Duración de la notificación en milisegundos (3 segundos).
    });
  }

  // Método para guardar la sesión del usuario en el almacenamiento local.
  saveUserSession(userSession: Session) {
    localStorage.setItem("user", JSON.stringify(userSession)); // Convierte el objeto de sesión a una cadena JSON y lo guarda en localStorage.
  }

  // Método para recuperar la sesión del usuario desde el almacenamiento local.
  gateUserSession() {
    const dataChain = localStorage.getItem("user");   // Obtiene la cadena JSON del almacenamiento local.
    const user = JSON.parse(dataChain!);              // Convierte la cadena JSON de vuelta a un objeto.
    return user;                                      // Devuelve el objeto de sesión del usuario.
  }

  // Método para eliminar la sesión del usuario del almacenamiento local.
  deleteUserSession() {
    localStorage.removeItem("user"); // Elimina el elemento "user" del almacenamiento local.
  }
}