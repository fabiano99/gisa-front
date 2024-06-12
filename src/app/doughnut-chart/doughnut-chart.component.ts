import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';
 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

@Component({
  selector: 'gisa-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit, AfterViewInit {
  private svg: any;
  private width = 70;
  private height = 70;
  chartId: string;
  arrowVariation: string;
  @Input() colors: DoughnutChartColor;
  @Input() variation: number;
  @Input() title: string;
  @Input() value: number;

  outerRadius = this.height / 2 - 10;
  innerRadius = this.outerRadius * 0.75;

  // https://tauday.com/tau-manifesto
  tau = 2 * Math.PI;

  constructor() {
    this.colors = {
      background: '#C387FF',
      highlight: '#FF00F5'
    };
    this.variation = 0;
    this.title = 'Total';
    this.value = 0;
    this.arrowVariation = 'arrow-up.svg'
    const uuid = uuidv4();
    const uuidToId = uuid.replace(/-/g, '').replace(/\d/g, '');
    // const last6chars = uuidToId.slice(-);
    console.log(uuidToId);
    this.chartId = uuidToId;
  }
  ngAfterViewInit(): void {
    this.createSvg(this.chartId);
    this.drawChart();
  }

  ngOnInit(): void {
    this.arrowVariation = this.variation >= 0 ? 'arrow-up.svg' : 'arrow-down.svg';
  }

  private createSvg(chartId: string = 'doughnut-chart'): void {
    this.svg = d3.select("figure#" + chartId)
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}


private drawChart(): void {
  const arcThin = d3.arc()
  .innerRadius(25)
  .outerRadius(30)
  .startAngle(0);

  const arcLarge = d3.arc()
  .innerRadius(20)
  .outerRadius(35)
  .startAngle(0);

  // Build chart
  this.svg
  .append('path')
  .datum({endAngle: this.tau})
  .style("fill", this.colors.background)
  .attr("d", arcThin as any);

  this.svg
  .append("path")
  .datum({endAngle:this.variation * this.tau})
  .style("fill", this.colors.highlight)
  .attr("d", arcLarge as any);
}

}

export interface DoughnutChartColor {
  background: string;
  highlight: string;
}
