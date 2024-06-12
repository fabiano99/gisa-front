import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'gisa-prompt-history',
  templateUrl: './prompt-history.component.html',
  styleUrl: './prompt-history.component.scss'
})
export class PromptHistoryComponent implements OnChanges{

  @Input() prompts: {author: string, message: string}[];
  @Output() changeCollapse: EventEmitter<boolean>;
  recently: {author: string, message: string}[];

  imageCollapse = 'expand-button.svg';
  isCollapsed = true;

  constructor() {
    this.prompts = [];
    this.recently = [];
    this.changeCollapse = new EventEmitter<boolean>();
    console.log('PromptHistoryComponent constructor');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes history:', changes);
    this.saveOnLocalStorage();
    if (changes['prompts'].currentValue) {
      const getPrompts = localStorage.getItem('history');
      if (getPrompts) {
        this.recently = JSON.parse(getPrompts);
      }
      this.recently = [...this.recently].reverse();
    }
  }

  collapseHandle() {
    this.isCollapsed = !this.isCollapsed;
    this.imageCollapse = this.isCollapsed ? 'expand-button.svg' : 'collapse-button.svg';
    this.changeCollapse.emit(this.isCollapsed);
  }

 saveOnLocalStorage() {
    const getPrompts = localStorage.getItem('history');
    const getCurrentPrompts = localStorage.getItem('currentPrompt');
    if (getPrompts) {
      const prompts = JSON.parse(getPrompts);
      if (prompts.length === 5 && getCurrentPrompts) {
        prompts.shift();
        prompts.push(getCurrentPrompts);
      }
      else {
        if (getCurrentPrompts) prompts.push(getCurrentPrompts);
      }
      localStorage.setItem('history', JSON.stringify(prompts));
    }


 }

}
