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
                <el-input v-if="el.type === 'text'" size="small"></el-input>
                <el-input v-else-if="el.type === 'number'" type="number" size="small"></el-input>
                <el-radio-group v-else-if="el.type === 'radio'">
                  <el-radio v-for="o in el.options" :label="o.label" :key="o.label">{{o.name}}</el-radio>
                </el-radio-group>
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
                  <el-col :span="18" v-if="el.type === 'text'">
                    <el-input :placeholder="el.placeholder" size="small"></el-input>
                  </el-col>
                  <el-col :span="18" v-else-if="el.type === 'number'">
                    <el-input :placeholder="el.placeholder" type="number" size="small"></el-input>
                  </el-col>
                  <el-col :span="18" v-else-if="el.type === 'radio'">
                    <el-radio-group>
                    <el-radio v-for="o in el.options" :label="o.label" :key="o.label">{{o.name}}</el-radio>
                    </el-radio-group>
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
  
    <el-dialog class="edit-dialog" title="表单配置" :visible.sync="dialogVisible">
      <el-form ref="dialogForm" :model="dialogForm" :rules="rules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="提示语" :label-width="formLabelWidth" prop="placeholder" v-if="placeholderArray.indexOf(dialogForm.type) > -1">
          <el-input v-model="dialogForm.placeholder"></el-input>
        </el-form-item>
        <el-form-item label="key值" :label-width="formLabelWidth" prop="key">
          <el-input v-model="dialogForm.key"></el-input>
        </el-form-item>
        <el-form-item label="是否必填" :label-width="formLabelWidth" prop="required">
          <el-switch v-model="dialogForm.required" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import draggable from "vuedraggable";
  
  export default {
    name: "customForm",
    components: {
      draggable
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
            name: "文本输入框"
          },
          {
            type: "number",
            name: "数字输入框"
          },
          {
            type: "radio",
            name: "单选框",
            options:[{
              label: 1,
              name: '选项一',
            },{
              label: 2,
              name: '选项2',
            }]
          },
          {
            type: "checkbox",
            name: "多选框"
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
        this.dialogForm = Object.assign({}, this.curControls[i]);
        this.dialogFormIndex = i;
        this.dialogVisible = true;
      },
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
      onRemove(i) {
        this.curControls.splice(i, 1);
      },
      // 报错表单配置
      onUpdate() {
        this.$refs['dialogForm'].validate((valid) => {
          if (valid) {
            this.curControls[this.dialogFormIndex] = Object.assign({}, this.dialogForm)
            this.dialogVisible = false;
            this.resetDialogFormField();
          } else {
            return false;
          }
        });
  
      },
      // 重置表单项校验状态
      resetDialogFormField() {
        this.$refs['dialogForm'].resetFields();
      },
      cloneData(original) {
        // 深拷贝对象，防止默认空对象被更改
        return JSON.parse(JSON.stringify(original));
      },
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
  
  .edit-dialog {
    .el-input {
      width: 300px;
    }
  }
</style>
