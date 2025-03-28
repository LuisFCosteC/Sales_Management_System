export interface Users {                      // Exporta una interfaz llamada 'Users' que define la estructura de un objeto de usuario
    idUsers: number,                         // Propiedad que representa el identificador único del usuario
    fullName: string,                        // Propiedad que representa el nombre completo del usuario
    email: string,                           // Propiedad que representa la dirección de correo electrónico del usuario
    idRole: number,                          // Propiedad que representa el identificador del rol asignado al usuario
    roleDescription: string,                 // Propiedad que representa la descripción del rol del usuario (por ejemplo, "administrador", "usuario", etc.)
    password: string,                        // Propiedad que representa la contraseña del usuario, utilizada para la autenticación
    isActive: number                         // Propiedad que indica si el usuario está activo (1) o inactivo (0)
}