export interface Report {                     // Exporta una interfaz llamada 'Report' que define la estructura de un objeto de informe de ventas
    salesNumber: string,                     // Propiedad que representa el número de la venta o transacción
    paymentType: string,                     // Propiedad que representa el tipo de pago utilizado (por ejemplo, efectivo, tarjeta de crédito, etc.)
    dateRegistration: string,                 // Propiedad que representa la fecha en que se registró la venta, en formato de texto
    totalSales: string,                       // Propiedad que representa el total de ventas en formato de texto
    product: string,                          // Propiedad que representa el nombre o descripción del producto vendido
    quantity: number,                         // Propiedad que representa la cantidad de unidades del producto vendidas
    price: string,                           // Propiedad que representa el precio del producto en formato de texto
    total: string                            // Propiedad que representa el total de la venta en formato de texto
}