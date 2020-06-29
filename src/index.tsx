import { Chart } from "@antv/g2";
import {
  VisualizationBase,
  IKeyValues,
  OutputMode
} from "@qn-pandora/visualization-sdk";
import sortBy from "lodash/sortBy";
import get from "lodash/get";
import { colors as defaultColors } from "./constants";

import "./styles.less";

export default class VisualizationStore extends VisualizationBase {
  chart: Chart | null = null;

  getInitialDataParams() {
    return {
      outputMode: OutputMode.JsonRows,
      count: 10000
    };
  }

  updateView(dataset: any, config: IKeyValues) {
    // 根据 dataset 数据 和 config 实现可视化逻辑
    const { fields, rows } = dataset;
    let { bucket, metric, shape = "funnel" } = config;
    if (!bucket || !metric || !rows.length) {
      console.error("暂无数据");
      return;
    }
    const data = sortBy(
      rows.map((row: any, index: number) => {
        const metricIndex = fields.findIndex(
          (field: any) => field.name === metric
        );
        const bucketIndex = fields.findIndex(
          (field: any) => field.name === bucket
        );
        return {
          metric: row[bucketIndex],
          value: get(row, metricIndex) || get(row, [metricIndex, 0]),
          color: defaultColors[index % defaultColors.length]
        };
      }),
      data => -data.value
    );
    this.element.innerHTML = "";
    this.chart = new Chart({
      container: this.element,
      autoFit: true
    });

    this.chart.clear();
    this.chart.data(data);
    this.chart.axis(false);
    this.chart
      .coordinate("rect")
      .transpose()
      .scale(1, -1);
    this.chart.tooltip({
      showMarkers: false
    });
    this.chart
      .interval()
      .adjust("symmetric")
      .position("metric*value")
      .shape(shape)
      .color(
        "metric",
        data.map(d => d.color)
      )
      .label(
        "metric*value",
        (metric, value) => {
          return {
            content: `${metric} ${value}`
          };
        },
        {
          offset: 35,
          labelLine: {
            style: {
              lineWidth: 1,
              stroke: "rgba(0, 0, 0, 0.15)"
            }
          }
        }
      )
      .tooltip("metric*value*percent", (metric, value, percent) => {
        return {
          name: metric,
          percent: +percent * 100 + "%",
          value
        };
      })
      .animate({
        appear: {
          animation: "fade-in"
        },
        update: {
          annotation: "fade-in"
        }
      } as any);

    this.chart.interaction("element-active");
    this.chart.render();
  }
}
