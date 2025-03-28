export interface DetailSales {    // Exporta una interfaz llamada 'DetailSales' que define la estructura de un objeto de detalle de ventas
    idProduct: number,            // Propiedad que representa el identificador único del producto
    descriptionProduct: string,   // Propiedad que representa la descripción del producto
    quantity: number,             // Propiedad que representa la cantidad del producto vendido
    priceText: string,            // Propiedad que representa el precio del producto en formato de texto
    totalText: string             // Propiedad que representa el total de la venta en formato de texto
}