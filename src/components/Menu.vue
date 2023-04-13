<template>
  <div class="menu-box">
    <el-menu
      router
      unique-opened
      text-color="#777777"
      :default-active="$route.meta.index"
    >
      <template v-for="(item) in menuList">
        <el-menu-item
          :index="item.url">
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import {menuList} from '@/utils/menuList';
export default {
  name: "Menu",
  data() {
    return {
      menuList: menuList
    }
  }
};
</script>
<style lang="less">
.menu-box {
  height: calc(100vh - 64px);
  background: #fff;
}
</style>
