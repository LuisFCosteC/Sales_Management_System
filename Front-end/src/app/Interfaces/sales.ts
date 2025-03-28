import { DetailSales } from './detail-sales';  // Importa la interfaz 'DetailSales' desde el archivo 'detail-sales'

export interface Sales {                        // Exporta una interfaz llamada 'Sales' que define la estructura de un objeto de venta
    idSale?: number,                          // Propiedad opcional que representa el identificador único de la venta
    salesNumber?: string,                     // Propiedad opcional que representa el número de la venta o transacción
    paymentType: string,                      // Propiedad que representa el tipo de pago utilizado (por ejemplo, efectivo, tarjeta de crédito, etc.)
    dateRegistration?: string,                // Propiedad opcional que representa la fecha en que se registró la venta
    totalText: string,                        // Propiedad que representa el total de la venta en formato de texto
    detailSales: DetailSales[]                // Propiedad que es un arreglo de objetos 'DetailSales', representando los detalles de los productos vendidos en la transacción
}