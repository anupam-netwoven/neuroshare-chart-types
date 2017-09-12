import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartsContainerComponent } from './charts-container/charts-container.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { StepProgressChartComponent } from './step-progress-chart/step-progress-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsContainerComponent,
    GanttChartComponent,
    LineChartComponent,
    StepProgressChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
