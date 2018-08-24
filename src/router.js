import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import CustomForm from "./views/CustomForm.vue";
import Preview from "./views/Preview.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/customForm",
          name: "customForm",
          component: CustomForm
        },
        {
          path: "/preview",
          name: "preview",
          component: Preview
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
