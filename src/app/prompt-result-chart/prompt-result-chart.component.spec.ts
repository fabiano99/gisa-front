import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptResultChartComponent } from './prompt-result-chart.component';

describe('PromptResultChartComponent', () => {
  let component: PromptResultChartComponent;
  let fixture: ComponentFixture<PromptResultChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptResultChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptResultChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
