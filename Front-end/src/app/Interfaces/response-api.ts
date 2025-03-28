export interface ResponseApi {                // Exporta una interfaz llamada 'ResponseApi' que define la estructura de una respuesta de API
    status: boolean,                          // Propiedad que indica el estado de la respuesta (true si la operación fue exitosa, false en caso contrario)
    msg: string,                              // Propiedad que contiene un mensaje descriptivo sobre el resultado de la operación
    value: any                                // Propiedad que puede contener cualquier tipo de dato, representando el valor devuelto por la API (puede ser un objeto, un array, etc.)
}