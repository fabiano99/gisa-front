import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gisa-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Output() onClearPrompt = new EventEmitter<boolean>();
  @Output() updateChat = new EventEmitter<{author: string, message: string}[]>();
  promptCleared = false;

  clearPrompt() {
    this.onClearPrompt.emit(true);
    this.promptCleared = true;
    this.updateChat.emit([]);
  }
  updateChatHistory(chat: {author: string, message: string}[]) {
    this.updateChat.emit(chat);
    this.promptCleared = false;
  }
}
