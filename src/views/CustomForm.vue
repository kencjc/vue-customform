<template>
  <el-row>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>可用组件</span>
        </div>
        <div v-for="(c,index) in controls" :key="index" class="text item">
          <el-col :span="8">
            <el-button class="controls-item">{{c.name}}</el-button>
          </el-col>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "customForm",
    data() {
      return {
        dialogVisible: false,
        controls: [{
          type: 'text',
          name: '文本输入框',
        }, {
          type: 'number',
          name: '数字输入框',
        }, {
          type: 'radio',
          name: '单选框',
        }, {
          type: 'checkbox',
          name: '多选框',
        }]
      }
    },
    mounted() {
      console.log('mounted');
  
    }
  };
</script>

<style lang="scss" scoped>
  .controls-item {
    margin-bottom: 20px;
  }
</style>
