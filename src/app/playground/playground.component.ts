import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Tag } from "../tag/tag.model";
import { DoughnutChartColor } from "../doughnut-chart/doughnut-chart.component";
import { Chat } from "../input-prompt/input-prompt.component";

@Component({
  selector: 'gisa-playground',
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent implements AfterViewInit, OnChanges{

  tags: Tag[];
  messages: string[] = [];
  result: any;
  @Input() isEmpty = true;
  isFull = true;
  isLoading = false;
  @Input() chat: Chat[] = [];
  @ViewChild('chatHistory')
  chatHistory!: ElementRef;

  constructor() {

    this.tags = [

      {title: 'Gráfico gerado', isActivated: false},
      {title: 'Gráfico gerado', isActivated: true},
    ]

    this.messages = [
      'Message 1',
    ]
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chat'].currentValue) {
      this.chat = changes['chat'].currentValue;
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
      setTimeout(() => {
        this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
      }, 500);
    }
  }
  ngAfterViewInit(): void {
    this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
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
