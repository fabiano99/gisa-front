import { Component, Input } from '@angular/core';

@Component({
  selector: 'gisa-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {

  @Input() title: string;
  @Input() isActivated: boolean;

  constructor() {
    this.title = 'Tag';
    this.isActivated = false;
  }

}
