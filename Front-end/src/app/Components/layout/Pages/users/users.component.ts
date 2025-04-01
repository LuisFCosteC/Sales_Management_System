// Importaciones necesarias para el componente
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core'; // Importa Component, OnInit, AfterViewInit y ViewChild de Angular
import { MatTableDataSource } from '@angular/material/table';                           // Importa MatTableDataSource para gestionar datos en tablas
import { MatPaginator } from '@angular/material/paginator';                             // Importa MatPaginator para paginar los datos en la tabla
import { MatDialog } from '@angular/material/dialog';                                   // Importa MatDialog para abrir diálogos modales
import { ModalUsersComponent } from '../../Modals/modal-users/modal-users.component';   // Importa el componente del modal para usuarios
import { Users } from '../../../../Interfaces/users';                                   // Importa la interfaz Users que define la estructura de los datos de usuario
import { UsersService } from '../../../../Services/users.service';                      // Importa el servicio UsersService para interactuar con la API de usuarios
import { UtilityService } from '../../../../Reusable/utility.service';                  // Importa UtilityService para métodos reutilizables, como mostrar alertas
import Swal from 'sweetalert2';                                                         // Importa SweetAlert2 para mostrar alertas estilizadas

// Decorador que define el componente
@Component({
  selector: 'app-users',                  // Selector del componente
  standalone: false,                      // Indica que este componente no es independiente
  templateUrl: './users.component.html',  // Ruta de la plantilla HTML del componente
  styleUrls: ['./users.component.css']    // Ruta de los estilos CSS del componente
})
// Clase del componente UsersComponent
export class UsersComponent implements OnInit, AfterViewInit {

  // Propiedades del componente
  tableColumns: string[] = ['fullName', 'email', 'roleDescription', 'state', 'actions']; // Define las columnas de la tabla
  dataStart: Users[] = [];                                  // Inicializa un arreglo vacío para almacenar los datos de usuarios
  dataListUsers = new MatTableDataSource(this.dataStart);   // Crea una instancia de MatTableDataSource con los datos iniciales
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;  // Obtiene una referencia al paginador de la tabla

  // Constructor del componente
  constructor(
    private dialog: MatDialog,                // Inyecta el servicio MatDialog para abrir diálogos
    private _usersService: UsersService,      // Inyecta el servicio UsersService para gestionar usuarios
    private _utilityService: UtilityService   // Inyecta el servicio UtilityService para mostrar alertas
  ) {}

  // Método para obtener la lista de usuarios
  getUsers() {
    this._usersService.list().subscribe({                                   // Llama al método list del servicio UsersService
      next: (data) => {                                                       // Maneja la respuesta exitosa
        if (data.status) {                                                      // Verifica si la respuesta es exitosa
          this.dataListUsers.data = data.value;                                   // Asigna los datos a la fuente de datos de la tabla
        } else {
          this._utilityService.displayAlert("No se encontraron datos", "Oops!");  // Muestra una alerta si no se encontraron datos
        }
      },
      error: (e) => {                                     // Maneja errores en la llamada a la API
        console.error("Error al obtener usuarios:", e);     // Imprime el error en la consola
      }
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.getUsers(); // Llama al método getUsers para cargar la lista de usuarios
  }

  // Método que se ejecuta después de que la vista del componente ha sido inicializada
  ngAfterViewInit(): void {
    this.dataListUsers.paginator = this.tablePagination; // Asigna el paginador a la fuente de datos de la tabla
  }

  // Método para aplicar un filtro a la tabla
  applyTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;       // Obtiene el valor del filtro desde el evento
    this.dataListUsers.filter = filterValue.trim().toLocaleLowerCase(); // Aplica el filtro a la fuente de datos
  }

  // Método para abrir un diálogo para crear un nuevo usuario
  newUser () {
    this.dialog.open(ModalUsersComponent, { // Abre el diálogo ModalUsersComponent
      disableClose: true                      // Desactiva el cierre del diálogo al hacer clic fuera de él
    }).afterClosed().subscribe(result => {      // Se suscribe al evento que se dispara al cerrar el diálogo
      if (result === "true") this.getUsers();     // Si el resultado es "true", vuelve a cargar la lista de usuarios
    });
  }

  // Método para abrir un diálogo para editar un usuario existente
  editUser (users: Users) {
    this.dialog.open(ModalUsersComponent, { // Abre el diálogo ModalUsersComponent
      disableClose: true,                     // Desactiva el cierre del diálogo al hacer clic fuera de él
      data: users                             // Pasa los datos del usuario a editar al diálogo
    }).afterClosed().subscribe(result => {      // Se suscribe al evento que se dispara al cerrar el diálogo
      if (result === "true") this.getUsers();   // Si el resultado es "true", vuelve a cargar la lista de usuarios
    });
  }

  // Método para eliminar un usuario
  deleteUser (users: Users) {
    Swal.fire({                            // Muestra una alerta de confirmación utilizando SweetAlert2
      title: '¿Desea eliminar el Usuario?',   // Título de la alerta
      text: users.fullName,                   // Muestra el nombre del usuario a eliminar
      icon: "warning",                        // Icono de advertencia
      confirmButtonColor: '#FF8F00',          // Color del botón de confirmación
      confirmButtonText: "Si, eliminar",      // Texto del botón de confirmación
      showCancelButton: true,                 // Muestra el botón de cancelación
      cancelButtonColor: '#3085d6',           // Color del botón de cancelación
      cancelButtonText: 'No, volver'          // Texto del botón de cancelación
    }).then((result) => {                                                               // Maneja la respuesta de la alerta
      if (result.isConfirmed) {                                                           // Si el usuario confirma la eliminación
        this._usersService.delete(users.idUsers).subscribe({                                // Llama al método delete del servicio UsersService
          next: (data) => {                                                                   // Maneja la respuesta exitosa
            if (data.status) {                                                                // Verifica si la eliminación fue exitosa
              this._utilityService.displayAlert("El usuario fue eliminado", "Eliminado!");    // Muestra una alerta de éxito
              this.getUsers();                                                                // Vuelve a cargar la lista de usuarios
            } else {
              this._utilityService.displayAlert("No se pudo eliminar el Usuario", "Error");   // Muestra una alerta de error
            }
          },
          error: (e) => {                                       // Maneja errores en la llamada a la API
            console.error("Error al eliminar el usuario:", e);  // Imprime el error en la consola
          }
        });
      }
    });
  }
}