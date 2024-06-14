import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as d3 from 'd3';
import { ApiService } from "../api.service";
import { BarChart } from "./bar-chart.model";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'gisa-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements  OnInit {
  private svg: any;
  chartId: string;
  width = 400;
  height = 300;
  marginTop = 30;
  marginRight = 0;
  marginBottom = 30;
  marginLeft = 40;
  @Input() colors: any;
  @Input() variation: number;
  @Input() title: string;
  @Input() value: number;
  @Input() data: any[] = [];
  private x: any;
  private y: any;
  source: any;

  outerRadius = this.height / 2 - 10;
  innerRadius = this.outerRadius * 0.75;

  // https://tauday.com/tau-manifesto
  tau = 2 * Math.PI;

  constructor(private sanitizer: DomSanitizer) {
    this.colors = {
      background: '#C387FF',
      highlight: '#FF00F5'
    };
    this.variation = 0;
    this.title = 'Total';
    this.value = 0;
    const uuid = uuidv4();
    const uuidToId = uuid.replace(/-/g, '').replace(/\d/g, '');
    this.chartId = uuidToId;
    this.data = [
      // { Eixo_y: "Fevereiro", Eixo_x: 0.34950000000000003 },
      // { Eixo_y: "Março", Eixo_x: 0.3635 },
      // { Eixo_y: "Abril", Eixo_x: 0.3688 },
      // { Eixo_y: "Maio", Eixo_x: 0.0547 },
      // { Eixo_y: "Fevereiro", Eixo_x: 34.95 },
      // { Eixo_y: "Março", Eixo_x: 36.35 },
      // { Eixo_y: "Abril", Eixo_x: 36.88 },
      // { Eixo_y: "Maio", Eixo_x: 5.47 }
  ]
  }
  ngOnInit(): void {
    this.declareAxes();
    this.createSvg(this.chartId);
    this.drawChart();
  }

  private declareAxes(): void {
    // Declare the x (horizontal position) scale.
  this.x = d3.scaleBand()
  .domain(this.data.map(d => d.Eixo_y)) // descending Eixo_x
  .range([this.marginLeft, this.width - this.marginRight])
  .padding(0.1);

// Declare the y (vertical position) scale.
this.y = d3.scaleLinear()
  .domain([0, d3.max(this.data, (d) => d.Eixo_x)] as [number, number])
  .range([this.height - this.marginBottom, this.marginTop]);
  }


  private createSvg(chartId: string = 'bar-chart'): void {
      // Create the SVG container.
  this.svg = d3.create("svg")
  .attr("width", this.width)
  .attr("height", this.height)
  .attr("viewBox", [0, 0, this.width, this.height])
  .attr("style", "max-width: 100%; height: auto;");
}


private drawChart(): void {
    // Add a rect for each bar.
    this.svg.append("g")
    .attr("fill", "#004DB8")
  .selectAll()
  .data(this.data)
  .join("rect")
    .attr("x", (d: any) => this.x(d.Eixo_y))
    .attr("y", (d: any) => this.y(d.Eixo_x))
    .attr("height", (d: any) => this.y(0) - this.y(d.Eixo_x))
    .attr("width", this.x.bandwidth());

      // Add the x-axis and label.
  this.svg.append("g")
  .attr("transform", `translate(0,${this.height - this.marginBottom})`)
  .call(d3.axisBottom(this.x).tickSizeOuter(0));

// Add the y-axis and label, and remove the domain line.
this.svg.append("g")
  .attr("transform", `translate(${this.marginLeft},0)`)
  .call(d3.axisLeft(this.y).tickFormat((y: any) => (y * 100).toFixed()))
  .call((g: any) => g.select(".domain").remove())
  .call((g: any )=> g.append("text")
      .attr("x", -this.marginLeft)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("Eixo Y"));

        // Add a text label for each state.
  this.svg.append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 20)
  .attr("fill", "white")
.selectAll()
.data(this.data)
.join("text")
  .attr("text-anchor", (d: { Eixo_x: number; }) => d.Eixo_x < 0 ? "end" : "start")
  .attr("y", (d: { Eixo_x: number; }) => this.y(d.Eixo_x) + Math.sign(d.Eixo_x - 0) * 4)
  .attr("x", (d: { Eixo_y: any; }) => this.x(d.Eixo_y) + this.x.bandwidth() / 2)
  .attr("dy", "1.5em")
  .attr("dx", "-1em")
  // .text((d: { Eixo_x: any; }) => d.Eixo_x.toFixed(2));
  this.source = this.sanitizer.bypassSecurityTrustHtml(this.svg.node().outerHTML);
}
}
