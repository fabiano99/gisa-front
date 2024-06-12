import { Component, Input } from '@angular/core';
import { Tag } from "../tag/tag.model";
import { DoughnutChartColor } from "../doughnut-chart/doughnut-chart.component";

@Component({
  selector: 'gisa-playground',
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent  {

  tags: Tag[];
  messages: string[] = [];
  result: any;
  @Input() isEmpty = false;
  isFull = true;
  isLoading = false;
  @Input() chat: {author: string, message: string}[] = [];

  constructor() {

    this.tags = [
      // {
      //   title: 'Tag 1',
      //   isActivated: false
      // },
      // {
      //   title: 'Tag 2',
      //   isActivated: false
      // },
      // {
      //   title: 'Tag 3',
      //   isActivated: true
      // }
    ]

    this.messages = [
      'Message 1',
    ]
  }

  handleFullscreen(isFull: boolean) {
    this.isFull = isFull;
  }
}

export interface ChartResult {
  title: string;
  description: string;
  data: ChartData[];
}

export interface ChartData {
  title: string;
  value: number;
  variation: number;
  colors: DoughnutChartColor;
}
