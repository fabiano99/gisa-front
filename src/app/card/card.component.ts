import { Component, Input } from '@angular/core';

@Component({
  selector: 'gisa-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() title: string;
  @Input() value: number;
  @Input() monthReference: string;
  @Input() variation: number;
  constructor() {
    this.title = '';
    this.value = 0;
    this.monthReference = '';
    this.variation = 0;
  }
}
