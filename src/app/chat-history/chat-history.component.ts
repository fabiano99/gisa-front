import { ChangeDetectionStrategy, Component, Input, OnInit  } from '@angular/core';
import { ApiService } from "../api.service";
import { Chat } from "../input-prompt/input-prompt.component";
import { generateInsightService } from "../card/card.component";

@Component({
  selector: 'gisa-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChatHistoryComponent implements OnInit {

  @Input() messages: Chat[];
  @Input() isEmpty: boolean = true;
  insight: string;


  constructor(private service: ApiService, private insightService: generateInsightService) {
    this.messages = [];
    this.insight = '';
  }

  generateInsight() {
    this.messages.push({author: 'Você', message: 'Gerar insight'});
    this.service.getInsight().subscribe({
      next: (data) => {
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
    const isUserMessage = this.messages[this.messages.length - 1].author.toLowerCase() === 'gisa';
    const isInsightMessage = this.messages[this.messages.length - 2].message === 'Gerar insight';
    if (isInsightMessage) {
      return false;
    }
    return isUserMessage;
  }

  ngOnInit(): void {
    this.insightService.dataTransferObservable.subscribe({
      next: () => {
        this.generateInsight();
      }
    });
  }
}
