import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
import { DashBoardService } from '../../../../Services/dash-board.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dash-board',
  standalone: false,
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit{
  totalRevenues:string="0";
  totalSales:string="0";
  totalProducts:string="0";

  constructor(
    private _dashBoardService : DashBoardService
  ) {}

  showGraphic(
    labelGraphic:any[],
    dataGraphic:any[]
  ) {
    const chartBars = new Chart('chartBars', {
      type:'bar',
      data: {
        labels: labelGraphic,
        datasets: [{
          label: '# de Ventas',
          data: dataGraphic,
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(51, 162, 235, 1)'],
          borderWidth: 1
        }]
      },
      options:{
        maintainAspectRatio: false,
        responsive: true,
        scales: {y: {beginAtZero: true}}
      }
    });
  }

  ngOnInit(): void {
    this._dashBoardService.summary().subscribe({
      next:(data) => {
        if(data.status){
          this.totalRevenues = data.value.totalRevenues;
          this.totalSales = data.value.totalSales;
          this.totalProducts = data.value.totalProducts;

          const arrayData: any[] = data.value.lastWeeksSales;
          console.log(arrayData);

          const labelTemp = arrayData.map((value) => value.date)
          const dataTemp = arrayData.map((value) => value.total)
          console.log(labelTemp, dataTemp);
          this.showGraphic(labelTemp, dataTemp);
        }
      },
      error:(e) =>{}
    });
  }
}
