import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-relapses-chart',
  templateUrl: './relapses-chart.component.html',
  styleUrls: ['./relapses-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RelapsesChartComponent implements OnInit {
  @ViewChild("relapseschart") private chartContainer: ElementRef;
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
      //.datum(this.datasetA)
      .datum([
        { "x": d3.min(this.xDomain), "y": 50 },
        { "x": d3.max(this.xDomain), "y": 50 }
      ])
      .attr("class", "lineA")
      .attr("d", lineA);

      

    let arc = d3.symbol().type(d3.symbolTriangle).size(100);
   svg.selectAll(".dotA")
      .data(this.datasetA)
      .enter().append('path')
      .attr('d', arc)
     
      .attr('transform', d => {
        return `translate(${(this.xScale(d.x))}, 40) rotate(180)`;
      })

      .attr('class', 'x-axis-arrow')
      .style("stroke", "red")
      .style("fill", d => {return d.y?'red':'#fff';
        
      })


  }
}
