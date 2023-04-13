import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import(/* webpackChunkName: 'base' */ "../views/index.vue");
const CreateForm = () => import(/* webpackChunkName: 'base' */ "../views/createform/index.vue");
const NoFound = () => import("../views/404/index");
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "",
    redirect: "/createForm"
  },
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      {
        path: "/createForm",
        name: "CreateForm",
        component: CreateForm,
        meta: {
          index: "/createForm",
        }
      },
      {
        path: "/*",
        name: "NoFound",
        component: NoFound,
        meta: {
          keepAlive: true,
          noMenu: true,
          noHeadData: true
        }
      }
    ]
  }
];
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const router = new VueRouter({
  routes
});

export default router;
