export interface Session {       // Exporta una interfaz llamada 'Session' que define la estructura de un objeto de sesión de usuario
    idUsers: number,             // Propiedad que representa el identificador único del usuario en la sesión
    fullName: string,            // Propiedad que representa el nombre completo del usuario
    email: string,               // Propiedad que representa la dirección de correo electrónico del usuario
    roleDescription: string,     // Propiedad que representa la descripción del rol del usuario (por ejemplo, "administrador", "usuario", etc.)
}