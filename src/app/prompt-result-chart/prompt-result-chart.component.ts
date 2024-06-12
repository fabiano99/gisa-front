import { Component, Input } from '@angular/core';
import { ApiService } from "../api.service";
import { BarChart } from "../bar-chart/bar-chart.model";

@Component({
  selector: 'gisa-prompt-result-chart',
  templateUrl: './prompt-result-chart.component.html',
  styleUrl: './prompt-result-chart.component.scss'
})
export class PromptResultChartComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() data: BarChart[] = [];

  constructor(private apiService: ApiService) {
    this.title = 'Prompt Result Chart';
    this.text = 'This is a prompt result chart.';
    // apiService.getChartData().subscribe((data) => {
    //   console.log(data);
    //   this.data = data;
    // }, (error) => {
    //   console.log('Error:', error);

    // });
  }

}
