<template>
  <div class="box">
    <div class="content">
      <img class="left" src="@assets/images/404/404_icon.svg" alt="">
      <div class="right">
        <div class="title">404</div>
        <div class="txt">抱歉，你访问的页面出现问题</div>
        <div class="btn"><el-button type="primary" @click="goHome">去首页</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "noFound",
    methods: {
      goHome() {
        this.$router.replace({ path: '/VipManagement' });
      }
    }
  }
</script>

<style scoped lang="less">
.box {
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    align-items: center;
    .left {
      width: 438px;
      height: 268px;
      display: block;
    }
    .right {
      padding-left: 96px;
      .title {
        font-size: 56px;
        line-height: 64px;
        color: #000000;
        font-weight: 500;
      }
      .txt {
        padding-top: 8px;
        font-size: 16px;
        line-height: 24px;
        color: rgba(0,0,0,0.45);
      }
      .btn {
        padding-top: 24px;
      }
    }
  }
}
</style>
