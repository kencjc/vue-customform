<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>可用组件</span>
        </div>
        <el-form ref="form" label-width="100px">
          <draggable :clone="cloneData" :list="controls" :move="onMove" @update="dragEnd" :options="dragOptions">
            <transition-group class="drag-form" type="transition" tag="div">
              <el-form-item :label="el.name + '：'" v-for="(el, index) in controls" :key="index">
                <!-- 文本输入框 -->
                <el-input v-if="el.type === 'text'" size="small"></el-input>
                <!-- 数组输入框 -->
                <el-input v-else-if="el.type === 'number'" type="number" size="small"></el-input>
                <!-- 单选框 -->
                <el-radio-group v-else-if="el.type === 'radio'">
                  <el-radio v-for="o in el.options" :label="o.label" :key="o.label">{{o.name}}</el-radio>
                </el-radio-group>
                <!-- 复选框 -->
                <el-checkbox-group v-else-if="el.type === 'checkbox'">
                  <el-checkbox v-for="o in el.options" :label="o.label" :key="o.label">{{o.name}}</el-checkbox>
                </el-checkbox-group>
                <!-- 单项选择器 -->
                <el-select v-else-if="el.type === 'select'">
                  <el-option v-for="o in el.options" :key="o.label" :label="o.name" :value="o.label">
                  </el-option>
                </el-select>
                <!-- 时间选择器 -->
                <el-time-picker v-else-if="el.type === 'timepicker'" :picker-options="{ selectableRange: '00:00:00 - 23:59:59'}">
                </el-time-picker>
                <!-- 时间范围选择器 -->
                <el-time-picker v-else-if="el.type === 'timerangepicker'" is-range>
                </el-time-picker>
                <!-- 日期选择器 -->
                <el-date-picker v-else-if="el.type === 'datepicker'" type="date">
                </el-date-picker>
                <!-- 日期范围选择器 -->
                <el-date-picker v-else-if="el.type === 'daterangepicker'" type="daterange">
                </el-date-picker>
                <!-- 文本域 -->
                <el-input v-else-if="el.type === 'textarea'" type="textarea" :rows="2">
                </el-input>
                <!-- 上传 -->
                <el-upload class="upload-demo" v-else-if="el.type === 'upload'" action="">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">{{el.placeholder}}</div>
                </el-upload>
                <span v-else>{{el.type}}</span>
              </el-form-item>
            </transition-group>
          </draggable>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>自定义表单</span>
        </div>
        <el-form ref="form2" label-width="100px">
          <draggable v-model="curControls" :move="onMove2" @update="dragEnd2" :options="dragOptions2">
            <transition-group class="drag-form" type="transition" tag="div">
              <el-form-item :label="el.name + '：'" v-for="(el, index) in curControls" :key="index" :required="el.required">
                <el-row>
                  <!-- 文本 -->
                  <el-col :span="18" v-if="el.type === 'text'">
                    <el-input :placeholder="el.placeholder" size="small"></el-input>
                  </el-col>
                  <!-- 数字 -->
                  <el-col :span="18" v-else-if="el.type === 'number'">
                    <el-input :placeholder="el.placeholder" type="number" size="small"></el-input>
                  </el-col>
                  <!-- 单选 -->
                  <el-col :span="18" v-else-if="el.type === 'radio'">
                    <el-radio-group>
                      <el-radio v-for="o in el.options" :label="o.label" :key="o.label">{{o.name}}</el-radio>
                    </el-radio-group>
                  </el-col>
                  <!-- 复选 -->
                  <el-col :span="18" v-else-if="el.type === 'checkbox'">
                    <el-checkbox-group>
                      <el-checkbox v-for="o in el.options" :label="o.label" :key="o.label">{{o.name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                  <!-- 单项选择 -->
                  <el-col :span="18" v-else-if="el.type === 'select'">
                    <el-select>
                      <el-option v-for="o in el.options" :key="o.label" :label="o.name" :value="o.label">
                      </el-option>
                    </el-select>
                  </el-col>
                  <!-- 时间选择器 -->
                  <el-col :span="18" v-else-if="el.type === 'timepicker'">
                    <el-time-picker :picker-options="{ selectableRange: '00:00:00 - 23:59:59'}" :placeholder="el.placeholder">
                    </el-time-picker>
                  </el-col>
                  <!-- 时间范围选择器 -->
                  <el-col :span="18" v-else-if="el.type === 'timerangepicker'">
                    <el-time-picker is-range :placeholder="el.placeholder">
                    </el-time-picker>
                  </el-col>
                  <!-- 日期选择器 -->
                  <el-col :span="18" v-else-if="el.type === 'datepicker'">
                    <el-date-picker type="date">
                    </el-date-picker>
                  </el-col>
                  <!-- 日期范围选择器 -->
                  <el-col :span="18" v-else-if="el.type === 'daterangepicker'">
                    <el-date-picker type="daterange">
                    </el-date-picker>
                  </el-col>
                  <!-- 文本域 -->
                  <el-col :span="18" v-else-if="el.type === 'textarea'">
                    <el-input type="textarea" :rows="2" :placeholder="el.placeholder">
                    </el-input>
                  </el-col>
                  <!-- 上传 -->
                  <el-col :span="18" v-else-if="el.type === 'upload'">
                    <el-upload class="upload-demo" action="">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">{{el.placeholder}}</div>
                    </el-upload>
                  </el-col>
  
                  <el-col :span="6" class="btn-group">
                    <el-button-group>
                      <el-button type="text" icon="el-icon-edit" @click="onEdit(index)"></el-button>
                      <el-button type="text" icon="el-icon-delete" @click="beforeRemove(index)"></el-button>
                    </el-button-group>
                  </el-col>
                </el-row>
                <!-- <span v-else>{{el.type}}</span> -->
              </el-form-item>
            </transition-group>
          </draggable>
        </el-form>
        <!-- <div v-for="(c,index) in controls" :key="index" class="text item">
                              <el-col :span="8">
                                <el-button class="controls-item">{{c.name}}</el-button>
                              </el-col>
                            </div> -->
      </el-card>
    </el-col>
    <!-- 配置表单弹窗 -->
    <config-dialog :visible.sync="dialogVisible" :form="dialogForm" @onOk="updateForm" />
  </el-row>
</template>

<script>
  import draggable from "vuedraggable";
  import configDialog from "@/components/ConfigDialog";
  
  export default {
    name: "customForm",
    components: {
      draggable,
      configDialog
    },
    data() {
      return {
        dialogForm: {},
        dialogFormIndex: null,
        delConfirmVisible: false,
        form2: {},
        dialogVisible: false,
        formLabelWidth: "80px",
        editable: true,
        curControls: [],
        placeholderArray: ['text', 'number'],
        controls: [{
            type: "text",
            name: "文本输入框",
            required: false,
          },
          {
            type: "number",
            name: "数字输入框",
            required: false,
          },
          {
            type: "radio",
            name: "单选框",
            required: false,
            options: [{
              label: 1,
              name: '选项1',
            }, {
              label: 2,
              name: '选项2',
            }]
          },
          {
            type: "checkbox",
            name: "多选框",
            required: false,
            options: [{
              label: 1,
              name: '选项1',
            }, {
              label: 2,
              name: '选项2',
            }]
          },
          {
            type: "select",
            name: "单项选择器",
            required: false,
            options: [{
              label: 1,
              name: '选项1',
            }, {
              label: 2,
              name: '选项2',
            }]
          },
          {
            type: "timepicker",
            name: "时间选择",
            required: false,
          },
          {
            type: "timerangepicker",
            name: "时间范围",
            required: false,
          },
          {
            type: "datepicker",
            name: "日期选择",
            required: false,
          },
          {
            type: "daterangepicker",
            name: "日期范围",
            required: false,
          },
          {
            type: "textarea",
            name: "文本域",
            required: false,
          },
          {
            type: "upload",
            name: "上传",
            required: false,
            placeholder: "只能上传jpg/png文件，且不超过500kb"
          }
        ],
        dragOptions: { // 表单1配置
          animation: 0,
          ghostClass: "ghost",
          group: {
            name: "shared",
            pull: "clone",
            revertClone: false
          },
          sort: false // 禁止拖动排序
        },
        dragOptions2: { // 表单2配置
          animation: 0,
          ghostClass: "ghost",
          group: {
            // 只允许放置shared的控件,禁止pull
            put: ["shared"]
          }
        },
        rules: { // 表单配置规则
          name: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }],
          key: [{
            required: true,
            message: '请设置key值',
            trigger: 'blur'
          }],
        }
      };
    },
    mounted() {
      console.log("mounted");
    },
    methods: {
      // 配置选中表单项
      onEdit(i) {
        console.log(this.dialogVisible);
  
        this.dialogForm = Object.assign({}, this.curControls[i]);
        this.dialogFormIndex = i;
        this.dialogVisible = true;
      },
  
      // 移除表单项前置操作
      beforeRemove(i) {
        this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onRemove(i)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
  
      // 移除表单项
      onRemove(i) {
        this.curControls.splice(i, 1);
      },
  
  
      updateForm(form) {
        console.log('update', form);
  
        this.curControls[this.dialogFormIndex] = Object.assign({}, form)
  
      },
      hideConfigDialog() {
        console.log('hhh');
  
        this.dialogVisible = false;
      },
  
  
  
      // dragable组件克隆数据
      cloneData(original) {
        // 深拷贝对象，防止默认空对象被更改
        return JSON.parse(JSON.stringify(original));
      },
  
      // dragable组件拖拽事件
      onMove({
        relatedContext,
        draggedContext
      }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
      },
  
      // dragable组件拖拽事件
      onMove2({
        relatedContext,
        draggedContext
      }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
      },
      dragEnd() {
        console.log("dragEnd");
      },
  
      dragEnd2() {
        console.log("dragEnd2");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .controls-item {
    margin-bottom: 20px;
  }
  
  .drag-form {
    min-height: 200px;
  }
  
  .btn-group {
    text-align: center;
  }
</style>
