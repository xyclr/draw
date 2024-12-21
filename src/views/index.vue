<template>
  <div class="container_warp">
    <div id="zoom"  style="position: fixed;right: 322px;bottom: 140px;background: #fff;z-index: 999">
      <InputNumber size="small"  :formatter="value => `${value}%`" :min="10"  step="10" style="width:100px;" v-model="currentZoom" controls-outside />
    </div>
    <div class="operating">
      <div class="btn-group">
        <Tooltip content="放大" placement="bottom">
          <div class="btn" @click="onZoom(1)">
            <i class="iconfont icon-x6zoom-out"></i>
          </div>
        </Tooltip>
        <Tooltip content="缩小" placement="bottom">
          <div class="btn" @click="onZoom(0)">
            <i class="iconfont icon-x6zoomout"></i>
          </div>
        </Tooltip>
      </div>
      <div class="btn-group">
        <Tooltip content="直线箭头" placement="bottom">
          <div :class=" ['btn',currentArrow === 1?'currentArrow':'']" @click="changeEdgeType('normal')">
            <i class="iconfont icon-x6zhixianjiantou"></i>
          </div>
        </Tooltip>
        <Tooltip content="曲线箭头" placement="bottom">
          <div :class=" ['btn',currentArrow === 2?'currentArrow':'']" @click="changeEdgeType('smooth')">
            <i class="iconfont icon-x6a-quxianjiantou"></i>
          </div>
        </Tooltip>
        <Tooltip content="直角箭头" placement="bottom">
          <div :class=" ['btn',currentArrow === 3?'currentArrow':'']" @click="changeEdgeType()">
            <i class="iconfont icon-x6subdirectory_arrow_right"></i>
          </div>
        </Tooltip>
      </div>
      <!-- <div class="btn-group">
        <div class="btn" @click="changeMode('edit')" title="选择模式">
          <i class="iconfont icon-mousepointershubiao"></i>
        </div>
        <div class="btn" @click="changeMode('drag')" title="拖拽模式">
          <i class="iconfont icon-tuozhuai"></i>
        </div>
      </div> -->
      <div class="btn-group">
        <!--        <Tooltip content="放大" placement="bottom">-->
        <!--          <div class="btn" @click="zoom(1)" ttle="放大">-->
        <!--            <i class="iconfont icon-x6fangda"></i>-->
        <!--          </div>-->
        <!--        </Tooltip>-->
        <!--        <Tooltip content="缩小" placement="bottom">-->
        <!--          <div class="btn" @click="zoom(0)" title="缩小">-->
        <!--            <i class="iconfont icon-x6fangda_suoxiao"></i>-->
        <!--          </div>-->
        <!--        </Tooltip>-->
        <Tooltip content="后退" placement="bottom">
          <div class="btn" :class="{'disabled': !canUndo}" @click="changeHistory(0)" title="后退">
            <i class="iconfont icon-x6undo"></i>
          </div>
        </Tooltip>
        <Tooltip content="前进" placement="bottom">
          <div class="btn" :class="{'disabled': !canRedo}" @click="changeHistory(1)" style="margin-top: 5px;">
            <i class="iconfont icon-x6redo"></i>
          </div>
        </Tooltip>
      </div>
      <div class="btn-group">
        <Tooltip content="删除" placement="bottom">
          <div class="btn" @click="deleteNode()" style="margin-top: 5px;">
            <i class="iconfont icon-x6lajixiang_huaban1"></i>
          </div>
        </Tooltip>
        <Tooltip content="保存PNG" placement="bottom">
          <div class="btn" @click="saveToPNG()" title="保存">
            <i class="iconfont icon-x6baocun1"></i>
          </div>
        </Tooltip>
      </div>
    </div>
    <div class="sidebar">
      <div class="group" :class="{'active': item.name === activeTab}" v-for="item in tabs">
        <div class="mt" @click="activeTab = item.name">
         <span class="title">{{ item.label }}
         </span>

          <span><Icon :type="item.name === activeTab ? 'ios-arrow-down' : 'ios-arrow-forward'"/></span>
        </div>
        <div class="mc">
          <div v-for="sub in item.items" class="btn" :title="sub.label" @mousedown="startDrag(sub.shape,$event)">


            <img :width="sub.width" :height="sub.height" v-if="sub.isImg" :src="sub.src" alt="">
            <i style="font-size: 30px;" v-else="sub.isImg" :class="sub.icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div id="containerChart"></div>
    <div id="mini-map"></div>

    <Modal
      v-model="bizModelVis"
      width="600"
      :title="bizModelTitle"
      @on-ok="onBizModelConfirm"
      @on-cancel="bizModelVis = false">
      <Platform v-if="bizModelType === 'platform'" ref="platform" :info="bizModelData"/>
    </Modal>

    <RightDrawer class="right_drawer" :drawerType="type" :selectCell="selectCell" :graph="graph" :grid="grid"
                 @deleteNode="deleteNode"></RightDrawer>

  </div>

</template>
<script>
import '@antv/x6-vue-shape'
import {Graph, Shape, Addon, FunctionExt, DataUri} from '@antv/x6';
import RightDrawer from './components/RightDrawer';
import insertCss from 'insert-css';
import {startDragToGraph} from './Graph/methods.js'
import Platform from "./components/platform"

const data = {};
export default {
  components: {
    RightDrawer,
    Platform
  },
  data() {
    return {
      currentZoom: 100,
      canUndo: true,
      canRedo: true,
      bizModelTitle: '',
      bizModelType: '',
      bizModelVis: false,
      bizModelData: false,
      bizNode: null,
      tabs: [
        {
          label: '架构组件',
          name: 'platform',
          items: [
            // {
            //   shape: 'edge',
            //   label: '平台',
            //   isImg: true,
            //   src: require('../assets/platform.png'),
            //   width: 60,
            //   height: 40
            // },
            {
              shape: 'platform',
              label: '平台',
              isImg: true,
              src: require('../assets/platform.png'),
              width: 60,
              height: 40
            },
            {
              shape: 'system',
              label: '系统',
              isImg: true,
              src: require('../assets/system.png'),
              width: 40,
              height: 40
            },
            {
              shape: 'moudle',
              label: '模块',
              isImg: true,
              src: require('../assets/moudle.png'),
              width: 40,
              height: 40
            }

          ]
        },
        {
          label: '接口',
          name: 'interface',
          items: [
            {
              shape: 'interfaceOut',
              label: '内部接口',
              src: require('../assets/interfaceIn.png'),
              isImg: true,
              width: 60,
              height: 26
            },
            {
              shape: 'interfaceIn',
              label: '外部接口',
              isImg: true,
              src: require('../assets/interfaceOut.png'),
              width: 60,
              height: 26
            }
          ]
        },
        {
          label: '常用',
          name: 'gen',
          items: [
            {
              shape: 'Circle',
              label: '圆形',
              isImg: false,
              icon: 'iconfont icon-x6juxinggongju_huaban1'
            },
            {
              shape: 'Rect',
              label: '方形',
              isImg: false,
              icon: 'iconfont icon-x6juxinggongju_huaban1',
            },
            {
              shape: 'polygon',
              label: '菱形',
              isImg: false,
              icon: 'iconfont icon-x6Instance',
            },
          ]
        }
      ],
      activeTab: "platform",
      graph: '',
      history: null,
      value1: true,
      type: 'grid',
      selectCell: '',
      connectEdgeType: {  //连线方式
        connector: 'normal',
        router: {
          name: ''
        }
      },
      showTips: false,
      currentArrow: 1,
      grid: { // 网格设置
        size: 20,      // 网格大小 10px
        visible: true, // 渲染网格背景
        type: 'mesh',
        args: {
          color: '#D0D0D0',
          thickness: 1,     // 网格线宽度/网格点大小
          factor: 10,
        },
      }
    }
  },

  watch: {
    currentZoom: function (n) {
      this.graph.zoomTo(parseFloat(n / 100))
    }
  },
  methods: {
    onZoom(d) {
      let zoom = this.graph.zoom()
      let newZoom = zoom + (d ? 0.1 : -0.1)
      if(newZoom < 0.1) {
        newZoom = 0.1
      }
      this.graph.zoomTo(newZoom);
    },
    changeHistory(t) {
      console.log('changeHistory')
      this.graph.history[!t ? 'undo' : 'redo']()
    },
    onBizModelConfirm(d) {
      console.log('onBizModelConfirm', d)
      this.bizModelVis = false;
      this.bizNode.setData({
        ...(this.$refs.platform.formItem || {})
      })
    },
    initX6() {
      var _that = this
      this.graph = new Graph({
        container: document.getElementById('containerChart'),
        width: '100%',
        height: '100%',
        scroller: {
          enabled: true,
          // pannable: true,
          // pageVisible: true,
          // pageBreak: false,
        },
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl'],
        },
        history: true,
        minimap: {
          enabled: true,
          width: 100,
          height: 100,
          container: document.getElementById('mini-map'),
        },
        grid: _that.grid,
        resizing: { //调整节点宽高
          enabled: true,
          orthogonal: false,
        },
        selecting: true, //可选
        snapline: true,
        interacting: {
          edgeLabelMovable: true
        },
        connecting: { // 节点连接
          anchor: 'center',
          connectionPoint: 'anchor',
          allowBlank: false,
          snap: true,
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  strokeDashoffset: 20,
                  strokeWidth: 1,
                  targetMarker: {
                    name: 'classic',
                    size: 8
                  },
                  strokeDasharray: 0, // 虚线
                  style: {
                    animation: 'ant-line 30s infinite linear',
                  },
                },

              },
              label: {
                fontSize: 14,
                fill: 'blue',
                fontFamily: 'Arial, helvetica, sans-serif',
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
              },
              connector: _that.connectEdgeType.connector,
              router: {
                name: _that.connectEdgeType.router.name || ''
              },
              zIndex: 0
            })
          },
        },
        embedding: {
          enabled: true,
          findParent({node}) {
            console.log('findParent', node)
            const bbox = node.getBBox()
            return this.getNodes().filter((node) => {
              // 只有 data.parent 为 true 的节点才是父节点
              const data = node.getData()
              console.log('findParent getData', data)
              if (data && data.parent) {
                const targetBBox = node.getBBox()
                return bbox.isIntersectWithRect(targetBBox)
              }
              return false
            })
          }
        },
        highlighting: {
          magnetAvailable: {
            name: 'stroke',
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 4,
                stroke: '#6a6c8a'
              }
            }
          }
        },
      });
      insertCss(`
              @keyframes ant-line {
                to {
                    stroke-dashoffset: -1000
                }
              }
            `)
      this.graph.fromJSON(data)
      this.graph.history.on('change', () => {
        this.canUndo = this.graph.history.canUndo();
        this.canRedo = this.graph.history.canRedo();
      });
      // 鼠标移入移出节点
      this.graph.on('node:mouseenter', FunctionExt.debounce(() => {
          const container = document.getElementById('containerChart')
          const ports = container.querySelectorAll(
            '.x6-port-body'
          )
          this.showPorts(ports, true)
        }),
        500
      )
      this.graph.on('node:mouseleave', () => {
        const container = document.getElementById('containerChart')
        const ports = container.querySelectorAll(
          '.x6-port-body'
        )
        this.showPorts(ports, false)
      })
      this.graph.on('blank:click', () => {
        this.type = 'grid'
      })
      this.graph.on('cell:click', ({cell}) => {
        this.type = cell.isNode() ? 'node' : 'edge'
      })

      this.graph.on('edge:mouseenter', ({e, edge}) => {
        // 高亮显示边，表示可以连接
        // edge.addClass('highlight');
        console.log('edge mouseenter')
      });

      this.graph.on('edge:mouseleave', ({e, edge}) => {
        // 取消高亮显示
        // edge.removeClass('highlight');
        console.log('edge mouseleave')
      });

      this.graph.on('edge:connected', ({edge, targetCell, sourceCell}) => {
        console.log('edge connected')

        if (targetCell) {
          edge.setTarget(targetCell);  // 更新目标节点
        }
        if (sourceCell) {
          edge.setSource(sourceCell);  // 更新源节点
        }
      });

      this.graph.on('edge:dragend', ({e, edge}) => {
        // 拖拽结束后，设置边的source和target

        const sourceNode = edge.getSourceNode();
        const targetNode = edge.getTargetNode();
        console.log('edge:dragend', sourceNode, targetNode)
        if (sourceNode && targetNode) {
          edge.setData({
            source: sourceNode.id,
            target: targetNode.id,
          });
        }
      });


      this.graph.on('cell:dblclick', ({node, cell}) => {
        if (node.shape === 'platform') {
          this.bizModelVis = true;
          this.bizNode = node
          this.bizModelTitle = '应用属性'
          this.bizModelData = node.getData()
          this.bizModelType = 'platform'
        }

        console.log('xxxxx', node, cell, node.getData())
      })
      this.graph.on('selection:changed', (args) => {
        args.added.forEach(cell => {
          this.selectCell = cell
          if (cell.isEdge()) {
            cell.isEdge() && cell.attr('line/strokeDasharray', 5) //虚线蚂蚁线
            cell.addTools([
              {
                name: 'vertices',
                args: {
                  padding: 4,
                  attrs: {
                    strokeWidth: 0.1,
                    stroke: '#2d8cf0',
                    fill: '#ffffff',
                  }
                },
              },
            ])
          }
        })
        args.removed.forEach(cell => {
          cell.isEdge() && cell.attr('line/strokeDasharray', 0)  //正常线
          cell.removeTools()
        })
      })
    },
    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
    // 拖拽生成正方形或者圆形
    startDrag(type, e) {
      console.log('startDrag', type, e)
      startDragToGraph(this.graph, type, e)
    },
    // 删除节点
    deleteNode() {
      const cell = this.graph.getSelectedCells()
      this.graph.removeCells(cell)
      this.type = 'grid'
    },
    // 保存png
    saveToPNG() {
      this.$nextTick(() => {
        this.graph.toPNG((dataUri) => {
          // 下载
          DataUri.downloadDataUri(dataUri, '资产拓扑图.png')
        }, {
          backgroundColor: 'white',
          padding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
          },
          quality: 1,
          copyStyles: false
        })
      })

    },
    // 改变边形状
    changeEdgeType(e) {
      if (e === 'normal') {
        this.connectEdgeType = {
          connector: 'normal',
          router: {name: ''}
        }
        this.currentArrow = 1
      } else if (e === 'smooth') {
        this.connectEdgeType = {
          connector: 'smooth',
          router: {name: ''}
        }
        this.currentArrow = 2
      } else {
        this.connectEdgeType = {
          connector: 'normal',
          router: {name: 'manhattan'}
        }
        this.currentArrow = 3
      }
    }
  },
  mounted() {
    this.initX6()
    setTimeout(() => {
      this.showTips = true
    }, 1000)
    setTimeout(() => {
      this.showTips = false
    }, 5000)
  }
};
</script>
<style lang="less">
@import '../assets/iconfont.css';
@import './index.less';

#zoom {
  position: fixed;
  right: 220px;
  bottom: 300px;
  width: 100px;
  height: 20px;
}
.container_warp {
  display: flex;
  height: 100vh;
}

.disabled.btn i {
  opacity: 0.4;
  cursor: default;
}

.rotate90 {
  transform: rotateY(90deg);
  transform-style: preserve-3d;
}



.sidebar {
  box-shadow: 2px 2px 4px 0 #0a0a0a2e;
  width: 220px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  left: 0px;
  top: 50%;
  margin-top: -100px;
  background: #fff;
  border-top: 5px solid #ddd;
  border-bottom: none;
  z-index: 999;
  padding: 0;

  .rotate {
    display: inline-block;
    transform: rotate(45deg);
  }

  .group {
    border-bottom: 1px solid #ddd;
    width: 100%;

    &.active {
      .mc {
        display: block;
      }
    }

    .mt {
      display: flex;
      height: 30px;
      line-height: 30px;
      justify-content: space-between;
      padding: 0 10px;
      cursor: pointer;
    }

    .mc {
      display: none;

      > div {
        display: inline-block;
        padding: 10px;
      }
    }


  }
}
</style>
