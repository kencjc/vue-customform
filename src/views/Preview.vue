<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item :label="el.name + '：'" v-for="(el, index) in customForm" :key="index">
      <!-- 文本输入框 -->
      <el-input v-if="el.type === 'text'" size="small" v-model="form[el.key]"></el-input>
      <!-- 数组输入框 -->
      <el-input v-else-if="el.type === 'number'" type="number" size="small" v-model="form[el.key]"></el-input>
      <!-- 单选框 -->
      <el-radio-group v-else-if="el.type === 'radio'" v-model="form[el.key]">
        <el-radio v-for="o in el.options" :label="o.label" :key="o.label">{{o.name}}</el-radio>
      </el-radio-group>
      <!-- 复选框 -->
      <el-checkbox-group v-else-if="el.type === 'checkbox'" v-model="form[el.key]" @change="onChange">
        <el-checkbox v-for="o in el.options" :label="o.label" v-model="form[el.key]" :key="o.label">{{o.name}}</el-checkbox>
      </el-checkbox-group>
      <!-- 单项选择器 -->
      <el-select value="" v-else-if="el.type === 'select'" v-model="form[el.key]">
        <el-option v-for="o in el.options" :key="o.label" :label="o.name" :value="o.label">
        </el-option>
      </el-select>
      <!-- 时间选择器 -->
      <el-time-picker v-else-if="el.type === 'timepicker'" :picker-options="{ selectableRange: '00:00:00 - 23:59:59'}" v-model="form[el.key]">
      </el-time-picker>
      <!-- 时间范围选择器 -->
      <el-time-picker v-else-if="el.type === 'timerangepicker'" is-range v-model="form[el.key]">
      </el-time-picker>
      <!-- 日期选择器 -->
      <el-date-picker v-else-if="el.type === 'datepicker'" type="date" v-model="form[el.key]" value-format="yyyy-MM-dd">
      </el-date-picker>
      <!-- 日期范围选择器 -->
      <el-date-picker v-else-if="el.type === 'daterangepicker'" type="daterange" v-model="form[el.key]">
      </el-date-picker>
      <!-- 文本域 -->
      <el-input v-else-if="el.type === 'textarea'" type="textarea" :rows="2" v-model="form[el.key]">
      </el-input>
      <!-- 上传 -->
      <el-upload class="upload-demo" v-else-if="el.type === 'upload'" action="" v-model="form[el.key]">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">{{el.placeholder}}</div>
      </el-upload>
  
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Util from "@/common/util";
  
  export default {
    name: "preview",
    data() {
      return {
        form: {},
        customForm: [],
      }
    },
    created() {
  
    },
    mounted() {
      this.customForm = Util.getStore('customForm')
      this.customForm.forEach(item => {
        if (item.type === 'checkbox') {
          this.$set(this.form, item.key, [])
        } else {
          this.$set(this.form, item.key, '')
        }
      })
  
    },
    methods: {
      onSubmit() {
        console.log('Form', this.form)
      },
      onChange(value) {
        console.log(value);
      }
    }
  };
</script>
