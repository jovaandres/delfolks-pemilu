import VueRouter from "vue-router";
import ChatAdmin from "@/pages/ChatAdmin";
import HomePage from "@/pages/HomePage";
import Dashboard from "@/pages/Dashboard";
import SignInPage from "@/pages/SignInPage";
import NotFound from "@/pages/NotFound";
import store from "@/vuex";
import VotingPage from "@/pages/VotingPage";
import CalonPage from "@/pages/CalonPage";
import MessagePage from "@/pages/MessagePage";

const routes = [
  {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
      requireAuth: true
    }
  },
  {
    name: "message",
    path: "/jovaDanAdddddedadalflafawuobf",
    component: MessagePage,
    meta: {
      title: "Message"
    }
  },
  {
    name: "voting",
    path: "/voting",
    component: VotingPage,
    meta: {
      title: "Voting",
      requireAuth: true
    }
  },
  {
    name: "calon",
    path: "/calon",
    component: CalonPage,
    meta: {
      title: "Calon",
      requireAuth: true
    }
  },
  {
    name: "home",
    path: "",
    component: HomePage,
    meta: {
      title: "Home",
      redirectDashboard: true
    }
  },
  {
    name: "chat-admin",
    path: "/chat-admin",
    component: ChatAdmin,
    meta: {
      title: "Chat Admin",
      redirectDashboard: true
    }
  },
  {
    name: "sign-in",
    path: "/sign-in",
    component: SignInPage,
    meta: {
      title: "Sign In",
      redirectDashboard: true
    }
  },
  {
    name: "not-found",
    path: "*",
    component: NotFound,
    meta: {
      title: "Page Not Found"
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach(async (to, from, next) => {
  const isUserAuth = store.state.userAuth.isAuth;

  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!isUserAuth) {
      next({
        name: "home",
        query: { ...to.query, redirect: to.name }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.redirectDashboard)) {
    if (isUserAuth) {
      next({
        name: "dashboard",
        query: { ...to.query, redirect: to.name }
      });
    } else {
      next();
    }
  } else {
    next();
  }

  const hasTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  if (hasTitle) {
    document.title = hasTitle.meta.title;
  }
});

export default router;
