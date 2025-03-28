import { Injectable } from '@angular/core';                    // Importa el decorador Injectable para permitir la inyección de dependencias en la clase.

import { HttpClient } from '@angular/common/http';             // Importa el cliente HTTP de Angular para realizar solicitudes HTTP.
import { Observable } from 'rxjs';                             // Importa Observable de RxJS para manejar flujos de datos asíncronos.
import { environment } from '../../environments/environment';  // Importa la configuración del entorno, que contiene variables como la URL base de la API.
import { ResponseApi } from '../Interfaces/response-api';      // Importa la interfaz que define la estructura de la respuesta de la API.
import { Sales } from '../Interfaces/sales';                   // Importa la interfaz que define la estructura de los datos de las ventas.

@Injectable({                                                  // Decorador que indica que la clase puede ser inyectada en otros componentes o servicios.
  providedIn: 'root'                                           // Indica que el servicio es un singleton y está disponible en toda la aplicación.
})
export class SaleService {                                     // Define la clase SaleService que contiene métodos para interactuar con la API de ventas.

  private urlApi:string = environment.endpoint + "Sales/";     // Define la URL base de la API para las operaciones relacionadas con ventas.
  
  constructor(private htt:HttpClient) { }                      // Constructor que inyecta el HttpClient para realizar solicitudes HTTP.

  register(request:Sales):Observable<ResponseApi>{                          // Método para registrar una nueva venta, toma un objeto de tipo Sales y devuelve un Observable con la respuesta de la API.
    return this.htt.post<ResponseApi>(`${this.urlApi}Register`,request);    // Realiza una solicitud POST a la API para registrar una nueva venta.
  }

  history(searchBy:string,salesNumber:string,startDate:string,endDate:string):Observable<ResponseApi>{                                                      // Método para obtener el historial de ventas, toma parámetros de búsqueda y devuelve un Observable con la respuesta de la API.
    return this.htt.get<ResponseApi>(`${this.urlApi}History?searchBy=${searchBy}&salesNumber=${salesNumber}&startDate=${startDate}&endDate=${endDate}`);    // Realiza una solicitud GET a la API para obtener el historial de ventas.
  }

  report(startDate:string,endDate:string):Observable<ResponseApi>{                                          // Método para generar un reporte de ventas en un rango de fechas, toma las fechas de inicio y fin y devuelve un Observable con la respuesta de la API.
    return this.htt.get<ResponseApi>(`${this.urlApi}Report?startDate=${startDate}&endDate=${endDate}`);     // Realiza una solicitud GET a la API para generar un reporte de ventas.
  }
}