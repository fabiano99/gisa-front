import { Component } from '@angular/core';
import { ChatResponse } from "./api.service";
import { Chat } from "./input-prompt/input-prompt.component";

@Component({
  selector: 'gisa-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gisa';
  isEmpty: boolean;
  chat: Chat[] = [];

  constructor() {
    this.isEmpty = false;
    localStorage.removeItem('currentPrompt')
    localStorage.getItem('history') || localStorage.setItem('history', JSON.stringify([]));
  }

  handleEmpty() {
    this.isEmpty = true;
    this.chat = [];
  }

  handleChat(chat: Chat[]) {
    this.isEmpty = false;
    this.chat = [...chat];
  }
}
