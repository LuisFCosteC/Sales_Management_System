// Importaciones necesarias de Angular y otros módulos
import { Component, OnInit, Inject } from '@angular/core';                  // Importa Component, OnInit y Inject de Angular core
import { FormBuilder, FormGroup, Validators } from '@angular/forms';        // Importa herramientas para manejar formularios reactivos
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';   // Importa herramientas para manejar diálogos de Angular Material
import { Role } from '../../../../Interfaces/role';                         // Importa la interfaz Role que define la estructura de los roles
import { Users } from '../../../../Interfaces/users';                       // Importa la interfaz Users que define la estructura de los usuarios
import { RoleService } from '../../../../Services/role.service';            // Importa el servicio para manejar roles
import { UsersService } from '../../../../Services/users.service';          // Importa el servicio para manejar usuarios
import { UtilityService } from '../../../../Reusable/utility.service';      // Importa un servicio utilitario para funciones comunes

// Decorador que define el componente
@Component({
  selector: 'app-modal-users',                  // Selector del componente
  standalone: false,                            // Indica que este componente no es independiente
  templateUrl: './modal-users.component.html',  // Ruta de la plantilla HTML del componente
  styleUrl: './modal-users.component.css'       // Ruta del archivo de estilos CSS del componente
})
// Clase del componente
export class ModalUsersComponent implements OnInit {
  
  // Propiedades del componente
  formsUsers: FormGroup;            // Grupo de formularios para manejar los datos del usuario
  hidePassword: boolean = true;     // Controla la visibilidad de la contraseña
  titleAction: string = "Agregar";  // Título de la acción, por defecto "Agregar"
  buttonAction: string = "Save";    // Texto del botón de acción, por defecto "Save"
  listRole: Role[] = [];            // Lista de roles disponibles

  // Constructor del componente
  constructor(
    private modalCurent: MatDialogRef<ModalUsersComponent>,   // Referencia al diálogo actual
    @Inject(MAT_DIALOG_DATA) public dataUsers: Users,         // Datos del usuario inyectados en el diálogo
    private fb: FormBuilder,                                  // Servicio para construir formularios
    private _roleService: RoleService,                        // Servicio para manejar roles
    private _usersService: UsersService,                      // Servicio para manejar usuarios
    private _utilityService: UtilityService                   // Servicio utilitario
  ) {
    // Inicializa el grupo de formularios con validaciones
    this.formsUsers = this.fb.group({
      fullName: ["", Validators.required],  // Campo para el nombre completo, requerido
      email: ["", Validators.required],     // Campo para el correo electrónico, requerido
      idRole: ["", Validators.required],    // Campo para el ID del rol, requerido
      password: ["", Validators.required],  // Campo para la contraseña, requerido
      isActive: ['1', Validators.required]  // Campo para el estado activo, requerido
    });

    // Si se reciben datos de usuario, se cambia el título y el texto del botón
    if (this.dataUsers != null) {
      this.titleAction = "Editar";      // Cambia el título a "Editar"
      this.buttonAction = "Actualizar"; // Cambia el texto del botón a "Actualizar"
    }

    // Llama al servicio de roles para obtener la lista de roles
    this._roleService.list().subscribe({
      next: (data) => {
        if (data.status) this.listRole = data.value; // Si la respuesta es exitosa, asigna los roles a listRole
      },
      error: (e) => {} // Manejo de errores (vacío en este caso)
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Si se reciben datos de usuario, llena el formulario con esos datos
    if (this.dataUsers != null) {
      this.formsUsers.patchValue({
        fullName: this.dataUsers.fullName,            // Llena el campo de nombre completo
        email: this.dataUsers.email,                  // Llena el campo de correo electrónico
        idRole: this.dataUsers.idRole,                // Llena el campo de ID de rol
        password: this.dataUsers.password,            // Llena el campo de contraseña
        isActive: this.dataUsers.isActive.toString()  // Llena el campo de estado activo como cadena
      });
    }
  }

  // Método para guardar o editar un usuario
  SaveEdit_Users() {
    // Crea un objeto _users con los datos del formulario
    const _users: Users = {
      idUsers: this.dataUsers == null ? 0 : this.dataUsers.idUsers,   // Si no hay datos de usuario, asigna 0, de lo contrario, asigna el ID del usuario
      fullName: this.formsUsers.value.fullName,                       // Asigna el nombre completo del formulario
      email: this.formsUsers.value.email,                             // Asigna el correo electrónico del formulario
      idRole: this.formsUsers.value.idRole,                           // Asigna el ID de rol del formulario
      roleDescription: "",                                            // Descripción del rol (vacío en este caso)
      password: this.formsUsers.value.password,                       // Asigna la contraseña del formulario
      isActive: parseInt(this.formsUsers.value.isActive)              // Asigna el estado activo convertido a número
    };

    // Si no hay datos de usuario, se está creando un nuevo usuario
    if (this.dataUsers == null) {
      this._usersService.save(_users).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilityService.displayAlert("El usuario fue registrado", "Exito");        // Muestra alerta de éxito
            this.modalCurent.close("true");                                                 // Cierra el diálogo
          } else {
            this._utilityService.displayAlert("No se pudo registrar el usuario", "Error");  // Muestra alerta de error
          }
        },
        error: (e) => {} // Manejo de errores (vacío en este caso)
      });
    } else {
      // Si hay datos de usuario, se está editando un usuario existente
      this._usersService.edit(_users).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilityService.displayAlert("El usuario fue editado", "Exito");         // Muestra alerta de éxito
            this.modalCurent.close("true");                                               // Cierra el diálogo
          } else {
            this._utilityService.displayAlert("No se pudo editar el usuario", "Error");   // Muestra alerta de error
          }
        },
        error: (e) => {} // Manejo de errores (vacío en este caso)
      });
    }
  }
}