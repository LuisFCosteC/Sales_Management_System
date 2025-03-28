export interface Product {                     // Exporta una interfaz llamada 'Product' que define la estructura de un objeto de producto
    idProduct: number,                        // Propiedad que representa el identificador único del producto
    name: string,                             // Propiedad que representa el nombre del producto
    idCategory: number,                       // Propiedad que representa el identificador de la categoría a la que pertenece el producto
    descriptionCategory: string,              // Propiedad que representa la descripción de la categoría del producto
    stock: number,                            // Propiedad que representa la cantidad de unidades disponibles del producto en inventario
    price: string,                            // Propiedad que representa el precio del producto en formato de texto
    isActive: number                          // Propiedad que indica si el producto está activo (1) o inactivo (0)
}