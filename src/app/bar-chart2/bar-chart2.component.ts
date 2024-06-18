import { AfterViewInit, Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { v4 as uuidv4 } from 'uuid';
import { BarChart, BarChartGroup } from "../bar-chart/bar-chart.model";

@Component({
  selector: 'gisa-bar-chart2',
  templateUrl: './bar-chart2.component.html',
  styleUrl: './bar-chart2.component.scss'
})
export class BarChart2Component implements AfterViewInit {
  public chart: any;
  public chartId: any;
  @Input() data: BarChart[] = [];

  constructor() {
    const uuid = uuidv4();
    const uuidToId = uuid.replace(/-/g, '').replace(/\d/g, '');
    this.chartId = uuidToId;

  }
  ngAfterViewInit(): void {
    this.createChart();
  }


  createChart(){

    const COLORS = [
      '#4dc9f6',
      '#f67019',
      '#f53794',
      '#537bc4',
      '#acc236',
      '#166a8f',
      '#00a950',
      '#58595b',
      '#8549ba'
    ];

    // choose aleatory colors
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    this.chart = new Chart(this.chartId, {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.data.map(dado => dado.Eixo_y),
	       datasets: [
          {
            hidden: false,
            // label: 'Vinho',
            data: this.data.map(dado => dado.Eixo_x),
            backgroundColor: `${color}55`,
            borderColor: `${color}cc`,
            borderRadius: 8,
            borderWidth: 1
          }
         ]

      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            display: false
          }
        }
      }

    });
  }

}
