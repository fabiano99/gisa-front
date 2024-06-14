import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewRef } from '@angular/core';
import { ApiService } from "../api.service";
import { InputDataService } from "../prompt-history/prompt-history.component";
import { ChatHistoryComponent } from "../chat-history/chat-history.component";
import { BarChart, BarChartGroup } from "../bar-chart/bar-chart.model";

@Component({
  selector: 'gisa-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrl: './input-prompt.component.scss'
})
export class InputPromptComponent implements OnChanges, OnInit {

  prompt: string;
  chat: Chat[] = [];
  isLoading: boolean;
  @Input() clearPrompt: boolean;
  @Output() updateChat: EventEmitter<Chat[]>;

  constructor(private apiService: ApiService, private inputService: InputDataService) {
    this.prompt = '';
    this.isLoading = false;
    this.clearPrompt = false;
    this.updateChat = new EventEmitter<Chat[]>();
  }

  ngOnInit(): void {
    this.inputService.dataTransferObservable.subscribe({
      next: (data) => {
        this.prompt = data;
        this.submitPrompt();
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clearPrompt'].currentValue) {
      this.chat = [];
      this.updateChat.emit(this.chat);
    }
  }

  submitPrompt() {
    localStorage.setItem('currentPrompt', this.prompt);
    this.isLoading = true;
    this.chat.push({author: 'Você', message: this.prompt});
    const prompt = this.prompt;
    this.prompt = '';
    this.updateChat.emit(this.chat);
    this.apiService.chatPrompt(prompt).subscribe({
      next: (response) => {
        this.chat.push({author: 'GISA', message: response.response, grafico: response.grafico});
        this.isLoading = false;
        this.updateChat.emit(this.chat);
      },
      error: (error) => {
        console.log('Error:', error);
        this.isLoading = false;
        this.chat.push({author: 'GISA', message: 'Desculpe, houve um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.\nSe o problema persistir, entre em contato com o suporte técnico.'});
        this.updateChat.emit(this.chat);
      }
    });
    // this.isLoading = false;
  }

  handleEnter() {
    if (this.prompt.trim() === '') {
      return;
    }
    this.submitPrompt();
  }
}

export interface Chat {
  author: string;
  message: string;
  grafico?: BarChartGroup[];
}
