import '@antv/x6-vue-shape';
import {Graph, Shape, Addon, FunctionExt} from '@antv/x6';
import AddCusNodes from "./addCusNodes";


// 拖拽生成四边形或者圆形
export const startDragToGraph = (graph, type, e) => {
  const nodes = AddCusNodes(graph);
  const dnd = new Addon.Dnd({target: graph})
  console.log('nodes', nodes, type)
  dnd.start(nodes[type], e)
}
