import { Chart } from "@antv/g2";
import {
  VisualizationBase,
  IKeyValues,
  OutputMode
} from "@qn-pandora/visualization-sdk";

export default class VisualizationStore extends VisualizationBase {
  getInitialDataParams() {
    return {
      outputMode: OutputMode.JsonCols,
      count: 10000
    };
  }

  updateView(dataset: any, config: IKeyValues) {
    // 根据 dataset 数据 和 config 实现可视化逻辑
    console.log("updateView", dataset, config);
    const data = [
      { genre: "Sports", sold: 275 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 }
    ];
    const chart = new Chart({
      container: this.element, // 指定图表容器 ID
      width: 600, // 指定图表宽度
      height: 300 // 指定图表高度
    });
    chart.data(data);
    chart.interval().position("genre*sold");
    chart.render();
  }
}
