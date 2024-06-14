import { AfterViewInit, Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { v4 as uuidv4 } from 'uuid';
import { BarChartGroup } from "../bar-chart/bar-chart.model";

@Component({
  selector: 'gisa-bar-chart2',
  templateUrl: './bar-chart2.component.html',
  styleUrl: './bar-chart2.component.scss'
})
export class BarChart2Component implements AfterViewInit {
  public chart: any;
  public chartId: any;
  @Input() data: BarChartGroup[] = [];

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

    this.chart = new Chart(this.chartId, {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.data[0].dados.map(dado => dado.Eixo_y),
	       datasets: this.data.map((group, index) => {
          return {
            label: group.grupo,
            data: group.dados.map(dado => dado.Eixo_x),
            backgroundColor: `${COLORS[index]}55`,
            borderColor: `${COLORS[index]}cc`,
            borderRadius: 8,
            borderWidth: 1
          };
         }),
        // [
        //   {
        //     label: "Vinho tinto seco",
        //     data: ['467','576', '572', '79', '92',
				// 				 '574', '573', '576'],
        //     backgroundColor: `${COLORS[0]}55`,
        //     borderColor: `${COLORS[0]}cc`,
        //     borderRadius: 8,
        //     borderWidth: 1
        //   },
        //   {
        //     label: "Vinho tinto suave",
        //     data: ['542', '542', '536', '327', '17',
				// 					 '0.00', '538', '541'],
        //     backgroundColor: `${COLORS[1]}55`,
        //     borderColor: `${COLORS[1]}cc`,
        //     borderRadius: 8,
        //     borderWidth: 1
        //   }
        // ]
      },
      options: {
        aspectRatio:2.5,
      }

    });
  }

}
