import VueRouter from "vue-router";
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import Dashboard from "@/pages/Dashboard";
import SignInPage from "@/pages/SignInPage";
import NotFound from "@/pages/NotFound";
import store from "@/vuex";
import VotingPage from "@/pages/VotingPage";

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
    name: "voting",
    path: "/voting",
    component: VotingPage,
    meta: {
      title: "Voting",
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
    name: "sign-up",
    path: "/sign-up",
    component: AuthPage,
    meta: {
      title: "Sign Up",
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
