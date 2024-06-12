import { Component } from '@angular/core';

@Component({
  selector: 'gisa-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gisa';
  isEmpty: boolean;
  chat: {author: string, message: string}[] = [];

  constructor() {
    this.isEmpty = false;
    localStorage.removeItem('currentPrompt')
    localStorage.getItem('history') || localStorage.setItem('history', JSON.stringify([]));
  }

  handleEmpty() {
    this.isEmpty = true;
    this.chat = [];
  }

  handleChat(chat: {author: string, message: string}[]) {
    this.isEmpty = false;
    this.chat = [...chat];
  }
}
