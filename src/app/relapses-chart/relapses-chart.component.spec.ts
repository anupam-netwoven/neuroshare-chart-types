import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelapsesChartComponent } from './relapses-chart.component';

describe('RelapsesChartComponent', () => {
  let component: RelapsesChartComponent;
  let fixture: ComponentFixture<RelapsesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelapsesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelapsesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
