import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { BarChart, BarChartGroup } from "../bar-chart/bar-chart.model";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'gisa-prompt-result-chart',
  templateUrl: './prompt-result-chart.component.html',
  styleUrl: './prompt-result-chart.component.scss'
})
export class PromptResultChartComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() data: BarChartGroup[] = [];

  constructor(private apiService: ApiService, private sanatizer: DomSanitizer) {
    this.title = '';
    this.text = '';
    // apiService.getChartData().subscribe((data) => {
    //   console.log(data);
    //   this.data = data;
    // }, (error) => {
    //   console.log('Error:', error);

    // });
  }
  ngOnInit(): void {
    const html = this.sanatizer.bypassSecurityTrustHtml(this.text);
    this.text = html as string;
  }

}
