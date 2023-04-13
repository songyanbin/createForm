<template>
  <div class="cus-body">
    <el-container>
      <!--头部-->
      <el-header class="cus-header" height="64px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="260px"  v-if="!$route.meta.noMenu"><Menu></Menu></el-aside>
        <!--主内容-->
        <el-main class="cus-main">
          <transition name="move" mode="out-in">
            <div>
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
    import Menu from "../components/Menu.vue";
    import Header from "../components/Header.vue";
    import { mapState } from "vuex";
    export default {
        components: {
            Menu,
            Header
        },
        ...mapState(["noMenuState"])
    };
</script>
<style lang="less" scoped>
  .cus-body {
    background: #f2f2f2;
    min-width: 1260px;
    min-height: 100vh;
    .cus-main {
      padding: 20px 22px;
      height: calc(100vh - 64px);
    }
    .cus-header {
      padding: 0;
    }
  }
</style>
