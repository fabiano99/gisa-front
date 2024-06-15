import { Component, EventEmitter, Injectable, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'

})
export class InputDataService {
  private data: string = '';
  constructor() { }
  private dataTransferSubject = new Subject<string>()
  dataTransferObservable = this.dataTransferSubject.asObservable();

  push(str: string) {
    this.dataTransferSubject.next(str);
  }
}

@Component({
  selector: 'gisa-prompt-history',
  templateUrl: './prompt-history.component.html',
  styleUrl: './prompt-history.component.scss'
})
export class PromptHistoryComponent implements OnChanges{

  @Input() prompts: {author: string, message: string}[];
  @Output() changeCollapse: EventEmitter<boolean>;
  recently: string[];

  imageCollapse = '/assets/expand-button.svg';
  isCollapsed = true;

  constructor(private inputService: InputDataService) {
    this.prompts = [];
    this.recently = [];
    this.changeCollapse = new EventEmitter<boolean>();
    console.log('PromptHistoryComponent constructor');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.saveOnLocalStorage();
    if (changes['prompts'].currentValue) {
      const getPrompts = localStorage.getItem('history');
      if (getPrompts) {
        this.recently = JSON.parse(getPrompts);
        // remove duplicates
        this.recently = [...new Set(this.recently)];
      }
      this.recently = [...this.recently].reverse();
    }
  }

  collapseHandle() {
    this.isCollapsed = !this.isCollapsed;
    this.imageCollapse = this.isCollapsed ? '/assets/expand-button.svg' : '/assets/collapse-button.svg';
    this.changeCollapse.emit(this.isCollapsed);
  }

 saveOnLocalStorage() {
    const getPrompts = localStorage.getItem('history');
    const getCurrentPrompts = localStorage.getItem('currentPrompt');
    if (getPrompts) {
      let prompts = JSON.parse(getPrompts);
      prompts = prompts.filter((item: string) => item !== getCurrentPrompts);
      if (prompts.length === 10 && getCurrentPrompts) {
        prompts.shift();
        prompts.push(getCurrentPrompts);
      }
      else {
        if (getCurrentPrompts) prompts.push(getCurrentPrompts);
      }
      localStorage.setItem('history', JSON.stringify(prompts));
    }


 }

 handleClick(input: string) {
    this.inputService.push(input);
 }

}
