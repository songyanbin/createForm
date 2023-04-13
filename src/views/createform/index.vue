<template>
  <div class="create-form">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="40"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >

      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i">
        {{item.i}}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
  import VueGridLayout from 'vue-grid-layout';
    export default {
        name: "index",
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem
        },
        data() {
            return {
                layout: [],
            }
        },
        created() {
            let arr = [];
            for (let i=0; i< 25; i++) {
                arr.push({
                    x:  0,
                    y: i,
                    w: 12,
                    h: 1,
                    i: i.toString()
                })
            }
            this.layout = arr;
        }
    }
</script>

<style scoped lang="less" src="./index.less"></style>
