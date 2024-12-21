import { Graph,Shape,Addon,FunctionExt} from '@antv/x6';
import {ports} from "./config"
import config from "./config"
console.log('config', config)
export default (graph) => {
  Graph.registerEdge(
    'edge-label',
    {
      inherit: 'edge',
      defaultLabel: {
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
        lines: {
          connection: true,
          strokeLinejoin: 'round',
        },
        attrs: {
          lines: {
            strokeLinejoin: 'round',
          },
          label: {
            fill: '#000',
            fontSize: 14,
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            pointerEvents: 'none',
          },
          body: {
            ref: 'label',
            fill: '#ffd591',
            stroke: '#ffa940',
            strokeWidth: 2,
            rx: 4,
            ry: 4,
            refWidth: '140%',
            refHeight: '140%',
            refX: '-20%',
            refY: '-20%',
          },
        },
        draggable: true,
        position: {
          distance: 200,
          options: {
            absoluteDistance: true,
            reverseDistance: true,
          },
        },
      },
      ports: { ...ports },
    },
    true,
  )




  Graph.registerNode(
    'interfaceOut',
    {
      inherit: 'rect',
      width: 80,
      height: 30,
      bizData: {x: 'xxx'},

      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#99a9ae',
          fill: '#e0f8ff',
          rx: 2, // 圆角的 x 半径
          ry: 2, // 圆角的 y 半径

        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: { ...ports },
    },
    true,
  )


  Graph.registerNode(
    'interfaceIn',
    {
      inherit: 'rect',
      width: 80,
      height: 30,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#8d9c85',
          fill: '#e1f8d3',
          rx: 2, // 圆角的 x 半径
          ry: 2, // 圆角的 y 半径

        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: { ...ports },
    },
    true,
  )



  Graph.registerNode(
    'platform',
    {
      inherit: 'rect',
      width: 120,
      height: 80,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#000',
          fill: '#fff',
          rx: 10, // 圆角的 x 半径
          ry: 10, // 圆角的 y 半径

          filter: {
            name: 'dropShadow',
            args: {
              dx: 3, // 阴影水平偏移
              dy: 3, // 阴影垂直偏移
              blur: 0, // 阴影模糊半径
              color: 'rgba(0, 0, 0, 0.9)', // 阴影颜色
            },
          },
        },
        text: {
          fontSize: 20,
        },
      },
      ports: { ...ports },
    },
    true,
  )

  Graph.registerNode(
    'system',
    {
      inherit: 'rect',
      width: 80,
      height: 80,
      attrs: {
        body: {
          strokeWidth: 2,
          stroke: '#5884F5',
          fill: '#E4EBFF',
        },
        text: {
          fontSize: 20,
          fill: '#5884F5',
        },
      },
      ports: { ...ports },
    },
    true,
  )

  Graph.registerNode(
    'moudle',
    {
      inherit: 'rect',
      width: 80,
      height: 80,
      attrs: {
        body: {
          strokeWidth: 2,
          stroke: '#396DA9',
          fill: '#F1F5F9',


        },
        text: {
          fontSize: 20,
          fill: '#396DA9',
        },
      },
      ports: { ...ports },
    },
    true,
  )
  Graph.registerNode(
    'image',
    {
      inherit: 'rect',
      width: 52,
      height: 52,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#5F95FF',
          fill: '#5F95FF',
        },
        image: {
          width: 26,
          height: 26,
          refX: 13,
          refY: 16,
        },
        label: {
          refX: 3,
          refY: 2,
          textAnchor: 'left',
          textVerticalAnchor: 'top',
          fontSize: 12,
          fill: '#fff',
        },
      },
      ports: { ...ports },
    },
    true,
  )

  // const imageShapes = [
  //   {
  //     label: 'Client',
  //     image:
  //       'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
  //   },
  //   {
  //     label: 'Http',
  //     image:
  //       'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
  //   },
  //   {
  //     label: 'Api',
  //     image:
  //       'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
  //   },
  //   {
  //     label: 'Sql',
  //     image:
  //       'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
  //   },
  //   {
  //     label: 'Clound',
  //     image:
  //       'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
  //   },
  //   {
  //     label: 'Mq',
  //     image:
  //       'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
  //   },
  // ]
  // const imageNodes = imageShapes.map((item) =>
  //   graph.createNode({
  //     shape: 'image',
  //     label: item.label,
  //     attrs: {
  //       image: {
  //         'xlink:href': item.image,
  //       },
  //     },
  //   }),
  // )
  const platform = graph.createNode({
    shape: 'platform',
    label: '平台',
    attrs: {
      label: {
        text: '平台',
      }
    }
  })

  const system = graph.createNode({
    shape: 'system',
    label: '系统',
    attrs: {
      label: {
        text: '系统',
      }
    }
  })
  const interfaceIn =
    graph.createNode({
      shape: 'interfaceIn',
      label: '内部接口',
      attrs: {
        label: {
          text: '内部接口',
        }
      }
    })
  const interfaceOut =
    graph.createNode({
      shape: 'interfaceOut',
      label: '外部接口',
      attrs: {
        label: {
          text: '外部接口',
        }
      }
    })





  const dashedArrow  = graph.addEdge({
    source: [170, 160],
    target: [550, 160],
    shape: 'edge-label',
    connector: {
      name: 'rounded',
      args: {},
    },
    attrs: {
      line: {
        stroke: '#ccc',
      },
      label: {
        text: 'Hello World',  // 设置标签的文本
        fill: 'black',  // 设置标签的颜色
        fontSize: 14,  // 设置字体大小
        // 给标签设置背景和边框
        background: {
          fill: '#FFF8DC',  // 设置标签背景色
          stroke: '#8B4513',  // 设置标签边框颜色
          strokeWidth: 2,  // 设置边框宽度
          rx: 5,  // 圆角
          ry: 5,  // 圆角
        },
        padding: [4, 8],  // 设置标签文本的内边距
      },
    },
    // labels: [
    //   {
    //     attrs: {
    //       line: {
    //         stroke: '#73d13d',
    //       },
    //       text: {
    //         text: 'Custom 2222Label',
    //       },
    //     },
    //   },
    // ],
  })
  return {
    platform,
    system,
    interfaceOut,
    interfaceIn,
    // dashedArrow,
    moudle: graph.createNode({
      shape: 'moudle',
      label: '模块',
    }),

    Rect: graph.createNode({
      width: 100,
      height: 60,
      attrs: {
        label: {
          text: '正方形节点',
          fill: '#000000',
          fontSize: 16,
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
    }),
    Circle: graph.createNode({
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
    }),
    polygon: graph.createNode({
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
    }),
    edge: graph.createEdge({
      source: { x: 0, y: 0 }, // 初始source位置
      target: { x: 100, y: 100 }, // 初始target位置
      shape: 'edge-label', // 边的形状
      position: [100, 100],
      attrs: {
        line: {
          stroke: '#5F95FF',
          strokeWidth: 1,
          targetMarker: {
            name: 'classic',
            size: 6,
          },
        },
      },
    })
  }
}
