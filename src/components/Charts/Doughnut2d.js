// STEP 1 - Include Dependencies
// Include react
import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({data}) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption : "Stars Per Language",
        decimals : 0,
        doughnutRadius : "50%",
        showPercentValues : 0,
        theme : 'candy',
      },
      data,
    }
  };
  return (<ReactFC {...chartConfigs} />);
}

export default ChartComponent;