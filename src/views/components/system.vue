<template>
  <Form :model="formItem" :label-width="120">
    <FormItem label="名称">
      <Input disabled v-model="formItem.name" placeholder=""></Input>
    </FormItem>
    <FormItem label="架构资产类型">
      <Input disabled v-model="formItem.zclx" placeholder=""></Input>
    </FormItem>
    <FormItem label="状态">
      <Select v-model="formItem.status">
        <Option value="tc">投产</Option>
      </Select>
    </FormItem>
    <FormItem label="业务能力">
      <CheckboxGroup v-model="formItem.ywnl">
        <Checkbox label="订单管理" value="1"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="组织">
      <CheckboxGroup v-model="formItem.zz">
        <Checkbox label="业务部" value="1"></Checkbox>
        <Checkbox label="法务部" value="2"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="数据架构">
      <CheckboxGroup v-model="formItem.sjjg">
        <Checkbox label="销售订单" value="1"></Checkbox>
        <Checkbox label="采购订单" value="2"></Checkbox>
        <Checkbox label="发运计划" value="3"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="创建人">
      <Input disabled v-model="formItem.createUser" placeholder=""></Input>
    </FormItem>
    <FormItem label="最后修改人">
      <Input disabled v-model="formItem.updateUser" placeholder=""></Input>
    </FormItem>
    <FormItem label="创建日期">
      <DatePicker disabled type="date" placeholder="" v-model="formItem.createDate"></DatePicker>
    </FormItem>
    <FormItem label="最后修改日期">
      <DatePicker  disabled type="date" placeholder="" v-model="formItem.updateDate"></DatePicker>
    </FormItem>
  </Form>
</template>
<script>
export default {
  props: {

    info: {
      type: Object,
      default:{

      }
    }
  },
  data () {
    return {
      formItem: {
        name: '订单系统',
        status: 'tc',
        createUser: 'admin',
        createDate: new Date(),
        updateUser: 'admin',
        updateDate:new Date(),
        ywnl: ['订单管理'],
        zz: ['业务部'],
        sjjg: ['销售订单', '采购订单'],
      }
    }
  },
  mounted() {
    // this.formItem = {
    //   ...this.info
    // }
  }
}
</script>
