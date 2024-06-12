import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ApiService } from "../api.service";
import { local } from "d3";

@Component({
  selector: 'gisa-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrl: './input-prompt.component.scss'
})
export class InputPromptComponent implements OnChanges {

  prompt: string;
  chat: {author: string, message: string}[] = [];
  isLoading: boolean;
  @Input() clearPrompt: boolean;

  @Output() updateChat: EventEmitter<{author: string, message: string}[]>;

  constructor(private apiService: ApiService) {
    this.prompt = '';
    this.isLoading = false;
    this.clearPrompt = false;
    this.updateChat = new EventEmitter<{author: string, message: string}[]>();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes:', changes);
    if (changes['clearPrompt'].currentValue) {
      this.chat = [];
      this.updateChat.emit(this.chat);
    }
  }

  submitPrompt() {
    localStorage.setItem('currentPrompt', this.prompt);
    this.isLoading = true;
    console.log(this.prompt);
    this.chat.push({author: 'Você', message: this.prompt});
    const prompt = this.prompt;
    this.prompt = '';
    this.updateChat.emit(this.chat);
    this.apiService.chatPrompt(prompt).subscribe({
      next: (response) => {
        this.chat.push({author: 'GISA', message: response.response});
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
