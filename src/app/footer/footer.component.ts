import { Component, EventEmitter, Output } from '@angular/core';
import { ChatResponse } from "../api.service";
import { Chat } from "../input-prompt/input-prompt.component";

@Component({
  selector: 'gisa-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Output() onClearPrompt = new EventEmitter<boolean>();
  @Output() updateChat = new EventEmitter<Chat[]>();
  promptCleared = false;

  clearPrompt() {
    this.onClearPrompt.emit(true);
    this.promptCleared = true;
    this.updateChat.emit([]);
  }
  updateChatHistory(chat: Chat[]) {
    this.updateChat.emit(chat);
    this.promptCleared = false;
  }
}
