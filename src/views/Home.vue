<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/customForm">自定义表单</el-menu-item>
        <el-menu-item index="/preview">预览</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  // @ is an alias to /src
  
  export default {
    name: "home",
    data() {
      return {
        activeIndex: "customForm"
      }
    },
    methods: {
      handleSelect(i) {
        this.activeIndex = i
        console.log('click select --- ', i);
      }
    }
};
</script>
