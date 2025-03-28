import { Injectable } from '@angular/core';                     // Importa el decorador Injectable para permitir la inyección de dependencias en la clase.

import { HttpClient } from '@angular/common/http';              // Importa el cliente HTTP de Angular para realizar solicitudes HTTP.
import { Observable } from 'rxjs';                              // Importa Observable de RxJS para manejar flujos de datos asíncronos.
import { environment } from '../../environments/environment';   // Importa la configuración del entorno, que contiene variables como la URL base de la API.
import { ResponseApi } from '../Interfaces/response-api';       // Importa la interfaz que define la estructura de la respuesta de la API.

@Injectable({                                                   // Decorador que indica que la clase puede ser inyectada en otros componentes o servicios.
  providedIn: 'root'                                            // Indica que el servicio es un singleton y está disponible en toda la aplicación.
})
export class CategoryService {                                  // Define la clase CategoryService que contiene métodos para interactuar con la API de categoria.

  private urlApi:string = environment.endpoint + "Category/";   // Define la URL base de la API para las operaciones relacionadas con categoria.
  
  constructor(private htt:HttpClient) { }                       // Constructor que inyecta el HttpClient para realizar solicitudes HTTP.

  list():Observable<ResponseApi>{                               // Método para obtener la lista de categoria, devuelve un Observable con la respuesta de la API. 
    return this.htt.get<ResponseApi>(`${this.urlApi}List`);     // Realiza una solicitud GET a la API para obtener la lista de categoria.
  }
}
