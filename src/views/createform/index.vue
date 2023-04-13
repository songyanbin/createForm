<template>
  <div class="create-form">
    <div class="config-box">
      <div class="left">
        <div class="title">表单组件</div>
        <div class="list">
          <div
            v-for="component in componentList"
            :key="component.type"
            class="item"
            :draggable="true"
            @drag="drag"
            @dragend="dragend(component)"
          >
            <i :class="component.icon"></i>
            <p>{{component.label}}</p>
          </div>
        </div>
      </div>
      <div class="main-content" id="content">
        <grid-layout
          ref="gridlayout"
          :layout.sync="layout"
          :row-height="40"
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
      <div class="right">
        右侧配置面板
      </div>
    </div>
  </div>
</template>

<script>
    import VueGridLayout from 'vue-grid-layout';
    let mouseXY = {"x": null, "y": null};
    let DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null};
    export default {
        name: "index",
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem
        },
        data() {
            return {
                layout: [],
                componentList: [
                    {
                        type: 'input',
                        label: '输入框',
                        icon: 'el-icon-light-rain'
                    },
                    {
                        type: 'select',
                        label: '下拉框',
                        icon: 'el-icon-lightning'
                    },
                    {
                        type: 'button',
                        label: '按钮',
                        icon: 'el-icon-heavy-rain'
                    },
                ]
            }
        },
        created() {
            let arr = [];
            for (let i = 0; i < 25; i++) {
                arr.push({
                    x: 0,
                    y: i,
                    w: 12,
                    h: 1,
                    i: i.toString()
                })
            }
            // this.layout = arr;
        },
        mounted() {
            document.addEventListener("dragover", function (e) {
                mouseXY.x = e.clientX;
                mouseXY.y = e.clientY;
            }, false);
        },
        methods: {
            drag: function (e) {
                let parentRect = document.getElementById('content').getBoundingClientRect();
                let mouseInGrid = false;
                if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                    mouseInGrid = true;
                }
                if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
                    this.layout.push({
                        x: (this.layout.length * 2) % (this.colNum || 12),
                        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
                        w: 12,
                        h: 1,
                        i: 'drop',
                    });
                }
                let index = this.layout.findIndex(item => item.i === 'drop');
                if (index !== -1) {
                    try {
                        this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = "none";
                    } catch {
                    }
                    let el = this.$refs.gridlayout.$children[index];
                    el.dragging = {"top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left};
                    let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
                    if (mouseInGrid === true) {
                        this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 12);
                        DragPos.i = String(index);
                        DragPos.x = this.layout[index].x;
                        DragPos.y = this.layout[index].y;
                    }
                    if (mouseInGrid === false) {
                        this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 12);
                        this.layout = this.layout.filter(obj => obj.i !== 'drop');
                    }
                }
            },
            dragend: function (item) {
                console.log(item);
                let parentRect = document.getElementById('content').getBoundingClientRect();
                let mouseInGrid = false;
                if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                    mouseInGrid = true;
                }
                if (mouseInGrid === true) {
                    // alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
                    this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 12);
                    this.layout = this.layout.filter(obj => obj.i !== 'drop');
                    this.layout.push({
                        x: DragPos.x,
                        y: DragPos.y,
                        w: 12,
                        h: 1,
                        i: this.layout.length,
                    });
                }
            }
        }
    }
</script>

<style scoped lang="less" src="./index.less"></style>
