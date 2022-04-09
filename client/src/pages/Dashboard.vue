<template>
  <div class="dashboard">
    <div class="dashboard-container" v-if="userAuth.isAuth">
      <button class="sign-out" @click.prevent="handleLogout">
        <i class="fas fa-door-open"></i>
        <span>Sign out</span>
      </button>
      <div class="inner-container">
        <div class="profile">
          <div class="profile-img"></div>
          <div class="profile-content">
            <h2 class="name">{{ userAuth.user.firstName + " " + userAuth.user.lastName }}</h2>
          </div>
        </div>
        <div class="quiz-content">
          <button class="quiz-btn" @click="claimToken">Claim Token</button>
          <router-link to="voting">
            <button class="leaderboard-btn">Voting</button>
          </router-link>
          <div class="highscore-box">
            <h2>NOTES</h2>
            <div class="score">
              <h1>DUNNO</h1>
              <p>WUT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/vuex";
import { mapActions } from "vuex";

export default {
  name: "dashboard",
  computed: {
    userAuth() {
      return store.state.userAuth;
    }
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout().then(() => {
        this.$nextTick().then(() => {
          this.$router.push({ name: "home" });
        });
      });
    },
    claimToken() {
      this.$http
        ._post("/token", { user: this.userAuth.user })
        .then(res => {
          if (!res.error) {
            alert(res.token);
          } else {
            alert(res.message);
          }
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style scoped>
.dashboard {
  background-color: #222831;
  height: 100vh;
  width: 100vw;
  color: #eeeeee;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5em;
}

.dashboard-container {
  padding: 10px 4em;
  z-index: 2;
  background-color: #393e4640;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 50px;
  height: 100%;
}

.inner-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.sign-out {
  border: 1px solid white;
  position: absolute;
  top: 5%;
  background-color: #eeeeee;
  padding-inline: 15px;
  height: 2.2em;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222831;
  transition: all 0.2s ease-in-out;
  gap: 7px;
}

.sign-out i {
  color: #222831;
  font-size: 18px;
}

.profile {
  width: 18em;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70%;
  justify-content: space-evenly;
  background-color: #222831;
}

.profile-img {
  width: 8em;
  height: 8em;
  background-color: #fff;
  border-radius: 100%;
}

.profile-content {
  margin-top: 10px;
}

.name,
.rank {
  text-align: center;
  font-size: 30px;
}

.quiz-content {
  width: 25em;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  height: 70%;
}

.quiz-content button {
  background-color: #00adb585;
  width: 25em;
  height: 3em;
  outline: none;
  transition: 0.15s ease-in-out;
}

.quiz-content button:hover {
  background-color: #00adb540;
}

.highscore-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #222831;
  padding: 15px;
}
.score {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.score h1 {
  font-size: 4.5em;
}

.score p {
  font-size: 1.5em;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: 50vw;
  height: fit-content;
  max-width: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 999;
  transform: none;
}

.modal h3 {
  color: #2c3e50;
}

.modal p {
  color: #2c3e50;
}

.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}
</style>
