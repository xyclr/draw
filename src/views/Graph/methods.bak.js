import '@antv/x6-vue-shape';
import { Graph,Shape,Addon,FunctionExt} from '@antv/x6';
import AddCusNodes from "./addCusNodes";



// 拖拽生成四边形或者圆形
export const startDragToGraph  = (graph,type,e) =>{
  return
    const node =
    type === 'Rect'
    ?
      graph.createNode({
      width: 100,
      height: 60,
      attrs: {
        label: {
          text: '正方形节点',
          fill: '#000000',
          fontSize: 14,
          textWrap: {
            width: -10,
            height: -10,
            ellipsis: true,
          },
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports
    })
  : type === 'Circle'?graph.createNode({
      shape: 'ellipse',
      width: 100,
      height: 100,
      attrs: {
        label: {
          text: '圆形节点',
          fill: '#000000',
          fontSize: 14,
          textWrap: {
            width: -20,
            height: -10,
            ellipsis: true,
          },
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports
    }):
    graph.createNode({
      shape: 'polygon',
      x: 40,
      y: 40,
      width: 120,
      height: 120,
      attrs: {
        label: {
          text: '条件节点',
          fill: '#000000',
          fontSize: 14,
          textWrap: {
            width: -50,
            height: '70%',
            ellipsis: true,
          },
        },
        body: {
          fill: '#ffffff',
          stroke: '#000000',
          refPoints: '0,10 10,0 20,10 10,20',
          strokeWidth: 1,
        },
      },
      ports: ports
    })
    const dnd = new Addon.Dnd({target:graph})
    dnd.start(node,e)
}
