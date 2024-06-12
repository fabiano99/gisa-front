import { Component, Input } from '@angular/core';

@Component({
  selector: 'gisa-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  @Input() author: string;
  @Input() message: string;

  constructor() {
    this.message = '';
    this.author = '';
  }

}
