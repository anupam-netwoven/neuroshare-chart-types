import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GanttChartComponent implements OnInit {
  @ViewChild("ganttchart") private chartContainer: ElementRef;
  @Input() private data: Array<any>;

  constructor() { }

  private margin: any = { top: 30, bottom: 30, left: 30, right: 30 };
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private xDomain: Array<number> = [0, 100];
  private dataset: Array<any> = [
    {
      name: "Medicine 1",
      group: "A",
      startPoint: 10,
      endPoint: 35
    },
    {
      name: "Medicine 2",
      group: "B",
      startPoint: 25,
      endPoint: 55
    },
    {
      name: "Medicine 3",
      group: "C",
      startPoint: 50,
      endPoint: 100
    },
  ];

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.xScale = d3.scaleLinear().domain(this.xDomain).range([0, this.width, 0]);

    let svg = d3.select(element).append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    let groupsUnfiltered = this.dataset.map(d => d.group);
    let groups = groupsUnfiltered.filter((elem, pos, arr) => arr.indexOf(elem) == pos);
    let pos = this.dataset.map(d => d.name);

    this.xScale = d3.scaleLinear().domain(this.xDomain).range([0, this.width, 0]);

    let rectangles = svg.append('g')
      .selectAll("rect")
      .data(this.dataset)
      .enter();


    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale));


    var innerRects = rectangles.append("rect")
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("x", d => {
        return this.xScale(d.startPoint);
      })
      .attr("y", function (d: any, i) {
        for (var j = 0; j < groups.length; j++) {
          if (d.group == groups[j]) {
            return j * 40 + 24;
          }
        }
      })
      .attr("width", d => {
        return this.xScale((d.endPoint - d.startPoint));
      })
      .attr("height", 10)
      .attr("stroke", "none")
      .attr("fill", "#607D8B")


    var rectText = rectangles.append("text")
      .text(d => {
        return d.name;
      })
      .attr("x", d => {
        return (this.xScale(d.endPoint) - this.xScale(d.startPoint)) / 2 + this.xScale(d.startPoint);
      })
      .attr("y", function (d: any, i) {
        for (var j = 0; j < groups.length; j++) {
          if (d.group == groups[j]) {
            return j * 40 + 20;
          }
        }
      })
      .attr("font-size", 11)
      .attr("text-anchor", "middle")
      .attr("text-height", 40)
      .attr("fill", "black");

  }
}
