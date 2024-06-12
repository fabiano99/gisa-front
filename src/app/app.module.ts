import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PlaygroundComponent } from './playground/playground.component';
import { TagComponent } from './tag/tag.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TagGroupComponent } from './tag-group/tag-group.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { MessageComponent } from './message/message.component';
import { LoadComponent } from './load/load.component';
import { CollapseButtonComponent } from './collapse-button/collapse-button.component';
import { PromptHistoryComponent } from './prompt-history/prompt-history.component';
import { FooterComponent } from './footer/footer.component';
import { InputPromptComponent } from './input-prompt/input-prompt.component';
import { NewPromptComponent } from './new-prompt/new-prompt.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { CommonModule, registerLocaleData } from "@angular/common";
import { PromptResultChartComponent } from './prompt-result-chart/prompt-result-chart.component';
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BarChartComponent } from './bar-chart/bar-chart.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlaygroundComponent,
    TagComponent,
    CarouselComponent,
    TagGroupComponent,
    ChatHistoryComponent,
    MessageComponent,
    LoadComponent,
    CollapseButtonComponent,
    PromptHistoryComponent,
    FooterComponent,
    InputPromptComponent,
    NewPromptComponent,
    DoughnutChartComponent,
    PromptResultChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    },
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
