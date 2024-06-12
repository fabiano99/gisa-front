import { Component, Input } from '@angular/core';
import { Tag } from "../tag/tag.model";

@Component({
  selector: 'gisa-tag-group',
  templateUrl: './tag-group.component.html',
  styleUrl: './tag-group.component.scss'
})
export class TagGroupComponent {

  @Input() tags: Tag[];

  constructor() {
    this.tags = [];
  }

}
