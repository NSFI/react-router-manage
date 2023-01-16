import { lazy } from "react";
import { defineRouterConfig } from "react-router-manage";

 const routerConfig = defineRouterConfig({
  basename:  window.__INITIAL_DATA__.mode !== 'hash' ? window.__INITIAL_DATA__.basename : '/',
  routes: [
    {
      title: "Main",
      path: "main",
      name: "main",
      items: [
        {
          title: "My Page",
          path: "my-page",
          name: "myPage",
          component: lazy(() => import("../pages/my-page"))
        },
        {
          title: "DashBoard",
          path: "dashboard",
          name: "dashboard",
          component: lazy(() => import("../pages/dashboard")),
          items: [
            {
              name: 'DashBoardDetail',
              title: 'Detail',
              path: 'detail/:id',
              component: lazy(() => import("../pages/dashboard/detail")),
              breadcrumbs: {
                text: (item) => `${item.title}测试`
              }
            }
          ]
        }
      ]
    },
    {
      title: "App",
      path: "app",
      name: "app",
      items: [
        {
          title: "Contact",
          path: "contact",
          name: "contact",
          component: lazy(() => import("../pages/contact"))
        },
        {
          title: "email",
          path: "email",
          name: "email",
          component: lazy(() => import("../pages/email"))
        },
        {
          title: "Messenger",
          path: "messenger",
          name: "messenger",
          component: lazy(() => import("../pages/messenger"))
        },
        {
          title: "Project",
          path: "project",
          name: "project",
          items: [
            {
              title: "Taskboard",
              path: "task-board",
              name: "taskboard",
              component: lazy(() => import("../pages/project/task-board"))
            },
            {
              title: "ProjectList",
              path: "list",
              name: "projectList",
              component: lazy(() => import("../pages/project/project-list"))
            },
            {
              title: "TicketList",
              path: "ticket-list",
              name: "ticketList",
              component: lazy(() => import("../pages/project/ticket-list"))
            },
            {
              title: "Clients",
              path: "clients",
              name: "Clients",
              component: lazy(() => import("../pages/project/clients"))
            }
          ]
        }
      ]
    }
  ]
});

export default routerConfig
