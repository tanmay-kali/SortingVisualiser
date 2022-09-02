import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    meta:{
      title:'JS Sorting Algorithms || BubbleSort'
    },
    component: Home,
  },
  {
    path: "/bubble-sort",
    name: "BubbleSort",
    meta:{
      title:'JS Sorting Algorithms || BubbleSort'
    },
    alias: "/",
  },
  {
    path: "/selection-sort",
    name: "SelectionSort",
    meta:{
      title:'JS Sorting Algorithms || SelectionSort'
    },
  },
  {
    path: "/insertion-sort",
    name: "InsertionSort",
    meta:{
      title:'JS Sorting Algorithms || InsertionSort'
    },
  },
  {
    path: "/merge-sort",
    name: "MergeSort",
    meta:{
      title:'JS Sorting Algorithms || MergeSort'
    },
  },
  {
    path: "/quick-sort",
    name: "QuickSort",
    meta:{
      title:'JS Sorting Algorithms || QuickSort'
    },
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
