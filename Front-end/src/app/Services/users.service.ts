import { Injectable } from '@angular/core';                   // Importa el decorador Injectable para permitir la inyección de dependencias en la clase.

import { HttpClient } from '@angular/common/http';            // Importa el cliente HTTP de Angular para realizar solicitudes HTTP.
import { Observable } from 'rxjs';                            // Importa Observable de RxJS para manejar flujos de datos asíncronos.
import { environment } from '../../environments/environment'; // Importa la configuración del entorno, que contiene variables como la URL base de la API.
import { ResponseApi } from '../Interfaces/response-api';     // Importa la interfaz que define la estructura de la respuesta de la API.
import { Login } from '../Interfaces/login';                  // Importa la interfaz que define la estructura de los datos necesarios para el inicio de sesión.
import { Users } from '../Interfaces/users';                  // Importa la interfaz que define la estructura de los datos de los usuarios.

@Injectable({                                                           // Decorador que indica que la clase puede ser inyectada en otros componentes o servicios.
  providedIn: 'root'                                                    // Indica que el servicio es un singleton y está disponible en toda la aplicación.
})
export class UsersService {                                             // Define la clase UsersService que contiene métodos para interactuar con la API de usuarios.
  
  private urlApi:string = environment.endpoint + "Users/";              // Define la URL base de la API para las operaciones relacionadas con usuarios.

  constructor(private htt:HttpClient) { }                               // Constructor que inyecta el HttpClient para realizar solicitudes HTTP.

  login(request:Login):Observable<ResponseApi>{                         // Método para iniciar sesión, toma un objeto de tipo Login y devuelve un Observable con la respuesta de la API.
    return this.htt.post<ResponseApi>(`${this.urlApi}Login`,request);   // Realiza una solicitud POST a la API para iniciar sesión.
  }

  list():Observable<ResponseApi>{                                       // Método para obtener la lista de usuarios, devuelve un Observable con la respuesta de la API. 
    return this.htt.get<ResponseApi>(`${this.urlApi}List`);             // Realiza una solicitud GET a la API para obtener la lista de usuarios.
  }

  save(request:Users):Observable<ResponseApi>{                          // Método para guardar un nuevo usuario, toma un objeto de tipo Users y devuelve un Observable con la respuesta de la API.
    return this.htt.post<ResponseApi>(`${this.urlApi}Save`,request);    // Realiza una solicitud POST a la API para guardar un nuevo usuario.
  }

  edit(request:Users):Observable<ResponseApi>{                          // Método para editar un usuario existente, toma un objeto de tipo Users y devuelve un Observable con la respuesta de la API. 
    return this.htt.put<ResponseApi>(`${this.urlApi}Edit`,request);     // Realiza una solicitud PUT a la API para editar un usuario existente.
  }

  delete(id:number):Observable<ResponseApi>{                            // Método para eliminar un usuario, toma un id de tipo number y devuelve un Observable con la respuesta de la API.
    return this.htt.delete<ResponseApi>(`${this.urlApi}Delete/${id}`);  // Realiza una solicitud DELETE a la API para eliminar un usuario.
  }
}

