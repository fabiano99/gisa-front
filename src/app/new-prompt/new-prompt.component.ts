import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gisa-new-prompt',
  templateUrl: './new-prompt.component.html',
  styleUrl: './new-prompt.component.scss'
})
export class NewPromptComponent {

  @Output() onClearPrompt = new EventEmitter<boolean>();

  clearPrompt() {
    this.onClearPrompt.emit(true);
    localStorage.removeItem('currentPrompt');
  }
}
