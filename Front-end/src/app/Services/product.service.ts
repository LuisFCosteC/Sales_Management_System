import { Injectable } from '@angular/core';                    // Importa el decorador Injectable para permitir la inyección de dependencias en la clase.

import { HttpClient } from '@angular/common/http';             // Importa el cliente HTTP de Angular para realizar solicitudes HTTP.
import { Observable } from 'rxjs';                             // Importa Observable de RxJS para manejar flujos de datos asíncronos.
import { environment } from '../../environments/environment';  // Importa la configuración del entorno, que contiene variables como la URL base de la API.
import { ResponseApi } from '../Interfaces/response-api';      // Importa la interfaz que define la estructura de la respuesta de la API.
import { Product } from '../Interfaces/product';               // Importa la interfaz que define la estructura de los datos de los productos.

@Injectable({                                                  // Decorador que indica que la clase puede ser inyectada en otros componentes o servicios.
  providedIn: 'root'                                           // Indica que el servicio es un singleton y está disponible en toda la aplicación.
})
export class ProductService {                                  // Define la clase ProductService que contiene métodos para interactuar con la API de producto.

  private urlApi:string = environment.endpoint + "Product/";   // Define la URL base de la API para las operaciones relacionadas con producto.
  
  constructor(private htt:HttpClient) { }                      // Constructor que inyecta el HttpClient para realizar solicitudes HTTP.

  list():Observable<ResponseApi>{                                       // Método para obtener la lista de producto, devuelve un Observable con la respuesta de la API. 
    return this.htt.get<ResponseApi>(`${this.urlApi}List`);             // Realiza una solicitud GET a la API para obtener la lista de producto.
  }

  save(request:Product):Observable<ResponseApi>{                        // Método para guardar un nuevo producto, toma un objeto de tipo Users y devuelve un Observable con la respuesta de la API.
    return this.htt.post<ResponseApi>(`${this.urlApi}Save`,request);    // Realiza una solicitud POST a la API para guardar un nuevo producto.
  }

  edit(request:Product):Observable<ResponseApi>{                        // Método para editar un producto existente, toma un objeto de tipo Users y devuelve un Observable con la respuesta de la API. 
    return this.htt.put<ResponseApi>(`${this.urlApi}Edit`,request);     // Realiza una solicitud PUT a la API para editar un producto existente.
  }

  delete(id:number):Observable<ResponseApi>{                            // Método para eliminar un producto, toma un id de tipo number y devuelve un Observable con la respuesta de la API.
    return this.htt.delete<ResponseApi>(`${this.urlApi}Delete/${id}`);  // Realiza una solicitud DELETE a la API para eliminar un producto.
  }
}
