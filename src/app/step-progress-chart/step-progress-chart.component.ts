import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-step-progress-chart',
  templateUrl: './step-progress-chart.component.html',
  styleUrls: ['./step-progress-chart.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class StepProgressChartComponent implements OnInit {
  @ViewChild("stepprogresschart") private chartContainer: ElementRef;
  @Input() private data: Array<any>;

  private margin: any = { top: 30, bottom: 30, left: 30, right: 30 };
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  private xDomain: Array<number> = [0, 100];
  private yDomain: Array<number> = [0, 50];
  

  private datasetA: Array<any> = [
    { "x": 10, "y": 50 },
    { "x": 40, "y": 0 },
    { "x": 80, "y": 100 },
  ];

  private datasetB: Array<any> = [
    { "x": 20, "y": 0 },
    { "x": 50, "y": 50 },
    { "x": 90, "y": 100 },
  ];

  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.xScale = d3.scaleLinear().domain(this.xDomain).range([0, this.width, 0]);

    let lineA = d3.line<any>()
      .x((d: any) => this.xScale(d.x))
      .y(40);

    let lineB = d3.line<any>()
      .x((d: any) => this.xScale(d.x))
      .y(100);

    let svg = d3.select(element).append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale));

    svg.append("path")
      .datum(this.datasetA)
      .attr("class", "lineA")
      .attr("d", lineA);

    svg.append("path")
      .datum(this.datasetB)
      .attr("class", "lineB")
      .attr("d", lineB);

    let gradA = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradA")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "100%")
      .attr("y2", "0%");

    gradA.append("stop").attr("offset", "50%").style("stop-color", "#BE90D4");
    gradA.append("stop").attr("offset", "50%").style("stop-color", "white");

    let gradB = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradB")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "100%")
      .attr("y2", "0%");

    gradB.append("stop").attr("offset", "50%").style("stop-color", "#7CB342");
    gradB.append("stop").attr("offset", "50%").style("stop-color", "white");


    svg.selectAll(".dotA")
      .data(this.datasetA)
      .enter()
      .append("circle")
      .attr("class", "dotA")
      .attr("cx", d => this.xScale(d.x))
      .attr("cy", 40)
      .attr("r", 12)
      .style("stroke", "#BE90D4")
      .style("fill", d => {
        let returnColor;
        if (d.y == 0) {
          returnColor = "#FFF"
        }
        else if (d.y == 100) {
          returnColor = "#BE90D4"
        }
        else {
          returnColor = "url(#gradA)"
        }
        return returnColor;
      })


    svg.selectAll(".dotB")
      .data(this.datasetB)
      .enter()
      .append("circle")
      .attr("class", "dotB")
      .attr("cx", d => this.xScale(d.x))
      .attr("cy", 100)
      .attr("r", 12)
      .style("stroke", "#7CB342")
      .style("fill", d => {
        let returnColor;
        if (d.y == 0) {
          returnColor = "#FFF"
        }
        else if (d.y == 100) {
          returnColor = "#7CB342"
        }
        else {
          returnColor = "url(#gradB)"
        }
        return returnColor;
      })


  }
}
