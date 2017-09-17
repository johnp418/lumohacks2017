import React, { Component } from "react";
import * as d3 from "d3";
import { LineChart } from "react-d3-basic";
// http://www.reactd3.org/docs/basic/#line_multiple
class Chart extends Component {
  // constructor() {
  //   super();
  // }
  render() {
    // your date format, use for parsing
    var parseDate = d3.time.format("%YM%m").parse;

    var width = 700,
      height = 300,
      margins = { left: 100, right: 100, top: 50, bottom: 50 },
      // chart series,
      // field: is what field your data want to be selected
      // name: the name of the field that display in legend
      // color: what color is the line
      chartSeries = [
        {
          field: "year",
          name: "Year"
        },
        {
          field: "sale",
          name: "Sale"
        },
        {
          field: "yolo",
          name: "YOLO"
        }
      ],
      // your x accessor
      x = function(d) {
        console.log("d in dx", d);
        return d.sale;
      },
      y = d => {
        console.log("yy = d", d);
        return d.year;
      };

    var data = [
      {
        sale: 202,
        year: "2000",
        yolo: 132
      }
    ];
    let xLabel = "Date";
    let yLabel = "Time";
    let xDomain = d3.extent(data, x);
    // let yDomain = d3.extent(data, y);

    return (
      <LineChart
        title="TEAE"
        data={data}
        width={width}
        height={height}
        margins={margins}
        chartSeries={chartSeries}
        x={x}
        // xDomain= {xDomain}
        xLabel={xLabel}
        y={y}
        // yDomain= {yDomain}
        // yLabel = {yLabel}
      />
    );
  }
}

export default Chart;
