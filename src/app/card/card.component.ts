import { Component, Injectable, Input, ViewChild } from '@angular/core';
import { ApiService } from "../api.service";
import { InputDataService } from "../prompt-history/prompt-history.component";
import { ChatHistoryComponent } from "../chat-history/chat-history.component";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class generateInsightService {
  private data: string = '';
  constructor() { }
  private dataTransferSubject = new Subject<boolean>()
  dataTransferObservable = this.dataTransferSubject.asObservable();

  push() {
    this.dataTransferSubject.next(true);
  }
}

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
  @Input() pergunta: string;
  isLoading: boolean;
  constructor(private service: ApiService, private insightService: generateInsightService) {
    this.title = '';
    this.value = 0;
    this.monthReference = '';
    this.variation = 0;
    this.pergunta = '';
    this.isLoading = false;
  }

  generateInsight() {
    this.isLoading = true;
    this.service.chatPrompt(this.pergunta).subscribe((response) => {
      this.insightService.push();
      this.isLoading = false;
    });
  }
}
