import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/my",
    meta: {
      title: "仪表盘",
      icon: "dashboard"
    },
    children: [
      {
        path: "/analysis",
        name: "Analysis",
        component: () => import("@/views/dashboard/analysis"),
        meta: {
          title: "数据分析"
        }
      },
      {
        path: "data",
        name: "Data",
        component: () => import("@/views/dashboard/data"),
        meta: {
          title: "数据监控"
        }
      },
      {
        path: "my",
        name: "My",
        component: () => import("@/views/dashboard/my"),
        meta: {
          title: "我的工作台"
        }
      }
    ]
  },

  //客户管理
  {
    path: "/customer",
    component: Layout,
    redirect: "/customer", //重定向地址，在面包屑中点击会重定向去的地址
    hidden: false, // 不在侧边栏线上
    alwaysShow: true, //一直显示根路由
    meta: {
      title: "信息管理",
      icon: "form"
    }, //你可以在根路由设置权限，这样它下面所以的子路由都继承了这个权限
    children: [
      {
        path: "CommonSea",
        component: () => import("@/views/customer/commonsea/index"),
        name: "CommonSea",
        meta: {
          title: "公海",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      },
      {
        path: "PrivateSea",
        component: () => import("@/views/customer/privatesea/index"),
        name: "PrivateSea",
        meta: {
          title: "私海",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      },
      {
        path: "Blacklist",
        component: () => import("@/views/customer/blacklist/index"),
        name: "Blacklist",
        meta: {
          title: "回收站",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      },
    ]
  },
  //学生管理
  {
    path: "/students",
    component: Layout,
    redirect: "/students", //重定向地址，在面包屑中点击会重定向去的地址
    hidden: false, // 不在侧边栏线上
    alwaysShow: true, //一直显示根路由
    meta: {
      title: "学生管理",
      icon: "team"
    }, //你可以在根路由设置权限，这样它下面所以的子路由都继承了这个权限
    children: [
      {
        path: "Export",
        component: () => import("@/views/students/export/index"),
        name: "Export",
        meta: {
          title: "数据导入",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      },
      {
        path: "Message",
        component: () => import("@/views/students/message/index"),
        name: "Message",
        meta: {
          title: "短信模版",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      },
      {
        path: "Already",
        component: () => import("@/views/students/already/index"),
        name: "Already",
        meta: {
          title: "已报学生",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      },
    ]
  },
   //内容管理
   {
    path: "/content",
    component: Layout,
    redirect: "/example/table",
    name: "content",
    meta: {
      title: "内容管理",
      icon: "contents"
    },
    children: [
      {
        path: "article",
        name: "article",
        component: () => import("@/views/content/article"),
        meta: {
          title: "文章管理"
        }
      },
      {
        path: "video",
        name: "video",
        component: () => import("@/views/content/video"),
        meta: {
          title: "视频管理"
        }
      },
      {
        path: "activity",
        name: "activity",
        component: () => import("@/views/content/activity"),
        meta: {
          title: "活动管理"
        }
      }
    ]
  },
   //用户管理
   {
    path: "/user",
    component: Layout,
    redirect: "/user", //重定向地址，在面包屑中点击会重定向去的地址
    hidden: false, // 不在侧边栏线上
    alwaysShow: true, //一直显示根路由
    meta: {
      title: "用户管理",
      icon: "user"
    }, //你可以在根路由设置权限，这样它下面所以的子路由都继承了这个权限
    children: [
      {
        path: "Admin",
        component: () => import("@/views/user/admin"),
        name: "Admin",
        meta: {
          title: "系统管理员",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      },
      {
        path: "Role",
        component: () => import("@/views/user/role"),
        name: "Role",
        meta: {
          title: "角色管理",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      },
      {
        path: "Auth",
        component: () => import("@/views/user/auth"),
        name: "Auth",
        meta: {
          title: "权限管理",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      }
    ]
  },

  //个人中心
  {
    path: "/person",
    component: Layout,
    redirect: "/person", //重定向地址，在面包屑中点击会重定向去的地址
    hidden: false, // 不在侧边栏线上
    alwaysShow: true, //一直显示根路由
    meta: {
      title: "个人中心",
      icon: "smile"
    }, //你可以在根路由设置权限，这样它下面所以的子路由都继承了这个权限
    children: [
      {
        path: "Center",
        component: () => import("@/views/person/center/index"),
        name: "Center",
        meta: {
          title: "个人主页",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      },
      {
        path: "Setting",
        component: () => import("@/views/person/setting/index"),
        name: "Setting",
        meta: {
          title: "个人设置",
          noCache: true // 不会被 <keep-alive> 缓存
        }
      }
    ]
  },

 
 
  {
    path: "external-link",
    component: Layout,
    meta: {
      title: "快捷访问",
      icon: "link"
    },
    children: [
      {
        path: "http://www.cdomick.com",
        name: "Menu1-2-1",
        meta: {
          title: "PC端官网"
        }
      },
      {
        path: "http://m.cdomick.com",
        name: "Menu1-2-2",
        meta: {
          title: "手机端官网"
        }
      },
      {
        path: "https://weibo.com/cdomick",
        name: "Menu1-2-3",
        meta: {
          title: "新浪微博"
        }
      }
    ]
  },

  {
    path: "/setting",
    component: Layout,
    children: [
      {
        path: "setting",
        name: "setting",
        component: () => import("@/views/setting/index"),
        meta: {
          title: "系统设置",
          icon: "setting"
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
