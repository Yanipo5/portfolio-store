import type { Role } from "portfolio-store-server/src/utils/authorization";
import { allRoles } from "portfolio-store-server/src/utils/authorization";
import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./AppHome/index.vue";
import useUserStore from "@/store/user";
import { authorizeRole } from "portfolio-store-server/src/utils/authorization";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: AppHome,
      meta: { roles: allRoles, order: 0 }
    },
    // Applying autho only for non Home routes
    {
      path: "/admin-portal",
      name: "Product Management",
      component: () => import("./AdminPortal/index.vue"),
      meta: { roles: ["admin"], order: 100 }
    },
    {
      path: "/admin-portal/1",
      name: "Order Management",
      component: () => import("./AdminPortal/index.vue"),
      meta: { roles: ["admin"], order: 110 }
    },
    {
      path: "/user-portal",
      name: "My Cart",
      component: () => import("./UserPortal/index.vue"),
      meta: { roles: ["user"], order: 200 }
    },
    {
      path: "/user-portal/1",
      name: "My Orders",
      component: () => import("./UserPortal/index.vue"),
      meta: { roles: ["user"], order: 210 }
    }
  ].map((r) => ({ ...r, beforeEnter: [() => authorizeRole(r.meta.roles as Role[], useUserStore().roles) /* Authorize Navigation*/] }))
});
