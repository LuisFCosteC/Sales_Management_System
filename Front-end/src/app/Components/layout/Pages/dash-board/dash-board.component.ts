// Importación de módulos y dependencias necesarias
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Importa Chart.js y sus componentes registrables
import { DashBoardService } from '../../../../Services/dash-board.service'; // Servicio personalizado para el dashboard

// Registra todos los componentes necesarios de Chart.js
Chart.register(...registerables);

// Decorador del componente Angular
@Component({
  selector: 'app-dash-board', // Selector para usar en templates
  standalone: false, // Indica que no es un componente standalone (usa módulos)
  templateUrl: './dash-board.component.html', // Ruta al template HTML
  styleUrl: './dash-board.component.css' // Ruta a los estilos CSS
})
export class DashBoardComponent implements OnInit {
  // Variables para almacenar los datos del dashboard
  totalRevenues: string = "0"; // Total de ingresos (inicializado como string)
  totalSales: string = "0";    // Total de ventas
  totalProducts: string = "0"; // Total de productos

  // Constructor con inyección de dependencias
  constructor(
    private _dashBoardService: DashBoardService // Servicio para obtener datos del dashboard
  ) {}

  /**
   * Método para mostrar un gráfico de barras usando Chart.js
   * @param labelGraphic Etiquetas para el eje X del gráfico
   * @param dataGraphic Datos para el eje Y del gráfico
   */
  showGraphic(labelGraphic: any[], dataGraphic: any[]) {
    // Crea una nueva instancia de Chart
    const chartBars = new Chart('chartBars', {
      type: 'bar', // Tipo de gráfico: barras
      data: {
        labels: labelGraphic, // Etiquetas del eje X
        datasets: [{
          label: '# de Ventas', // Leyenda del dataset
          data: dataGraphic,    // Datos a graficar
          backgroundColor: ['rgba(54, 162, 235, 0.2)'], // Color de fondo de las barras
          borderColor: ['rgba(51, 162, 235, 1)'],       // Color del borde de las barras
          borderWidth: 1                                // Ancho del borde
        }]
      },
      options: {
        maintainAspectRatio: false, // No mantener relación de aspecto
        responsive: true,           // Gráfico responsivo
        scales: {
          y: { beginAtZero: true }  // Eje Y comienza en cero
        }
      }
    });
  }

  // Método del ciclo de vida: se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Llama al servicio para obtener el resumen de datos
    this._dashBoardService.summary().subscribe({
      next: (data) => {
        if (data.status) { // Si la respuesta es exitosa
          // Asigna los valores recibidos a las propiedades del componente
          this.totalRevenues = data.value.totalRevenues;
          this.totalSales = data.value.totalSales;
          this.totalProducts = data.value.totalProducts;

          // Obtiene los datos de ventas de las últimas semanas
          const arrayData: any[] = data.value.lastWeeksSales;
          console.log(arrayData); // Log para depuración

          // Extrae las fechas y los totales para el gráfico
          const labelTemp = arrayData.map((value) => value.date);
          const dataTemp = arrayData.map((value) => value.total);
          console.log(labelTemp, dataTemp); // Log para depuración
          
          // Llama al método para mostrar el gráfico con los datos procesados
          this.showGraphic(labelTemp, dataTemp);
        }
      },
      error: (e) => {} // Manejo de errores (vacío en este caso)
    });
  }
}