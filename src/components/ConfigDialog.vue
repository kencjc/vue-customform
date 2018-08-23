<template>
  <el-dialog class="cd-dialog" title="表单配置" :visible.sync="cdVisible" @close="hideDialog">
    <el-form ref="cdForm" :model="cdForm" :rules="rules">
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="cdForm.name"></el-input>
      </el-form-item>
      <el-form-item label="提示语" :label-width="formLabelWidth" prop="placeholder" v-if="placeholderAllowedArray.indexOf(cdForm.type) > -1">
        <el-input v-model="cdForm.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="key值" :label-width="formLabelWidth" prop="key">
        <el-input v-model="cdForm.key"></el-input>
      </el-form-item>
      <el-form-item label="是否必填" :label-width="formLabelWidth" prop="required">
        <el-switch v-model="cdForm.required" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="选项" :label-width="formLabelWidth" prop="options" v-if="optionsAllowedArray.indexOf(cdForm.type) > -1">
        <el-dialog class="op-dialog" width="35%" title="新增选项" :visible.sync="optionsDialogVisible" append-to-body @close="hideOptionsDialog">
          <el-form ref="opForm" :model="opForm">
            <el-form-item label="key值" :label-width="formLabelWidth" prop="label" required :rules="[{ required: true, message: 'key值不能为空'}]">
              <el-input v-model="opForm.label"></el-input>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name" required :rules="[{ required: true, message: '名称不能为空'}]">
              <el-input v-model="opForm.name"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="hideOptionsDialog">取 消</el-button>
            <el-button type="primary" @click="onOptionOk">确 定</el-button>
          </div>
        </el-dialog>
        <el-tag v-for="option in cdForm.options" :key="option.label" closable @close="delOption(option)">
          {{option.name}}
        </el-tag>
        <el-button icon="el-icon-plus" size="mini" circle @click="optionsDialogVisible = true"></el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cdVisible = false">取 消</el-button>
      <el-button type="primary" @click="onOk">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "ConfigDialog",
    props: {
      visible: Boolean,
      form: Object
    },
    data() {
      return {
        cdVisible: this.visible,
        cdForm: this.form,
        formLabelWidth: "80px",
        placeholderAllowedArray: ['text', 'number', 'timepicker'],
        optionsAllowedArray: ['radio', 'checkbox', 'select'],
        optionsDialogVisible: false,
        opForm: {},
        rules: { // 表单配置规则
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          key: [{
            required: true,
            message: '请设置key值',
            trigger: 'blur'
          }],
        }
      }
    },
    watch: {
      visible(val) {
        this.cdVisible = val
      },
      form(val) {
        console.log('form', val);
  
        this.cdForm = val
        console.log('cdForm', this.cdForm);
  
      }
    },
    methods: {
      // 关闭弹窗
      hideDialog() {
        this.$refs['cdForm'].clearValidate();
        console.log(this.cdForm);
  
        this.$emit('update:visible', false)
      },
  
      // 关闭Options弹窗
      hideOptionsDialog() {
        this.$refs['opForm'].resetFields();
        this.optionsDialogVisible = false;
      },
  
      // 校验表单配置
      onOk() {
        this.$refs['cdForm'].validate((valid) => {
          if (valid) {
            this.$emit('onOk', Object.assign({}, this.cdForm));
            this.$refs['cdForm'].clearValidate();
            this.cdVisible = false;
          } else {
            return false;
          }
        });
      },
  
      // 移除options选项
      delOption(option) {
        this.cdForm.options = this.cdForm.options.filter(item => {
          return item.label !== option.label;
        })
      },
  
      // 新增Option
      onOptionOk() {
        this.$refs['opForm'].validate((valid) => {
          if (valid) {
            this.cdForm.options.push(Object.assign({}, this.opForm))
            this.$refs['opForm'].resetFields();
            this.optionsDialogVisible = false;
          } else {
            return false;
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .cd-dialog {
    .el-input {
      width: 300px;
    }
    .el-tag {
      margin-right: 5px;
    }
  }
  
  .op-dialog {
    .el-input {
      width: 180px;
    }
  }
</style>
