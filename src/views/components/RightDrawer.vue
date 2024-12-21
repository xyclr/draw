<template>
  <div class="drawer_container">
    <div v-if="drawerType === 'grid'">
      <div class="drawer_title">画布背景设置</div>
      <div class="drawer_wrap">
        <Form label-position="left" :label-width="85">
          <FormItem label="是否显示网格" :label-width="100">
            <i-switch v-model="showGrid" @on-change="changeGrid"/>
          </FormItem>
          <div v-show="showGrid">
            <FormItem label="网格类型">
              <RadioGroup v-model="grid.type" @on-change="changeGridType">
                <Radio v-for="item in gridTypeList" :label="item.value" :key="item.value">
                  <span>{{ item.label }}</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="网格大小">
              <Slider v-model="grid.size" :min="0" :max="30" @on-change="changeGrid"></Slider>
            </FormItem>
            <FormItem label="网格颜色">
              <ColorPicker v-model="grid.args.color" @on-change="changeGrid"/>
            </FormItem>
            <FormItem label="网格线宽度">
              <Slider v-model="grid.args.thickness" :min="0" :max="20" @on-change="changeGrid"></Slider>
            </FormItem>
          </div>

        </Form>
      </div>
    </div>
    <div v-if="drawerType === 'node'">
      <div class="drawer_title">节点设置</div>
      <div class="drawer_wrap">
        <Form label-position="left" :label-width="80">
          <FormItem label="父节点">
            <i-switch v-model="drawerNode.parent" @on-change="changeNodeParent"/>
          </FormItem>
          <FormItem label="节点文本">
            <Input v-model="drawerNode.nodeText" @on-change="changeNodeText"></Input>
          </FormItem>
          <FormItem label="节点背景">
            <ColorPicker v-model="drawerNode.fill" @on-change="changeFill"/>
          </FormItem>
          <FormItem label="字体大小">
            <Slider v-model="drawerNode.fontSize" :min="10" :max="20" @on-change="changefontSize"></Slider>
          </FormItem>
          <FormItem label="字体颜色">
            <ColorPicker v-model="drawerNode.fontFill" @on-change="changeFontFill"/>
          </FormItem>
          <FormItem label="边框宽度">
            <Slider v-model="drawerNode.strokeWidth" :min="0" :max="10" @on-change="changeStrokeWidth"></Slider>
          </FormItem>
          <FormItem label="边框颜色">
            <ColorPicker v-model="drawerNode.stroke" @on-change="changeStroke"/>
          </FormItem>
          <FormItem label="功能">
            <Button icon="md-trending-up" @click="toTopZIndex">置顶</Button>
            <Button class="margin-left-10" icon="md-trash" @click="deleteNode">删除</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <div v-if="drawerType === 'edge'">
      <div class="drawer_title">线条设置</div>
      <div class="drawer_wrap">
        <Form label-position="left" :label-width="80">
          <FormItem label="线条文本">
            <Input v-model="drawerEdge.EdgeText" @on-change="changeEdgeText"></Input>
          </FormItem>
          <FormItem label="线条宽度">
            <Slider v-model="drawerEdge.edgeWidth" :min="1" :max="10" @on-change="changeEdgeWidth"></Slider>
          </FormItem>
          <FormItem label="线条颜色">
            <ColorPicker v-model="drawerEdge.edgeColor" @on-change="changeEdgeColor"/>
          </FormItem>
          <FormItem label="功能">
            <Button icon="md-trending-up" @click="toTopZIndex">置顶</Button>
            <Button class="margin-left-10" icon="md-trash" @click="deleteNode">删除</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightDrawer',
  data() {
    return {
      gridTypeList: [
        {
          label: '四边网格',
          value: 'mesh'
        },
        {
          label: '点状网格',
          value: 'dot'
        }
      ],
      showGrid: true,
      drawerNode: {
        fill: '',
        nodeText: '',
        fontSize: null,
        fontFill: '',
        strokeWidth: null,
        stroke: '',
        parent: false,
      },
      drawerEdge: {
        EdgeText: '',
        edgeWidth: null,
        edgeColor: ''
      },
    };
  },
  props: {
    drawerType: {
      type: String
    },
    selectCell: {
      type: String | Object
    },
    graph: {
      type: String | Object
    },
    grid: {
      type: Object
    }
  },
  created() {

  },
  mounted() {
  },
  watch: {
    selectCell: {
      handler(val) {
        if (val) {
          if (val.isNode()) { //节点
            this.drawerNode.fill = val.store.data.attrs.body.fill
            this.drawerNode.nodeText = val.store.data.attrs.label.text
            this.drawerNode.fontFill = val.store.data.attrs.label.fill
            this.drawerNode.fontSize = Number(val.store.data.attrs.label.fontSize)
            this.drawerNode.strokeWidth = Number(val.store.data.attrs.body.strokeWidth)
            this.drawerNode.stroke = val.store.data.attrs.body.stroke
            this.drawerNode.parent = !!val.store.data.parent
          } else { //边
            this.drawerEdge.EdgeText = val.store.data.labels ? val.store.data.labels[0].text : ''
            this.drawerEdge.edgeWidth = Number(val.store.data.attrs.line.strokeWidth)
            this.drawerEdge.edgeColor = val.store.data.attrs.line.stroke
          }
        }
      },
      immediate: true,
      deep: false
    },
  },
  methods: {
    // 网格设置
    changeGrid() {
      this.showGrid ? this.graph.showGrid() : this.graph.hideGrid()
    },
    changeGridType(e) {
      this.grid.type = e
      this.changeGrid()
    },
    changeGrid() {
      this.graph.drawGrid({
        ...this.grid
      })
    },
    // 节点设置
    changeStrokeWidth(val) {
      this.selectCell.attr('body/strokeWidth', val)
    },
    changefontSize(val) {
      this.selectCell.attr('label/fontSize', val)
    },
    changeNodeText() {
      this.selectCell.attr('label/text', this.drawerNode.nodeText)
    },
    changeNodeParent() {
      const data = this.selectCell.getData() || {};
      this.selectCell.setData({
        ...data,
        parent: this.drawerNode.parent,
      });

      console.log('changeNodeParent')
      // this.selectCell.attr('label/position', this.drawerNode.parent ? 'top' : 'center')
      this.selectCell.attr('text/refY', this.drawerNode.parent ? 0.1 : 0.5)
    },
    changeStroke(val) {
      this.drawerNode.stroke = val
      this.selectCell.attr('body/stroke', this.drawerNode.stroke)
    },
    changeFontFill(val) {
      this.drawerNode.fontFill = val
      this.selectCell.attr('label/fill', this.drawerNode.fontFill)
    },
    changeFill(val) {
      this.drawerNode.fill = val
      this.selectCell.attr('body/fill', val)
    },
    // 边设置
    changeEdgeText() {
      console.log( this.selectCell);
      this.selectCell.setLabels(
        {attrs: {label: {
              text: this.drawerEdge.EdgeText,
              fill: 'red',
              background: {
                fill: '#FFF8DC',  // 设置标签背景色
                stroke: '#8B4513',  // 设置标签边框颜色
                strokeWidth: 2,  // 设置边框宽度
                rx: 5,  // 圆角
                ry: 5,  // 圆角
              },
              fill: 'red',  // 背景颜色
            }}}
      )
    },
    changeEdgeWidth(val) {
      this.drawerEdge.edgeWidth = val
      this.selectCell.attr('line/strokeWidth', this.drawerEdge.edgeWidth)
    },
    changeEdgeColor(val) {
      this.drawerEdge.stroke = val
      this.selectCell.attr('line/stroke', this.drawerEdge.stroke)
    },
    // 置顶
    toTopZIndex() {
      this.selectCell.toFront()
    },
    // 删除
    deleteNode() {
      this.$emit('deleteNode')
    },
  },
};
</script>

<style lang="less" scoped>
.drawer_container {
  max-width: 300px;
  min-width: 300px;
  position: fixed;
  right: 0;

  .drawer_title {
    border-bottom: 1px solid #e8eaec;
    box-sizing: border-box;
    padding: 14px 16px;
    color: #333;
    font-size: 16px;
  }

  .drawer_wrap {
    box-sizing: border-box;
    padding: 20px 10px 20px 20px;
  }
}
</style>
<style>
.x6-edge-label {
  background: green;
}
</style>
