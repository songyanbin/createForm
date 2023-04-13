import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@assets/css/reset.less";
import * as Echarts from "echarts";
Vue.prototype.$echarts = Echarts;
Vue.use(ElementUI);

var vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
export default vue;
