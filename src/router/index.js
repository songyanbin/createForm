import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import(/* webpackChunkName: 'base' */ "../views/index.vue");
const CreateFrom = () => import(/* webpackChunkName: 'base' */ "../views/createfrom/index.vue");
const NoFound = () => import("../views/404/index");
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "",
    redirect: "/createFrom"
  },
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      {
        path: "/createFrom",
        name: "CreateFrom",
        component: CreateFrom,
        meta: {
          index: "/createFrom",
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
