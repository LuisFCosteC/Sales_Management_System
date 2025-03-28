export interface Menu {            // Exporta una interfaz llamada 'Menu' que define la estructura de un objeto de menú
    idMenu: number,               // Propiedad que representa el identificador único del menú
    name: string,                 // Propiedad que representa el nombre del menú
    icon: string,                 // Propiedad que representa la ruta o nombre del ícono asociado al menú
    url: string                   // Propiedad que representa la URL a la que redirige el menú
}
