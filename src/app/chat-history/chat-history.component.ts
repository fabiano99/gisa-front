import { ChangeDetectionStrategy, Component, Input, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ApiService } from "../api.service";

@Component({
  selector: 'gisa-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChatHistoryComponent  {

  @Input() messages: {author: string, message: string}[];
  @Input() isEmpty: boolean = true;
  insight: string;

  constructor(private service: ApiService, private zone: NgZone) {
    this.messages = [];
    this.insight = '';
  }

  generateInsight() {
    this.messages.push({author: 'Você', message: 'Gerar insight'});
    this.service.getInsight().subscribe({
      next: (data) => {
        console.log(data);
        this.insight = data.insight;
        this.messages.push({author: 'GISA', message: this.insight});
      },
      error: (error) => {
        console.log('Error:', error);
        this.insight = 'Desculpe, houve um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.\nSe o problema persistir, entre em contato com o suporte técnico.';
        this.messages.push({author: 'GISA', message: this.insight});
      }
    });
  }

  shouldShowInsightButton() {
    return this.messages.length > 0 && this.messages.length % 2 === 0;
  }
}
