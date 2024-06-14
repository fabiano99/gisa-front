import { Component } from '@angular/core';
import { Card } from "../card/card.model";
import { ApiService } from "../api.service";

@Component({
  selector: 'gisa-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

  mouseDown = false;
  startX: any;
  scrollLeft: any;
  slider = document.querySelector<HTMLElement>('.carousel__content');

  cards: Card[] = [];

  constructor(private service:ApiService) {
    service.getCards().subscribe((data) => {
      this.cards = data.cards;
    });
  }

startDragging(e: { pageX: number; }, flag: any, el: {
    style: any; offsetLeft: number; scrollLeft: any;
}) {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
    el.style.cursor = 'grabbing';
  }
  stopDragging(e: any, flag: any) {
    this.mouseDown = false;
  }
  moveEvent(e: { preventDefault: () => void; pageX: number; }, el: {
    style: any; offsetLeft: number; scrollLeft: number;
}) {
    e.preventDefault();
    if (!this.mouseDown) {
      el.style.cursor = 'grab';
      return;
    }
    el.style.cursor = 'grabbing';
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }


}
